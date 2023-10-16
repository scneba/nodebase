const baseRepo = require("../../data/baseRepo");
const helpers = require("../../utils/helpers");
const errors = require("./errors");
exports.authenticate = async function (req, res, next) {
  //check for a token, then the session
  //token not implemented yet
  if (req.session) {
    if (req.session.username || req.session.email) {
      next();
      return;
    }
  }

  let errs = helpers.buildError(
    errors.userNotAuthorized,
    "User not authorized",
    {},
  );
  helpers.writeResponse(res, {}, errs, 401);
  return;
};

exports.authorize = async function (req, res, next) {
  //check if user exists and also has permission to the resource requested
  let username = req.session.username;
  let email = req.session.email;
  let path = req.path;
  let method = req.method;

  try {
    let hasPermission = await baseRepo.userHasPermissions(
      username,
      email,
      path,
      method,
    );
    if (hasPermission) {
      //hurray, you can access the resource
      next();
      return;
    } else {
      let errs = helpers.buildError(
        errors.userNotAuthorized,
        "User is not authorized to access this resource",
        {},
      );
      helpers.writeResponse(res, {}, errs, 401);
      return;
    }
  } catch (e) {
    let err = helpers.buildError(
      errors.internalServerErr,
      "Unable to get authorize user:" + error,
      {},
    );
    helpers.writeServerError(res, err);
    return;
  }
};

//NOT Used
exports.authenticateToken = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No Bearer token sent!" });
  }
  const token = extractToken(req);
  if (token === process.env.TOKEN) next();
  else {
    let errs = helpers.buildError(
      errors.userNotAuthorized,
      "Provided token does not match",
      {},
    );
    helpers.writeResponse(res, {}, errs, 403);
  }
};
