import express from 'express';
import routesHashPost from './settings/routesPost';
import routesHashGet from './settings/routesGet';
import port from './settings/port';
import bodyParser from 'body-parser';


const app = express();
const router = express.Router();





Object.keys(routesHashGet).forEach(route => router.get(route, routesHashGet[route]));
Object.keys(routesHashPost).forEach(route => router.post(route, routesHashPost[route]));

app.use(bodyParser.json())
app.use(router);
app.listen(port);

process.on('SIGTERM', e => process.exit(0));
