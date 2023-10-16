const baseRepo = require("../../data/baseRepo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

exports.getUsers = async function (req, res) {
  try {
    let username = req.query.username;
    let id = req.query.id;
    let email = req.query.email;
    let data;
    if (username || id || email) {
      data = await baseRepo.getSingleUser(id, username, email);
      if (data) {
        helpers.writeSuccess(res, data);
      } else {
        let errs = helpers.buildError(errors.notFound, "User not found", {
          id,
          username,
          email,
        });
        helpers.writeBadRequest(res, errs);
      }
    } else {
      data = await baseRepo.getUsers();
      helpers.writeSuccess(res, data);
    }
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get users:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};

exports.getRoles = async function (req, res) {
  try {
    let name = req.query.name;
    let id = req.query.id;
    let data;
    if (name || id) {
      data = await baseRepo.getSingleRole(id, name);
      if (data) {
        helpers.writeSuccess(res, data);
      } else {
        let errs = helpers.buildError(
          errors.notFound,
          "Role with query not found",
          { id, name },
        );
        helpers.writeBadRequest(res, errs);
      }
    } else {
      data = await baseRepo.getRoles();
      helpers.writeSuccess(res, data);
    }
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get roles:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};
exports.getPermissions = async function (req, res) {
  try {
    let id = req.query.id;
    let path = req.query.path;
    let verb = req.query.verb;
    if (id && id.length > 0) {
      let data = await baseRepo.getSinglePermission(id);
      if (data) {
        helpers.writeSuccess(res, data);
      } else {
        let errs = helpers.buildError(
          errors.notFound,
          "Permission with ID not found",
          { id },
        );
        helpers.writeBadRequest(res, errs);
      }
    } else {
      data = await baseRepo.getPermissions(path, verb);
      helpers.writeSuccess(res, data);
    }
  } catch (error) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get permissions:" + error,
      {},
    );
    helpers.writeServerError(res, err);
  }
};
