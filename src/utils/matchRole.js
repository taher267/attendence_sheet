const matchRole = ({ roles = [], allowRoles = [] }) => {
  let match = false,
    role;
  for (const rol of allowRoles) {
    if (roles.includes(rol)) {
      role = rol;
      match = true;
      break;
    }
  }

  return {
    match,
    role,
  };
};

module.exports = matchRole;
