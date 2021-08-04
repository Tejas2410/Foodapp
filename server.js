const app = require('./index.js')


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening at port " + port);
})

