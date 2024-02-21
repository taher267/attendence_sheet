const { badRequest } = require("../../utils/error");
const userConfig = require("../../config/user");
const fileExtension = require("../../utils/fileExtension");
const userRepo = require("../../repo/user");

const changeProfilePic = async ({ file = {}, user = {} }) => {
  try {
    if (!user?.id) {
      throw badRequest(`Please provide userId`);
    }
    const { originalname, mimetype, buffer } = file;
    if (!originalname || !mimetype || !buffer) {
      throw badRequest(`Invalid parameters!`);
    }
    if (
      !userConfig.profilePicExtensions.includes(
        fileExtension({ fileName: originalname })
      )
    ) {
      throw badRequest(`Invalid file type!`);
    }
    // require("fs").writeFileSync(`uploads/${originalname}`, buffer, "binary");
    console.log(`Please upload the profile pic any cloud`);
    const profilePic = "";

    // await userRepo.updateItemById({
    //   id: user.id,
    //   updateData: { profilePic },
    // });
    return {
      code: 200,
    };
  } catch (e) {
    next(e);
  }
};

module.exports = changeProfilePic;
