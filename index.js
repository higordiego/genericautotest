
const { IntegrationRoutes } = require('src/http')


module.exports = ({
	run: (app, json) => IntegrationRoutes(app)(json)
})
