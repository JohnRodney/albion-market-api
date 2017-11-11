import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import itemNameMap from '../settings/items.js';
import styles from '../templates/styles';
import searchScript from '../templates/main-search';
import destinyScript from '../templates/destiny-search';


export const postEndpoint = (req, res) => {
  /* parse the data from the query params */
  const data = JSON.parse(req.query.data).Orders;

  /* insert all of the entries as single prices */
  MongoClient.connect(devMongoURI)
    .then((db) => db.collection('prices').insertMany(data))
    .catch(err => Promise.resolve(console.log(err)));

  res.sendStatus(200);
}

export const postGold = (req, res) => {
  /* parse the data from the query params */

  const data = req.body;

  MongoClient.connect(devMongoURI)
    .then((db) => db.collection('goldPrices').insert(data))
    .catch(err => Promise.resolve(console.log(err)));

  res.sendStatus(200);
  
  
}

export const destinyPage = (req, res) => {
    getBoards()
    .then(boards => {
      const playerNames = boards.map(board => board.player);
      const uniquePlayerNames = playerNames.filter((playerName, i) => playerNames.indexOf(playerName) === i).sort();

      res.send(getResponseLayout2(
        boards,
        getDropDown2(uniquePlayerNames),
		destinyScript(boards),
      ));
    })
    .catch(err => Promise.resolve(console.log(err)));

}

export const postSkills = (req, res) => {
    const data = req.body;

 	MongoClient.connect(devMongoURI, function(err, db) {
		if (err) throw err;
	  data.timestamp=Date.now();
	  db.collection("destinyBoards").insertOne(data, function(err, res) {
		if (err) throw err;
		console.log("1 Destiny board inserted");
		db.close();
	  });
	});
    res.sendStatus(200);
}

export const mainPage = (req, res) => {
  getPrices()
    .then(prices => {
      const itemNames = prices.map(price => price.ItemTypeId);
      const uniqueItemNames = itemNames.filter((itemName, i) => itemNames.indexOf(itemName) === i).sort();

      res.send(getResponseLayout(
        prices,
        getDropDown(uniqueItemNames, itemNameMap),
        searchScript(itemNameMap, prices),
      ));
    })
    .catch(err => Promise.resolve(console.log(err)));
}

function getDropDown(uniqueItemNames, itemNameMap) {
  let dropdown = '<select id="prices">';
  uniqueItemNames.forEach(name => dropdown += `<option value=${name}>${itemNameMap[name] || name}</option>`);
  dropdown += '</select>';
  return dropdown;
}
function getDropDown2(uniqueItemNames) {
  let dropdown = '<select id="players">';
  uniqueItemNames.forEach(name => dropdown += `<option value=${name}>${name}</option>`);
  dropdown += '</select>';
  return dropdown;
}

function getResponseLayout(prices, dropdown, script) {
  return `
    <div class='toolbar'>
      there are ${prices.length} prices recorded ${dropdown}
    </div>
    <div id='price-value'></div>
    ${styles}
    ${script}
  `;
}
function getResponseLayout2(prices, dropdown,script) {
	var newlen= prices.length/2;
  return `
    <div class='toolbar'>
      there are ${newlen} Destiny Boards recorded ${dropdown}
    </div>
    <div id='price-value'></div>
    ${styles}
	${script}
  `;
}
function getPrices() {
  return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const prices = db.collection('prices').find().toArray();
        prices.then(p => res(p))
      });
  })
}
function getBoards(){
	return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const boards = db.collection('destinyBoards').find().toArray();
        boards.then(p => res(p))
      });
  })
	
	
	
	
	
}
