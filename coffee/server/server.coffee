connect = require 'connect'

app = connect.createServer()
app.use(connect.static(__dirname))
app.use(connect.logger())

app.listen(8080)
