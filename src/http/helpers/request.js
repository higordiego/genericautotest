var request = require('supertest')

const expectToResponse = (done, status, be) => (_, res) => {
  expect(res.statusCode).toBe(status)
  expect(typeof res.body).toBe(be)
  done()
}

exports.defaultPost = (app, { url, body, status, token, be, done }) => {
  request(app)
    .post(url)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .end(expectToResponse(done, status, be))
}
exports.defaultGet = (app, {url, status, token, be, done}) => {
  request(app)
    .get(url)
    .send()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .end(expectToResponse(done, status, be))
}

exports.defaultPut = (app, {url, body, status, token, be, done}) => {
  request(app)
    .put(url)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .end(expectToResponse(done, status, be))
}
exports.defaultDelete = (app, {url, body, status, token, be, done}) => {
  request(app)
    .post(url)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .end(expectToResponse(done, status, be))
}

