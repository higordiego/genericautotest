const request = require('supertest')

const beEqual = ({ status, equalStatus, equalBody, equalData }) => {
  expect(status).toBe(equalStatus)
  expect(equalBody).toBe(equalData)
}


const factoryExpect = ({ equalData, equalBody, equalStatus, status, type }) => {
  switch (type.toLowerCase()) {

    case 'be':
    default:
      return beEqual({ status, equalStatus, equalData, equalBody })
  }
}

const expectToResponse = (done, status, data, type = 'be') => (_, res) => {
  factoryExpect({ equalData: data, equalBody: res.body, equalStatus: status, status: res.statusCode, type })
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

