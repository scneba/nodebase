// npm test -- --testPathPattern=deleting
const { updateRole, updateUser } = require("./service");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/baseRepo");
let baseRepo = require("../../data/baseRepo");

jest.mock("sequelize");

describe("Test Updating user)", () => {
  it("Should fail when id is not supplied", async () => {
    //query supplied with the request
    let body = {};
    let data = {
      id: undefined,
      name: undefined,
      email: undefined,
      username: undefined,
      roles: undefined,
    };

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.idRequired,
      "ID  is required to update user",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should fail when user is not found", async () => {
    //query supplied with the request
    let body = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let data = {
      id: body.id,
      name: undefined,
      email: undefined,
      username: undefined,
      roles: undefined,
    };

    let id = "cb48f03a-90f2-4a70-aa82-0f4256595ec9";
    baseRepo.userExists.mockResolvedValue(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.userNotExists,
      "User with id not found",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should fail for the other unique fields if already exist", async () => {
    //query supplied with the request
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "stk",
      email: "stk@gmail.com",
      username: "stk",
      roles: ["cb48f03a-90f2-4a70-aa83-0f4256595ec9"],
      password: "abc",
    };
    let data = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "stk",
      email: "stk@gmail.com",
      username: "stk",
      roles: ["cb48f03a-90f2-4a70-aa83-0f4256595ec9"],
    };

    baseRepo.userExists.mockResolvedValue(Promise.resolve(true));
    // .mockReturnValueOnce(Promise.resolve(false))
    // .mockReturnValueOnce(Promise.resolve(false));

    baseRepo.roleExists.mockResolvedValue(Promise.resolve(true));

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
      errors.passwordError,
      "Password  should be more than 5 characters",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should succeed with 200", async () => {
    //query supplied with the request
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "stk",
      email: "stk@gmail.com",
      username: "stk",
      roles: ["cb48f03a-90f2-4a70-aa83-0f4256595ec9"],
    };

    baseRepo.updateUser.mockResolvedValue(Promise.resolve(body));

    baseRepo.userExists
      .mockResolvedValueOnce(Promise.resolve(true))
      .mockResolvedValue(Promise.resolve(false));

    baseRepo.roleExists.mockResolvedValue(Promise.resolve(true));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let expectedResponse = helpers.mockExpectedResponse(body, []);
    await updateUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Test Updating Role)", () => {
  it("Should fail when id is not supplied", async () => {
    //query supplied with the request
    let body = {};
    let data = {
      id: undefined,
      name: undefined,
      description: undefined,
      permissions: undefined,
    };

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.idRequired,
      "id  is required to update role ",
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateRole(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should fail when role is not found", async () => {
    //query supplied with the request
    let body = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let data = {
      id: body.id,
      name: undefined,
      description: undefined,
      permissions: undefined,
    };

    let id = "cb48f03a-90f2-4a70-aa82-0f4256595ec9";
    baseRepo.roleExists.mockResolvedValue(Promise.resolve(false));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});
    let errs = helpers.buildError(
      errors.roleNotExist,
      "Role with ID not found; " + id,
      data,
    );
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    await updateRole(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should succeed with 200", async () => {
    //query supplied with the request
    let body = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "Admin",
      description: "Boss of the db",
      permissions: ["cb48f03a-90f2-4a70-aa83-0f4256595ec9"],
    };

    baseRepo.updateUser.mockResolvedValue(Promise.resolve(body));
    baseRepo.roleExists
      .mockResolvedValueOnce(Promise.resolve(true))
      .mockResolvedValueOnce(Promise.resolve(false));

    baseRepo.userExists
      .mockResolvedValueOnce(Promise.resolve(true))
      .mockResolvedValue(Promise.resolve(false));

    baseRepo.roleExists.mockResolvedValue(Promise.resolve(true));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(body, {}, {});

    let expectedResponse = helpers.mockExpectedResponse(body, []);
    await updateUser(req, res);
    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
