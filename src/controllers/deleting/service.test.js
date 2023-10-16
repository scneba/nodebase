// npm test -- --testPathPattern=deleting
const { deleteUser, deletePermission } = require("./service");
const { mockRequest, mockResponse } = require("../../utils/interceptors");
const helpers = require("../../utils/helpers");
const errors = require("./errors");

jest.mock("../../data/baseRepo");
let baseRepo = require("../../data/baseRepo");

jest.mock("sequelize");

describe("Testing Delete User", () => {
  it("Should call baseRepo's deleteUser and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    baseRepo.deleteUser.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deleteUser(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec999" };
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", reqBody);
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe("Testing Delete Permission", () => {
  it("Should call baseRepo's deletePermission and return success", async () => {
    //body supplied with the request
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec9" };

    //mock value returned by function
    baseRepo.deletePermission.mockResolvedValue(Promise.resolve(reqBody.id));

    //use interceptors to  mock req and response values
    const res = mockResponse();
    const req = mockRequest(reqBody);
    let expectedResponse = helpers.mockExpectedResponse(reqBody.id, []);
    await deletePermission(req, res);

    //make sure the right status and response are emitted
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("Should Fail with invalid UUID and 400 error", async () => {
    let reqBody = { id: "cb48f03a-90f2-4a70-aa82-0f4256595ec999" };
    let errs = helpers.buildError(errors.invalidUUID, "Invalid UUID", reqBody);
    let expectedResponse = helpers.mockExpectedResponse({}, errs);
    const res = mockResponse();
    const req = mockRequest(reqBody);

    await deletePermission(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});
