let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');

//Assertion Style
chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('API', () => {
  describe('GET /api/ping', () => {
    it('it should GET 200 response - success', (done) => {
      chai
        .request(app)
        .get('/api/ping')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          assert.equal(
            JSON.stringify(response.body),
            JSON.stringify({ success: true })
          );
          done();
        });
    });
  });
  describe('GET /api/posts', () => {
    it('it should GET /api/posts - Response 400 & Tags parameter is required', (done) => {
      chai
        .request(app)
        .get('/api/posts')
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          assert.equal(
            JSON.stringify(response.body),
            JSON.stringify({ error: 'Tags parameter is required' })
          );
          done();
        });
    });
    it('it should GET /api/posts?tags=tech&sortBy=ids - Response 400 & sortBy parameter is invalid', (done) => {
      chai
        .request(app)
        .get('/api/posts?tags=tech&sortBy=ids')
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          assert.equal(
            JSON.stringify(response.body),
            JSON.stringify({ error: 'sortBy parameter is invalid' })
          );
          done();
        });
    });
    it('it should GET /api/posts?tags=tech&direction=as - Response 400 & direction parameter is invalid', (done) => {
      chai
        .request(app)
        .get('/api/posts?tags=tech&direction=as')
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          assert.equal(
            JSON.stringify(response.body),
            JSON.stringify({ error: 'direction parameter is invalid' })
          );
          done();
        });
    });
    it('it should GET /api/posts?sortBy=ids&direction=as - Response 400 & tags parameter is required & sortBy or direction parameter is invalid', (done) => {
      chai
        .request(app)
        .get('/api/posts?sortBy=ids&direction=as')
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          assert.equal(
            JSON.stringify(response.body),
            JSON.stringify({
              errors: [
                'Tags parameter is required',
                'sortBy parameter is invalid',
                'direction parameter is invalid',
              ],
            })
          );
          done();
        });
    });
    it('it should GET /api/posts?tags=tech - Response 200', (done) => {
      chai
        .request(app)
        .get('/api/posts?tags=tech')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('it should GET /api/posts?tags=tech,health - Response 200', (done) => {
      chai
        .request(app)
        .get('/api/posts?tags=tech,health')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('it should GET /api/posts?tags=health&sortBy=id&direction=asc - Response 200', (done) => {
      chai
        .request(app)
        .get('/api/posts?tags=health&sortBy=id&direction=asc')
        .end((err, response) => {
          response.should.have.status(200);

          done();
        });
    });
  });
});
