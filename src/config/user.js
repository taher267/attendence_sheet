const statuses = ["active", "inactive", "pending", "close"];
const authorize_roles = ["super_admin", "admin"];
const roles = [...authorize_roles, "user", "observer"];
const profilePicExtensions = [".jpg", ".jpeg", ".png", ".git"];

module.exports = { statuses, roles, profilePicExtensions, authorize_roles };
