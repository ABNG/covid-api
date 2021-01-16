const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getClinics']);
roleRights.set(roles[1], ['createClinics','updateClinics','deleteClinics','getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
