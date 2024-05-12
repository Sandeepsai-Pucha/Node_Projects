const express = require("express")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
const port = 3000

app.get('/', (request, response) => {
    response.send("Welcome Champ...")
});

require('./app/models/index')
require('./app/routes/exmp.routes')(app)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});
