const {
  Role,
  User,
  Permission,
  sequelize,
  Sequelize,
  Op,
} = require("../models");

//GET
exports.getUsers = async function () {
  try {
    var data = await User.findAll({
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
  return data;
};

exports.getSingleUser = async function (id, username, email) {
  let where = {};
  if (id && id.length > 0) {
    where.id = id;
  } else if (username && username.length > 0) {
    where.username = username;
  } else if (email && email.length > 0) {
    where.email = email;
  } else {
    throw "id/email/username must be provided";
  }
  try {
    var data = await User.findOne({
      where,
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["id", "path", "verb"],
              through: {
                attributes: [],
              },
            },
          ],
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
  return data;
};

exports.getRoles = async function () {
  try {
    var data = await Role.findAll({
      logging: console.log,
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "path", "verb"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: "users",
          attributes: ["id", "email", "username"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
  return data;
};

exports.getSingleRole = async function (id, name) {
  let where = {};
  if (id && id.length > 0) {
    where.id = id;
  } else if (name && name.length > 0) {
    where.name = name;
  } else {
    throw "id/name must be provided";
  }
  try {
    var data = await Role.findOne({
      logging: console.log,
      where,
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "path", "verb"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: "users",
          attributes: ["id", "email", "username"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
  return data;
};

exports.getPermissions = async function (path, verb) {
  try {
    where = {};
    if (path && path.length > 0) {
      where.path = path;
    }
    if (verb && verb.length > 0) {
      verb = verb.toUpperCase();
      where.verb = verb;
    }

    var data = await Permission.findAll({
      where,
      logging: console.log,
    });
  } catch (error) {
    throw error;
  }
  return data;
};

exports.getSinglePermission = async function (id) {
  where = {};
  if (id && id.length > 0) {
    where.id = id;
  } else {
    throw "id must be provided";
  }
  try {
    var data = await Permission.findOne({
      where,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

//POST

//add permission with path and verb
exports.addPermission = async function (verb, path) {
  //validate request
  try {
    const perm = await Permission.create({ verb: verb, path: path });
    return perm;
  } catch (e) {
    throw e;
  }
};
exports.addRole = async function (name, description, permissions) {
  //use transaction to make sure all operations are a transaction
  try {
    if (description == null) {
      description = "";
    }

    //use transactions to commit role
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        let role = await Role.create({ name, description }, { transaction });

        if (permissions) {
          await role.setPermissions(permissions, { transaction });
        }

        return role;
      },
    );

    let result = await Role.findOne({
      where: { name },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "path", "verb"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.putRole = async function (id, name, description, permissions) {
  if (description == null) {
    description = "";
  }
  try {
    //use transactions to commit role
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        //drop role
        await Role.destroy({ where: { id } });
        let role = await Role.create(
          { id, name, description },
          { transaction },
        );
        await role.setPermissions(permissions, { transaction });

        return role;
      },
    );

    let result = await Role.findOne({
      where: { name },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "path", "verb"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.addUser = async function (email, name, username, password, roles) {
  //validate request
  try {
    //use transactions to commit user
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        const user = await User.create(
          { name, email, username, password },
          { transaction },
        );
        if (roles) {
          await user.setRoles(roles, { transaction });
        } else {
          let defaultRole = await Role.findByPk(
            "2d7bb01e-9159-4ff5-ab5e-464345b704a5",
          );
          if (defaultRole) {
            await user.setRoles(defaultRole, { transaction });
          }
        }

        return user;
      },
    );
    let result = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.userHasPermissions = async function (username, email, path, verb) {
  let where = "";
  if (username && username.length > 0) {
    where += " where users.username='" + username + "'";
  } else {
    where += " WHERE users.email='" + email + "'";
  }
  where += " AND  permissions.path='" + path + "'";
  where += " AND  permissions.verb='" + verb + "'";

  let query = "SELECT COUNT(*) FROM user_roles ";
  query += "LEFT JOIN users  ON users.id=user_roles.user_id ";
  query += "LEFT JOIN roles  ON roles.id=user_roles.role_id ";
  query += "LEFT JOIN role_permissions  ON roles.id=role_permissions.role_id ";
  query +=
    "LEFT JOIN permissions  ON permissions.id=role_permissions.permission_id ";
  query += where;
  try {
    let result = await sequelize.query(query, {
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
    });
    let count = result[0].count;
    if (count > 0) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

exports.putUser = async function (id, email, name, username, password, roles) {
  //validate request
  try {
    //use transactions to commit user
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        let oldUser = await User.findByPk(id);
        await User.destroy({ where: { id } }, { transaction });
        const user = await User.create(
          { id, name, email, username, password: oldUser.password },
          { transaction },
        );
        await user.setRoles(roles, { transaction });

        return user;
      },
    );
    let result = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return result;
  } catch (e) {
    throw e;
  }
};

//PATCH

exports.updateUser = async function (
  id,
  email,
  name,
  username,
  password,
  roles,
) {
  //build update values
  updateValues = {};
  if (email && email.length > 0) {
    updateValues.email = email;
  }
  if (name && name.length > 0) {
    updateValues.name = name;
  }
  if (username && username.length > 0) {
    updateValues.username = username;
  }
  if (password && password.length > 0) {
    updateValues.password = password;
  }

  try {
    //use transactions to commit user
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        let user;
        //update user if anything to update
        if (Object.keys(updateValues).length > 0) {
          user = await User.update(
            { ...updateValues },
            { where: { id } },
            { transaction },
          );
        } else {
          user = await User.findByPk(id);
        }

        //try to add roles, do not fail if error
        //will be because of conflict
        try {
          for (let roleID of roles) {
            let role = await Role.findByPk(roleID);
            await user.addRole(role, { transaction });
          }
        } catch (e) {
          console.log(e);
          throw e;
        }
        return user;
      },
    );

    let result = await User.findOne({
      where: { id },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return result;
  } catch (e) {
    throw e;
  }
};

exports.updateRole = async function (id, name, description, permissions) {
  //build update values
  updateValues = {};
  if (name && name.length > 0) {
    updateValues.name = name;
  }
  if (description && description.length > 0) {
    updateValues.description = description;
  }
  try {
    //use transactions to commit user
    await sequelize.transaction(
      { isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        let role;
        //update role if anything to update
        if (Object.keys(updateValues).length > 0) {
          role = await Role.update(
            { ...updateValues },
            { where: { id } },
            { transaction },
          );
        } else {
          role = await Role.findByPk(id);
        }

        //try to add psermissions, do not fail if error
        //will be because of conflict
        try {
          for (let permID of permissions) {
            let perm = await Permission.findByPk(permID);
            await role.addPermission(perm, { transaction });
          }
        } catch (e) {
          console.log(e);
        }
        return role;
      },
    );

    let result = await Role.findOne({
      where: { id },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "path", "verb"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.deleteRole = async function (id) {
  try {
    await Role.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

exports.deleteRolePermission = async function (roleID, permissionID) {
  try {
    let role = await Role.findByPk(roleID);
    let perm = await Permission.findByPk(permissionID);
    if (role && perm) {
      await role.removePermission(perm);
    }
    return permissionID;
  } catch (e) {
    throw e;
  }
};

exports.deleteUserRole = async function (userID, roleID) {
  try {
    let user = await User.findByPk(userID);
    let role = await Role.findByPk(roleID);
    if (user && role) {
      await user.removeRole(role);
    }
    return roleID;
  } catch (e) {
    throw e;
  }
};

exports.deleteUser = async function (id) {
  try {
    await User.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

exports.deletePermission = async function (id) {
  try {
    await Permission.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

//Check if permission exists
exports.permissionExists = async function (id, verb, path) {
  //validate request
  try {
    let perm;
    //find by id if id field is supplied
    if (id && id.length > 0) {
      perm = await Permission.findByPk(id);
    } else {
      perm = await Permission.findOne({
        where: { path: path, verb: verb },
      });
    }
    if (perm == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

//Validation

exports.roleExists = async function (id, name) {
  //validate request
  try {
    let role;
    //if id and name are supplied ,we are checking is the name exists for a row different from the id
    //this helps with the put request if the name is still same

    if (id && id.length > 0 && name && name.length > 0) {
      role = await Role.findOne({
        where: { name, [Op.not]: [{ id }] },
      });
    }

    //find by id if id field is supplied
    else if (id && id.length > 0) {
      role = await Role.findByPk(id);
    } else {
      role = await Role.findOne({
        where: { name },
      });
    }
    if (role == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

exports.userExists = async function (id, email, username) {
  //validate request
  try {
    let user;

    //if id and email are supplied ,we are checking if the name exists for a row different from the id
    //this helps with the put request if the email is still same

    if (id && id.length > 0 && email && email.length > 0) {
      user = await User.findOne({
        where: { email, [Op.not]: [{ id }] },
      });
    }

    //if id and username are supplied ,we are checking if the name exists for a row different from the id
    //this helps with the put request if the username is still same
    else if (id && id.length > 0 && username && username.length > 0) {
      user = await User.findOne({
        where: { username, [Op.not]: [{ id }] },
      });
    }
    //find by id if id field is supplied
    else if (id && id.length > 0) {
      user = await User.findByPk(id);
    } else if (email && email.length > 0) {
      user = await User.findOne({
        where: { email },
      });
    } else {
      user = await User.findOne({
        where: { username },
      });
    }

    if (user == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};
