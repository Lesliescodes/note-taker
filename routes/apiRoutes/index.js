const router = require('express').Router();

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// add our new route https://morioh.com/p/a1cd78288d90
const notesRoutes = require('./noteRoutes')

//https://www.geeksforgeeks.org/express-js-router-use-function/
//"The router.use() function uses the specified middleware function or functions. It basically mounts middleware for the routes which are being served by the specific router."
router.use(notesRoutes);


//module.exports=router is mapping a router and all logic that's required to map (along with the right callbacks etc...)
//https://stackoverflow.com/questions/56078508/why-is-module-exports-router-is-needed
module.exports = router;