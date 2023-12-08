const jwt = require("jsonwebtoken");
const userRepo = require("../../repo/user");
//   axios = require("axios"),
//   config = require("../config");
const { badRequest } = require("../../utils/error");
const token = require("../token");

// qs = require("qs");

const IdToenVerify = async ({ id_token }) => {
  //, access_token

  if (!id_token) {
    throw badRequest(`Signup/Signin credentials invalid of Google account`);
  }
  const decoded = jwt.decode(id_token);
  if (!decoded?.email_verified) {
    throw badRequest(`Google account is not verified`);
  }
  const { email, name, picture: profilePic } = decoded;
  const existUser = await userRepo.findItem({
    qry: { email },
    select: "+refreshToken",
  });
  if (existUser) {
    throw badRequest(`User Already exist!`);
  }

  const newObj = { name, email, profilePic, thirdPartyAuth: "google" };

  const user = await userRepo.create(newObj);
  const { id } = user;
  const common = { id, email };
  const payload = {
    ...common,
    name,
  };
  const accessToken = token.generateToken({ payload });

  const refreshToken = token.generateToken({
    payload: common,
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await userRepo.updateItemById({ id, updateDate: { refreshToken } });
  return {
    user,
    accessToken,
    refreshToken,
  };
};

const {
  GOOGLE_REDIRECT_URI_LOCAL,
  GOOGLE_REDIRECT_URI_LIVE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
} = process.env;

function tokenObj({ code }) {
  const redirect_uri =
    NODE_ENV === "development"
      ? GOOGLE_REDIRECT_URI_LOCAL
      : GOOGLE_REDIRECT_URI_LIVE;
  const body = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri,
    grant_type: "authorization_code",
  };

  const qs = new URLSearchParams(body).toString();
  return qs;
}
const codeByIdToken = async ({ code }) => {
  try {
    if (code) {
      throw badRequest(`Invalid paremeters!`);
    }

    const token_uri = "https://oauth2.googleapis.com/token";
    const { data } = await axios.post(
      token_uri,
      tokenObj({ code: query.code }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // req.user = data;
    const { id_token, access_token } = data;
    const decoded = jwt.decode(id_token);
    if (!decoded?.email_verified) {
      throw badRequest(`Google account is not verified`);
    }
    req.user = decoded;
    return next();
  } catch (e) {
    // let status = e?.status || e?.statusCode || 500,
    //     message =
    //         e?.response?.data?.message || e?.response?.data?.error || e?.message || `Something Went Wrong!`;
    console.log(e);
    const redirect = `${config.CLIENT_REDIRECT_URL}?failed=true`;
    res.redirect(redirect);
  }
};

module.exports = { IdToenVerify, codeByIdToken };
