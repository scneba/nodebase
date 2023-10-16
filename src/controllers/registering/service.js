const baseRepo = require("../../data/baseRepo");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
exports.addPermission = async function (req, res) {
  try {
    let verb = req.body.verb;
    let path = req.body.path;
    var data = { verb, path };
    let errs = await validatePermission(verb, path);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let perm = await baseRepo.addPermission(verb, path);
    helpers.writeCreated(res, perm);
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save permission: " + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.addRole = async function (req, res) {
  try {
    let name = req.body.name;
    let permissions = req.body.permissions;
    let description = req.body.description;
    var data = { name, permissions, description };
    let errs = await validateRole("", name, permissions);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let role = await baseRepo.addRole(name, description, permissions);
    helpers.writeCreated(res, role);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to add role:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.putRole = async function (req, res) {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let permissions = req.body.permissions;
    let description = req.body.description;
    var data = { id, name, description, permissions };
    let errs = [];

    if (id == null || id.length < 1) {
      errs = helpers.buildError(
        errors.idRequired,
        "Role id is required for put operation",
        data,
      );
      helpers.writeBadRequest(res, errs);
      return;
    }

    let valid = uuid.validate(id);
    if (!valid) {
      errs = helpers.buildError(
        errors.invalidUUID,
        "Role id is invalid UUID",
        data,
      );
      helpers.writeBadRequest(res, errs);
      return;
    }

    let exists = await baseRepo.roleExists(id, "");
    if (!exists) {
      errs = helpers.buildError(
        errors.idNotExists,
        "Role with id does not exist",
        data,
      );

      helpers.writeBadRequest(res, errs);
      return;
    }

    errs = await validateRole(id, name, permissions);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }
    let role = await baseRepo.putRole(id, name, description, permissions);
    helpers.writeSuccess(res, role);
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to add role:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.addUser = async function (req, res) {
  try {
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let roles = req.body.roles;
    var data = { name, email, username, roles };

    let errs = await validateUser("", name, email, username, password, roles);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    //10 salt rounds
    await bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(error);
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
        let user = await baseRepo.addUser(email, name, username, hash, roles);
        helpers.writeCreated(res, user);
        return;
      } catch (e) {
        throw e;
      }
    });
  } catch (error) {
    console.log(error);
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save user:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.putUser = async function (req, res) {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let roles = req.body.roles;
    var data = { id, name, username, email, roles };
    if (id == null || id.length < 1) {
      errs = helpers.buildError(
        errors.idRequired,
        "User id is required for put operation",
        data,
      );
      helpers.writeBadRequest(res, errs);
      return;
    }
    let valid = uuid.validate(id);
    if (!valid) {
      errs = helpers.buildError(
        errors.invalidUUID,
        "User id is invalid UUID",
        data,
      );
      helpers.writeBadRequest(res, errs);
      return;
    }

    let exists = await baseRepo.userExists(id, "", "");
    if (!exists) {
      errs = helpers.buildError(
        errors.userNotExists,
        "User with id does not exist",
        data,
      );
      errs.push({ error: "User with id does not exist", data });
      helpers.writeBadRequest(res, errs);
      return;
    }

    errs = await validateUser(id, name, email, username, "randometext", roles);
    if (errs.length > 0) {
      helpers.writeBadRequest(res, errs);
      return;
    }

    // Save the user
    let user = await baseRepo.putUser(id, email, name, username, "", roles);
    helpers.writeSuccess(res, user);
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to save user:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.login = async function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  var data = { username, email };
  let errs = [];

  //if session already exists, return success
  if (req.session) {
    if (req.session.username || req.session.email) {
      try {
        let user = await baseRepo.getSingleUser(
          "",
          req.session.username,
          req.session.email,
        );
        helpers.writeSuccess(res, user);
      } catch (error) {
        console.log(error);
        let err = helpers.buildError(
          errors.internalServerErr,
          "Unable to perform login:" + error,
          data,
        );
        helpers.writeServerError(res, err);
      }
      return;
    }
  }

  //throw an error if both are empty
  if (
    (username == null || username.length == 0) &&
    (email == null || email.length == 0)
  ) {
    errs = helpers.buildError(
      errors.usernameEmailRequired,
      "Username or Email required for login",
      data,
    );
  }

  if (password == null || password.length == 0) {
    errs = helpers.addError(
      errs,
      errors.passwordRequired,
      "Password must be provided for login",
      data,
    );
  }

  if (errs.length > 0) {
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    let user = await baseRepo.getSingleUser("", username, email);
    if (user == null) {
      errs = helpers.buildError(
        errors.userNotExists,
        "user not found in our system",
        data,
      );
      helpers.writeBadRequest(res, errs);
      return;
    }
    //10 salt rounds
    await bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        errs = helpers.buildError(
          errors.passwordHashFailed,
          "Unable to hash password",
        );
        helpers.writeServerError(res, errs);
        return;
      }

      if (result) {
        req.session.username = username;
        req.session.email = email;
        helpers.writeSuccess(res, user);
      } else {
        errs = helpers.buildError(
          errors.incorrectPassword,
          "Incorrect password",
          data,
        );
        helpers.writeBadRequest(res, errs);
      }
    });
  } catch (e) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to perform login:" + error,
      data,
    );
    helpers.writeServerError(res, err);
  }
};

