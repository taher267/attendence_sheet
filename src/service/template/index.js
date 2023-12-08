const getForgetPasswordTemplate = ({
  name = `Convert My Bank Statement`,
  link = "",
}) => {
  return ` <div
      style="
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h2 style="color: #333">Forget Password</h2>
      <p style="color: #333">Dear User,</p>
      <p style="color: #333">
        You have requested to reset your password. Click the button below to
        reset it:
      </p>
      <a
        href="${link}"
        target="_blank"
        style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
        "
        >Reset Password</a
      >
      <p style="color: #333">
        If you did not request a password reset, please ignore this email.
      </p>
      <p style="color: #333">Best regards,<br />${name}</p>
    </div>`;
};

const accountVarificationTemplate = ({
  username,
  link,
  websiteName = `Convert My Bank Statement`,
}) => {
  return `
      <div
        style="
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        "
      >
        <h2 style="color: #333">Account Verification</h2>
        <p style="color: #333">Dear ${username},</p>
        <p style="color: #333">
          Thank you for registering an account with us. To complete your
          registration, please click the button below to verify your email:
        </p>
        <a
          style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
          "
          href="${link}"
          target="_blank"
          class="btn"
          >Verify Email</a
        >
        <p style="color: #333">
          If you did not register on our website, please ignore this email.
        </p>
        <p style="color: #333">Best regards,<br />${websiteName}</p>
      </div>`;
};

const credentialsTemplate = ({
  name,
  username,
  password,
  websiteName = `Convert My Bank Statement`,
}) => {
  return `<div
      style="
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h2>Login Information</h2>
      <p>Dear ${name},</p>
      <p>Thank you for using our services. Here are your login details:</p>
      <div
        style="
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 3px;
          margin-top: 15px;
        "
      >
        <p style="font-weight: bold">Username:</p>
        <p>${username}</p>
        <p style="font-weight: bold">Password:</p>
        <p>${password}</p>
      </div>
      <p>
        Please keep this information secure and do not share it with others. If
        you have any questions or concerns, feel free to contact us.
      </p>
      <p>Best regards,<br />${websiteName}</p>
    </div>`;
};
const serverErrorMessaage = ({
  name = `Convert My Bank Statement`,
  text = "",
  subject = "Server Error",
}) => {
  return ` <div
      style="
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h2 style="color: #333">${subject}</h2>
      <p style="color: #333">Dear User,</p>
      <p style="color: #333">
      ${text}
      </p>
      <p style="color: #333">Best regards,<br />${name}</p>
    </div>`;
};
module.exports = {
  getForgetPasswordTemplate,
  accountVarificationTemplate,
  credentialsTemplate,
  serverErrorMessaage,
};
