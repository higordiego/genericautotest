
const requestHttp = require('./request')

function describeGet (value, app) {
  describe(value.describe, () => {
    test(value.description, (done) => requestHttp.defaultGet(app, { ...value, done }))
  })
}

function describePost (value, app) {
  describe(value.describe, () => {
    test(value.description, (done) => requestHttp.defaultPost(app, { ...value, done }))
  })
}

function describePut (value, app) {
  describe(value.describe, () => {
    test(value.description, (done) => requestHttp.defaultPut(app, { ...value, done }))
  })
}

function describeDelete (value, app) {
  describe(value.describe, () => {
    test(value.description, (done) => requestHttp.defaultDelete(app, { ...value, done }))
  })
}

exports.IntegrationRoutes = (app, json) => {
  beforeEach(function (done) {
    if (json.object.beforeEach) json.object.beforeEach.fn(done)
    else done()
  })

  describe(json.describe, function () {
    // get
    if (json.object.get.length > 0) json.object.get.map(value => describeGet(value.it, app))

    // post
    if (json.object.post.length > 0) json.object.post.map(value => describePost(value.it, app))

    // put
    if (json.object.put.length > 0) json.object.put.map(value => describePut(value.it, app))

    // delete
    if (json.object.delete.length > 0) json.object.delete.map(value => describeDelete(value.it, app))
  })
}