exports.logout = async function (req, res) {
  //if session already exists, return success
  if (req.session) {
    try {
      await req.session.destroy();
    } catch (e) {
      let err = helpers.buildError(
        errors.internalServerErr,
        "Unable to perform logout:" + error,
        data,
      );
      helpers.writeServerError(res, err);
      return;
    }
    helpers.writeSuccess(res, { msg: "User logged out" });
  }
};

/**
 *
 * @param {string} verb
 * @param {string} path
 * @returns Array of errors
 */
async function validatePermission(verb, path) {
  let data = { verb, path };
  let errs = [];
  if (verb == null || verb.length == 0) {
    errs = helpers.buildError(
      errors.verbRequired,
      "Verb must be provided",
      data,
    );
  }
  if (path == null || path.length == 0) {
    errs = helpers.addError(
      errs,
      errors.pathRequired,
      "Path must be provided",
      data,
    );
  }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await baseRepo.permissionExists("", verb, path);
    if (found) {
      errs = helpers.buildError(
        errors.permissionExist,
        "Permission already exist",
        data,
      );
      return errs;
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

async function validateRole(id, name, permissions) {
  let data = { name, permissions };
  let errs = [];
  if (name == null || name.length == 0) {
    errs = helpers.buildError(
      errors.roleNameRequired,
      "Role name is required",
      data,
    );
  }

  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await baseRepo.roleExists(id, name);
    if (found) {
      errs = helpers.buildError(
        errors.roleNameExist,
        "Role name already exist",
        data,
      );
    }

    //check permissions if they exists
    if (permissions) {
      for (let perm_id of permissions) {
        let valid = uuid.validate(perm_id);
        if (!valid) {
          errs = helpers.addError(
            errs,
            errors.invalidUUID,
            "Invalid UUID",
            perm_id,
          );
          continue;
        }
        found = await baseRepo.permissionExists(perm_id, "", "");
        if (!found) {
          errs = helpers.addError(
            errs,
            errors.permissionNotFound,
            "Permission does not exist",
            perm_id,
          );
        }
      }
    }
  } catch (e) {
    throw e;
  }
  return errs;
}

//Validation
async function validateUser(id, name, email, username, password, roles) {
  let data = { id, name, email, username, roles };
  let errs = [];
  if (name == null || name.length == 0) {
    errs = helpers.addError(
      errs,
      errors.nameRequired,
      "Name  is required",
      data,
    );
  }
  if (email == null || email.length == 0) {
    errs = helpers.addError(
      errs,
      errors.emailRequired,
      "Email  is required",
      data,
    );
  }
  if (username == null || username.length == 0) {
    errs = helpers.addError(
      errs,
      errors.usernameRequired,
      "Username  is required",
      data,
    );
  }

  if (password == null || password.length == 0) {
    errs = helpers.addError(
      errs,
      errors.passwordRequired,
      "Password is required",
      data,
    );
  }

  //making role optional
  //TODO - add default role if user has no role
  // if (roles == null || roles.length == 0) {
  //   errs = helpers.addError(
  //     errs,
  //     errors.oneRoleRequired,
  //     "User must have at least one role",
  //     data,
  //   );
  // }
  if (errs.length > 0) {
    return errs;
  }
  try {
    let found = await baseRepo.userExists(id, email, "");
    if (found) {
      errs = helpers.addError(
        errs,
        errors.emailExists,
        "Email already exists",
        data,
      );
    }

    if (username) {
      found = await baseRepo.userExists(id, "", username);
      if (found) {
        errs = helpers.addError(
          errs,
          errors.userNameExists,
          "Username already exists",
          data,
        );
      }
    }

    if (roles) {
      for (let roleID of roles) {
        let valid = uuid.validate(roleID);
        if (!valid) {
          errs = helpers.addError(
            errs,
            errors.invalidUUID,
            "Invalid UUID",
            roleID,
          );
          continue;
        }
        found = await baseRepo.roleExists(roleID, "");
        if (!found) {
          errs = helpers.addError(
            errs,
            errors.roleNotExist,
            "Role with ID does not exist",
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
