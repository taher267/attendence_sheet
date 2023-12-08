const userService = require("../../../../service/user");
const changeProfilePic = async (req, res, next) => {
  try {
    const { files } = req;
    // const [{ originalname, mimetype, buffer }]=files
    // require("fs").writeFileSync(
    //   `uploads/${originalname}`,
    //   buffer,
    //   "binary"
    // );
    const { code } = await userService.changeProfilePic({ file: files?.[0] });
    res.status(200).json({
      code: 200,
      message: `Alhamdu lillah, Profile pic has been updated!`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = changeProfilePic;
