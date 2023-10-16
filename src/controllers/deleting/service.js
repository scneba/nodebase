const uuid = require("uuid");
const baseRepo = require("../../data/baseRepo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

/**
 * Delete user
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteUser = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteUser(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

/**
 * Delete Role
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteRole = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deleteRole(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};

/**
 * Delete permission
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deletePermission = async function (req, res) {
  let id = req.body.id;
  let data = { id };
  let valid = uuid.validate(id);
  if (!valid) {
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", data);
    helpers.writeBadRequest(res, errs);
    return;
  }

  try {
    await baseRepo.deletePermission(id);
    helpers.writeSuccess(res, id);
  } catch (e) {
    console.log(e);
    helpers.writeServerError(res, e);
  }
};
