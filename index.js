/* Config .env */
require('dotenv').config()

/* Express */
const express = require('express')
const app = express()
const port = 3000

/* Routes */
const home = require("./app/home")

/* Set Global Config */
global.year = (new Date()).getFullYear()

/* Assets */
app.use('/assets', express.static(__dirname + '/theme/assets'));

/* Template Egine */
app.set('view engine', 'ejs')
app.set("views", "theme/views")

/* Parsing form */
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

/* Start Routes */
app.use('/', home)

app.get('*', function(req, res){
    res.status(400).render("not_found", { statusCode: res.statusCode })
});
  

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})