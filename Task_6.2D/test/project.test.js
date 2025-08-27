const expect = require("chai").expect;
const request = require("request");

describe("Projects API", function () {
  const baseUrl = "http://localhost:3000";

  //API test to check if server is running
  it("returns status 200 to check if api works", function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  //test to check if projects endpoint returns correct structure
  it("should return projects data with correct structure", function (done) {
    request.get(`${baseUrl}/api/projects`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      
      const responseData = JSON.parse(body);
      expect(responseData).to.have.property('statusCode');
      expect(responseData).to.have.property('data');
      expect(responseData).to.have.property('message');
      expect(responseData.statusCode).to.equal(200);
      expect(responseData.message).to.equal('Success');
      expect(responseData.data).to.be.an('array');
      
      done();
    });
  });

  //test to check if content type is json
  it("should return JSON content type", function (done) {
    request.get(`${baseUrl}/api/projects`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.headers['content-type']).to.include('application/json');
      done();
    });
  });

  //error handling test for non-existent endpoint
  it("should return 404 for non-existent endpoint", function (done) {
    request.get(`${baseUrl}/api/nonexistent`, function (error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

});