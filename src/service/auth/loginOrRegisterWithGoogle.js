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
    if (existUser.status === "pending") {
      throw badRequest(`Please verify your account!`);
    } else if (existUser.status === "inactive") {
      throw badRequest(
        `Your are not eligible to login, please contact with support!`
      );
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
      user,
      code: 200,
    };
    // exist user end
  }
  //   new user
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
    code: 201,
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
// async function codeToAccessAndRefreshToken({ code }) {
//     const token_uri = "https://oauth2.googleapis.com/token";
//     const redirect_uri =
//         NODE_ENV === "development"
//             ? GOOGLE_REDIRECT_URI_LOCAL
//             : GOOGLE_REDIRECT_URI_LIVE;
//     const body = {
//         code,
//         client_id: GOOGLE_CLIENT_ID,
//         client_secret: GOOGLE_CLIENT_SECRET,
//         redirect_uri,
//         grant_type: "authorization_code",
//     };

//     // const qs = new URLSearchParams(body).toString();
//     try {
//         const { data } = await axios.post(`${token_uri}`, qs.stringify(body), {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         });
//         return data;
//     } catch (e) {
//         throw new Error(e.message);
//     }
// }
// function codeToAccessAndRefreshToken({ code }) {
//     const uri = GOOGLE_TOKEN_URI;
//     // const uri = "https://accounts.google.com/o/oauth2/token";
//     const redirect_uri =
//         NODE_ENV === "development"
//             ? GOOGLE_REDIRECT_URI_LOCAL
//             : GOOGLE_REDIRECT_URI_LIVE;
//     const body = {
//         code,
//         client_id: GOOGLE_CLIENT_ID,
//         client_secret: GOOGLE_CLIENT_SECRET,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//     };
//     return fetch(uri, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams(body).toString(),
//     }).then((d) => (d.status < 400 ? d.json() : d));
// }

// const uri = `https://www.googleapis.com/oauth2/v3/userinfo`;
// fetch(`${uri}?alt=json&access_token=${access_token}`, {
//     headers: {
//         Authorization: `Bearer ${id_token}`,
//     },
// })
//     // .then((d) => d?.json?.())
//     .then((d) => (d.status < 400 ? d.json() : d))
//     .then((d) => {
//         console.log(d)
//     })
//     .catch(console.error);

//https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&client_id=899316553844-r440b99puqde85qu6jfsc41nm0mf65ss.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid

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
