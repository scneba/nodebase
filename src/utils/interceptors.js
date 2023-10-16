//These are interceptors to help with testing.
exports.mockRequest = (body, params = {}, query = {}) => {
  const req = {};
  req.body = body;
  req.params = params;
  req.query = query;
  return req;
};

exports.mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockResolvedValue({});
  res.status = jest.fn().mockResolvedValue({});
  res.json = jest.fn().mockResolvedValue({});
  return res;
};
