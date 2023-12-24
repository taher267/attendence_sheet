const jwt = require("jsonwebtoken");
const userRepo = require("../../repo/user");
//   axios = require("axios"),
//   config = require("../config");
const { badRequest } = require("../../utils/error");
const token = require("../token");

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

const IdToenVerify = async ({ id_token }) => {
  //, access_token

  if (!id_token) {
    throw badRequest(`Signup/Signin credentials invalid of Google account`);
  }
  const decoded = jwt.decode(id_token);
  if (!decoded?.email_verified) {
    throw badRequest(`Google account is not verified`);
  }
  const { email } = decoded;
  const existUser = await userRepo.findItem({
    qry: { email },
    select: "+refreshToken",
  });
  if (!existUser) {
    throw badRequest(`User doesn't exist!`);
  }
  if (existUser.status) {
    if (existUser.status === "pending") {
      throw badRequest(`Please verify your account!`);
    } else if (existUser.status === "inactive") {
      throw badRequest(
        `Your are not eligible to login, please contact with support!`
      );
    }
  }
  const common = { id: existUser.id, email: existUser.email };
  const payload = {
    ...common,
    name: existUser.name,
    role: existUser.roles,
  };
  const accessToken = token.generateToken({ payload });
  let refreshToken = existUser.refreshToken;
  if (!refreshToken) {
    refreshToken = token.generateToken({
      payload: common,
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    await userRepo.updateItemById({
      id: existUser.id,
      updateDate: { refreshToken },
    });
  }
  delete existUser.password;
  delete existUser.refreshToken;

  return {
    accessToken,
    refreshToken,
    user: existUser,
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

const codeByIdToken = async (req, res, next) => {
  try {
    const { query } = req;
    if (!query?.code) {
      return res.status(400).json({
        message: `Failure to google auth!`,
      });
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
