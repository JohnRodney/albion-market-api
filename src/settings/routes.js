import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import {
  postEndpoint,
} from '../routes/routes';

export default {
  '/postMarket/': postEndpoint,
  '*': (req, res) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const prices = db.collection('prices').find().toArray();
        prices.then(p => res.send(p))
      })
      .catch(err => Promise.resolve(console.log(err)));

  },
};
