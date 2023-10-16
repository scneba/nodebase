const baseRepo = require("../../data/baseRepo");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

exports.updateUser = async function (req, res) {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let roles = req.body.roles;

    var data = { id, name, username, email, roles };

    let errs = await validateUserUpdateFields(
      id,
      name,
      email,
      username,
      password,
      roles,
    );
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    if (password && password.length > 0) {
      //10 salt rounds
      await bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          let err = helpers.buildError(
            errors.internalServerErr,
            "Unable to hash password:" + error,
            data,
          );
          helpers.writeServerError(res, err);
          return;
        }

        // Save the user
        try {
          let user = await baseRepo.updateUser(
            id,
            email,
            name,
            username,
            hash,
            roles,
          );
          helpers.writeSuccess(res, user);
        } catch (e) {
          throw e;
        }
      });
    } else {
      // Save the user
      let user = await baseRepo.updateUser(
        id,
        email,
        name,
        username,
        "",
        roles,
      );
      helpers.writeSuccess(res, user);
    }
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to update user:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.updateRole = async function (req, res) {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let permissions = req.body.permissions;
    var data = { id, name, description, permissions };

    let errs = await validateRoleUpdateFields(
      id,
      name,
      description,
      permissions,
    );
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    // Save the role
    let role = await baseRepo.updateRole(id, name, description, permissions);
    helpers.writeSuccess(res, role);
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to update role:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

async function validateUserUpdateFields(
  id,
  name,
  email,
  username,
  password,
  roles,
) {
  let data = { id, name, email, username, roles };
  let errs = [];
  let found;
  if (id == null || id.length == 0) {
    errs = helpers.addError(
      errs,
      errors.idRequired,
      "ID  is required to update user",
      data,
    );
    return errs;
  }

  try {
    //user with id should exist in the system
    found = await baseRepo.userExists(id, "", "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.userNotExists,
        "User with id not found",
        data,
      );
      return errs;
    }
    //check other unique fields
    if (email && email.length > 0) {
      found = await baseRepo.userExists("", email, "");
      if (found) {
        errs = helpers.addError(
          errs,
          errors.emailExists,
          "Email already exists",
          data,
        );
      }
    }
    if (username && username.length > 0) {
      found = await baseRepo.userExists("", "", username);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.userNameExists,
          "Username already exists",
          data,
        );
      }
    }
    if (password && password.length < 5) {
      errs = helpers.addError(
        errs,
        errors.passwordError,
        "Password  should be more than 5 characters",
        data,
      );
    }

    if (roles && roles.length > 0) {
      for (let roleID of roles) {
        let valid = uuid.validate(roleID);
        if (!valid) {
          errs = helpers.addError(
            errs,
            errors.invalidUUID,
            "Invalid UUID " + roleID,
            roleID,
          );
          continue;
        }
        found = await baseRepo.roleExists(roleID, "");
        if (!found) {
          errs = helpers.addError(
            errs,
            errors.roleNotExist,
            "Role does not exist: " + roleID,
            roleID,
          );
        }
      }
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

async function validateRoleUpdateFields(id, name, description, permissions) {
  let data = { id, name, description, permissions };
  let errs = [];
  let found;
  if (id == null || id.length == 0) {
    errs = helpers.addError(
      errs,
      errors.idRequired,
      "id  is required to update role ",
      data,
    );
    return errs;
  }

  try {
    //role with id should exist in the system
    found = await baseRepo.roleExists(id, "");
    if (!found) {
      errs = helpers.addError(
        errs,
        errors.roleNotExist,
        "Role with ID not found; " + id,
        data,
      );
      return errs;
    }
    //check other unique fields
    if (name && name.length > 0) {
      found = await baseRepo.roleExists("", name);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.roleNameExist,
          "Role name already exists",
          data,
        );
      }
    }

    if (permissions && permissions.length > 0) {
      for (let permID of permissions) {
        let valid = uuid.validate(permID);
        if (!valid) {
          errs = helpers.addError(
            errs,
            errors.invalidUUID,
            "Invalide UUID",
            permID,
          );
          continue;
        }
        found = await baseRepo.permissionExists(permID, "", "");
        if (!found) {
          errs = helpers.addError(
            errs,
            errors.permissionNotFound,
            "Permission does not exist: " + permID,
            permID,
          );
        }
      }
    }
  } catch (e) {
    throw e;
  }
  return errs;
}
