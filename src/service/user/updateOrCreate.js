const userRepo = require("../../repo/user");
const { sendEmail } = require("../../utils");
const { onlyError } = require("../../utils/error");
const { randomBytes } = require("crypto");
const bcrypt = require("bcrypt");

const updateOrCreate = async ({
  id,
  data: { name, email, phone_number, username, lastLogin, roles, status },
}) => {
  let newUser;
  try {
    const existUser = await userRepo.findItemById({ id });
    if (existUser) {
      const payload = {};
      if (name) {
        payload.name = name;
      }

      const qry = [];
      if (username) {
        payload.username = username;
        qry.push({ username });
      }

      if (phone_number) {
        payload.phone_number = phone_number;
        qry.push({ phone_number });
      }

      if (!Object.keys(payload).length) {
        throw badRequest(`Nothing to be changed!`);
      }

      if (qry?.length) {
        const existUser = await userRepo.findItem({ qry: { $or: qry } });
        if (existUser || existUser.id !== id) {
          throw badRequest();
        }
      }

      const updated = await userRepo.updateItemById({
        id,
        updateData: payload,
        options: { new: true },
      });
      return { user: updateOrCreate, code: 200 };
    }

    const raw = randomBytes(8).toString("hex").toUpperCase();

    const newObj = {
      name,
      email,
    };

    const qry = [{ email }];

    if (phone_number) {
      qry.push({ phone_number });
      newObj.phone_number = phone_number;
    }
    if (username) {
      qry.push({ username });
      newObj.username = username;
    }
    if (roles) {
      newObj.roles = roles;
    }
    if (status) {
      newObj.status = status;
    }

    if (qry?.length) {
      const existUser = await userRepo.findItem({ qry: { $or: qry } });
      if (existUser || existUser.id !== id) {
        throw badRequest();
      }
    }
    const password = await bcrypt.hash(raw, await bcrypt.genSalt(10));
    newObj.password = password;
    const user = await userRepo.create(newObj);
    newUser = user.id;
    await sendEmail({
      to: email,
      subject: `user credentials`,
      html: `email:${email}, password:${raw}`,
    });
    return {
      user,
      code: 201,
    };
  } catch (e) {
    if (newUser) {
      await userRepo.deleteItemById({ id });
    }
    throw onlyError(e.message);
  }
};

module.exports = updateOrCreate;
