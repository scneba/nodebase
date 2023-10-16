// npm test -- --testPathPattern=deleting
const { addPermission, addUser, addRole } = require("./service");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/baseRepo");
let baseRepo = require("../../data/baseRepo");

jest.mock("sequelize");

describe("Test Adding permissions)", () => {
  it("Should register permission when verb and path are supplied", async () => {
    //query supplied with the request
    let body = { verb: "POST", path: "/users" };

    let id = "cb48f03a-90f2-4a70-aa82-0f4256595ec9";
    //mock value returned by function
    baseRepo.addPermission.mockResolvedValue(Promise.resolve(id));
    baseRepo.permissionExists.mockResolvedValue(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let expectedResponse = helpers.mockExpectedResponse(id, []);
    await addPermission(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 if path and verb are not supplied", async () => {
    //query supplied with the request
    let body = {};
    let data = { verb: undefined, path: undefined };
    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let errs = helpers.buildError(
      errors.verbRequired,
      "Verb must be provided",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.pathRequired,
      "Path must be provided",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addPermission(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 if permission already exists", async () => {
    //query supplied with the request
    let body = { verb: "POST", path: "/users" };

    baseRepo.permissionExists.mockResolvedValue(Promise.resolve(true));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.permissionExist,
      "Permission already exist",
      body,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addPermission(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Test adding Roles", () => {
  it("Should successfully add a role", async () => {
    //body supplied with the request
    let body = {
      name: "Admin",
      description: "Boss of the db",
      permissions: ["cb48f03a-90f2-4a70-aa82-0f4256595ec9"],
    };

    let id = "cb48f03a-90f2-4a70-aa82-0f4256595ed9";
    //mock value returned by function
    baseRepo.addRole.mockResolvedValue(Promise.resolve(id));
    baseRepo.permissionExists.mockResolvedValue(Promise.resolve(true));
    baseRepo.roleExists.mockResolvedValue(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let expectedResponse = helpers.mockExpectedResponse(id, []);
    await addRole(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should fail when fields not supplied-validateRole", async () => {
    //body supplied with the request
    let body = {};
    let data = {
      name: undefined,
      permissions: undefined,
    };

    let errs = helpers.buildError(
      errors.roleNameRequired,
      "Role name is required",
      data,
    );

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addRole(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should fail when role name exists or when permission supplied does not exist", async () => {
    //body supplied with the request
    //body supplied with the request
    let body = {
      name: "Admin",
      permissions: ["cb48f03a-90f2-4a70-aa82-0f4256595ec9"],
    };

    let id = "cb48f03a-90f2-4a70-aa82-0f4256595ed9";
    //mock value returned by function
    baseRepo.permissionExists.mockResolvedValue(Promise.resolve(false));
    baseRepo.roleExists.mockResolvedValue(Promise.resolve(true));

    let errs = helpers.buildError(
      errors.roleNameExist,
      "Role name already exist",
      body,
    );
    errs = helpers.addError(
      errs,
      errors.permissionNotFound,
      "Permission does not exist",
      body.permissions[0],
    );

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addRole(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Test adding Users", () => {
  it("Should return 400 for empty user fields", async () => {
    let body = {};
    let data = {
      id: "",
      username: undefined,
      email: undefined,
      name: undefined,
      roles: undefined,
    };
    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let errs = helpers.buildError(
      errors.nameRequired,
      "Name  is required",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.emailRequired,
      "Email  is required",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.usernameRequired,
      "Username  is required",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.passwordRequired,
      "Password is required",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 for empty user fields", async () => {
    //body supplied with the request
    let body = {
      username: "stk",
      email: "stk@gmail.com",
      name: "the stk himself",
      description: "Boss of the db",
      roles: ["cb48f03a-90f2-4a70-aa82-0f4256595ec9"],
      password: "abceidied",
    };
    let data = {
      id: "",
      username: "stk",
      email: "stk@gmail.com",
      name: "the stk himself",
      roles: ["cb48f03a-90f2-4a70-aa82-0f4256595ec9"],
    };

    baseRepo.userExists.mockResolvedValue(Promise.resolve(true));
    baseRepo.roleExists.mockResolvedValue(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let errs = helpers.buildError(
      errors.emailExists,
      "Email already exists",
      data,
    );
    errs = helpers.addError(
      errs,
      errors.userNameExists,
      "Username already exists",
      data,
    );

    errs = helpers.addError(
      errs,
      errors.roleNotExist,
      "Role with ID does not exist",
      body.roles[0],
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await addUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
