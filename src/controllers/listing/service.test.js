// npm test -- --testPathPattern=deleting
const { getUsers, getRoles, getPermissions } = require("./service");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/baseRepo");
let baseRepo = require("../../data/baseRepo");

jest.mock("sequelize");

describe("Testing Get User(s)", () => {
  it("Should get single user when id is supplied", async () => {
    //query supplied with the request
    let queryBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let user = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      username: "stk",
      email: "stk@gmail.com",
    };

    //mock value returned by function
    baseRepo.getSingleUser.mockResolvedValue(Promise.resolve(user));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(user, []);
    await getUsers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should get single user when email is supplied", async () => {
    //query supplied with the request
    let queryBody = { email: "stk@gmail.com" };
    let user = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      username: "stk",
      email: "stk@gmail.com",
    };

    //mock value returned by function
    baseRepo.getSingleUser.mockResolvedValue(Promise.resolve(user));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(user, []);
    await getUsers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 when user not found", async () => {
    //query supplied with the request
    let queryBody = { email: "stk@gmail.com" };
    let user = null;

    //mock value returned by function
    baseRepo.getSingleUser.mockResolvedValue(Promise.resolve(user));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedErrors = helpers.buildError(errors.notFound, "User not found", {
      email: queryBody.email,
      id: undefined,
      username: undefined,
    });
    let expectedResponse = helpers.mockExpectedResponse({}, expectedErrors);

    await getUsers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should get all users when id, email or username is not supllied", async () => {
    //query supplied with the request
    let users = [
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
        username: "stk",
        email: "stk@gmail.com",
      },
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ed9",
        username: "stk1",
        email: "stk1@gmail.com",
      },
    ];

    //mock value returned by function
    baseRepo.getUsers.mockResolvedValue(Promise.resolve(users));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, {});
    let expectedResponse = helpers.mockExpectedResponse(users, []);
    await getUsers(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Testing Get Role(s)", () => {
  it("Should get single role when id is supplied", async () => {
    //query supplied with the request
    let queryBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let role = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "Admin",
    };

    //mock value returned by function
    baseRepo.getSingleRole.mockResolvedValue(Promise.resolve(role));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(role, []);
    await getRoles(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should get single role when name is supplied", async () => {
    //query supplied with the request
    let queryBody = { name: "Admin" };
    let role = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      name: "Admin",
    };

    //mock value returned by function
    baseRepo.getSingleRole.mockResolvedValue(Promise.resolve(role));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(role, []);
    await getRoles(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 when role not found", async () => {
    //query supplied with the request
    let queryBody = { name: "Fake_Admin" };
    let role = null;

    //mock value returned by function
    baseRepo.getSingleRole.mockResolvedValue(Promise.resolve(role));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedErrors = helpers.buildError(
      errors.notFound,
      "Role with query not found",
      { id: undefined, name: queryBody.name },
    );
    let expectedResponse = helpers.mockExpectedResponse({}, expectedErrors);

    await getRoles(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should get all users when id or name are  not supllied", async () => {
    //query supplied with the request
    let roles = [
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
        name: "admin",
      },
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ed9",
        name: "viewer",
      },
    ];

    //mock value returned by function
    baseRepo.getRoles.mockResolvedValue(Promise.resolve(roles));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, {});
    let expectedResponse = helpers.mockExpectedResponse(roles, []);
    await getRoles(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Testing Get Permissions(s)", () => {
  it("Should get single permission when id is supplied", async () => {
    //query supplied with the request
    let queryBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let perm = {
      id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
      verb: "POST",
      path: "/users",
    };

    //mock value returned by function
    baseRepo.getSinglePermission.mockResolvedValue(Promise.resolve(perm));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedResponse = helpers.mockExpectedResponse(perm, []);
    await getPermissions(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should return 400 when permissiong not found", async () => {
    //query supplied with the request
    let queryBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };
    let perm = null;

    //mock value returned by function
    baseRepo.getSinglePermission.mockResolvedValue(Promise.resolve(perm));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, queryBody);
    let expectedErrors = helpers.buildError(
      errors.notFound,
      "Permission with ID not found",
      { id: queryBody.id },
    );
    let expectedResponse = helpers.mockExpectedResponse({}, expectedErrors);

    await getPermissions(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should get all permissions when id is not supplied", async () => {
    //query supplied with the request
    let perms = [
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec8",
        verb: "POST",
        path: "/users",
      },
      {
        id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9",
        verb: "GET",
        path: "/users",
      },
    ];

    //mock value returned by function
    baseRepo.getPermissions.mockResolvedValue(Promise.resolve(perms));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest({}, {}, {});
    let expectedResponse = helpers.mockExpectedResponse(perms, []);
    await getPermissions(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
