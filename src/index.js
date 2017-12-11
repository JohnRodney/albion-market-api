import express from 'express';
import routesHashPost from './settings/routesPost';
import routesHashGet from './settings/routesGet';
import port from './settings/port';
import bodyParser from 'body-parser';


const app = express();
const router = express.Router();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};



Object.keys(routesHashGet).forEach(route => router.get(route, routesHashGet[route]));
Object.keys(routesHashPost).forEach(route => router.post(route, routesHashPost[route]));

app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use(router);
app.listen(port);

var http = require("http");
setInterval(function() {
    http.get("http://albion-data-revival.herokuapp.com");
}, 300000); // every 5 minutes (300000)

process.on('SIGTERM', e => process.exit(0));
