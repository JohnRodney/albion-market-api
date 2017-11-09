import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';

/*
MongoClient.connect(devMongoURI)
  .then((db) => {
    db.collection('prices'))
  })
  .catch(err => Promise.resolve(console.log(err)));
*/
export const postEndpoint = (req, res) => {
  const data = JSON.parse(req.query.data).Orders;
  MongoClient.connect(devMongoURI)
    .then((db) => {
      db.collection('prices').insertMany(data);
    })
    .catch(err => Promise.resolve(console.log(err)));

}