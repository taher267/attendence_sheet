const { NODE_ENV } = process.env;

const logout = async (req, res, next) => {
  try {
    const { cookies } = req;
    const cookieCommon = {
      sameSite: NODE_ENV === "production" ? "None" : "Strict",
      httpOnly: true,
      secure: NODE_ENV === "production",
    };
    if (cookies?.accessToken) {
      res.clearCookie("accessToken", cookieCommon);
    }
    if (cookies?.refreshToken) {
      res.clearCookie("refreshToken", cookieCommon);
    }
    return res.status(202).json({ message: `Logout successfully!`, code: 202 });
  } catch (e) {
    next(e);
  }
};

module.exports = logout;
