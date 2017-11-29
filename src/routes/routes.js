import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import itemNameMap from '../settings/items.js';
import styles from '../templates/styles';
import searchScript from '../templates/main-search';
import destinyScript from '../templates/destiny-search';

var skills=[ "20", "22", "25", "27", "28", "30", "32", "34", "36", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "59", "60", "61", "64", "65", "66", "67", "79", "81", "82", "83", "86", "88", "90", "91", "93", "95", "96", "98", "99", "100", "107", "109", "110", "111", "113", "118", "123", "124", "125", "126", "128", "130", "132", "133", "135", "136", "140", "141", "145", "146", "147", "148", "161", "170", "171", "175", "178", "269", "270", "271", "274", "308", "309", "310", "311", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "343", "344", "348", "353", "354", "360", "365", "366", "386", "389", "395", "401", "408", "418" ];


export const postEndpoint = (req, res) => {
  /* parse the data from the query params */
  const data = JSON.parse(req.query.data).Orders;

  /* insert all of the entries as single prices */
  MongoClient.connect(devMongoURI)
    .then((db) => db.collection('prices').insertMany(data))
    .catch(err => Promise.resolve(console.log(err)));

  res.sendStatus(200);
}
export const getUndefinedSkills = (req, res) => {
  /* parse the data from the query params */
  //const data = JSON.parse(req.params.sid);
  
	getUndefinedBoards(skills)
    .then(boards => {
        res.send(boards);
    })
    .catch(err => Promise.resolve(console.log(err)));
	


  
}
export const postGold = (req, res) => {
  /* parse the data from the query params */

  const data = req.body;

  MongoClient.connect(devMongoURI)
    .then((db) => db.collection('goldPrices').insert(data))
    .catch(err => Promise.resolve(console.log(err)));

  res.sendStatus(200);
  
  
}

export const postNodes = (req, res) => {
    const data = req.body;
//console.log(data.skills.length);

	//if(data.skills.length >70){
	//	setTimeout(function() {
	//		delayedprocess(data,req,res)
	//	}, 30000);

	//console.log(data);
	
		MongoClient.connect(devMongoURI, function(err, db) {
			var bulk = db.collection("ResourceNodes").initializeUnorderedBulkOp();
			console.log(data);
			var updatefield={};
			for (var i = 0, len = data.nodes.length; i < len; i++) {
				var query =  { NodeId: data.NodeId};
				updatefield=
				{ 
					$set: { 
						NodeId: data.nodes[i].NodeId,
						NodeTier: data.nodes[i].Tier,
						NodeCharges: data.nodes[i].Charges,
						NodeLocationX: data.nodes[i].NodeLocationX,
						NodeLocationZ: data.nodes[i].NodeLocationZ,
						NodeThing: data.nodes[i].NodeThing,
						Zone: data.zone
					} 
				};

				if(Object.keys(updatefield).length) {
					bulk.find(query).upsert().update(updatefield);
				}
			}	
			setTimeout(function() {
				bulk.execute();
			}, 10000);
			
		});
	
    res.sendStatus(200);
}

export const getPriceOfItem = (req, res) => {
  /* parse the data from the query params */
  
  getItemPrices(req.params.item)
    .then(prices => {
      res.send(prices);
    })
    .catch(err => Promise.resolve(console.log(err)));
  
  
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

export const getPlayerBoardsBySkill = (req, res) => {
	
    getBoardsBySkill(req.params.sid)
    .then(boards => {
		res.send(boards);
    })
    .catch(err => Promise.resolve(console.log(err)));

}

export const postSkills = (req, res) => {
    const data = req.body;
//console.log(data.skills.length);

	//if(data.skills.length >70){
	//	setTimeout(function() {
	//		delayedprocess(data,req,res)
	//	}, 30000);

	//console.log(data);
		MongoClient.connect(devMongoURI, function(err, db) {
			var bulk = db.collection("destinyBoards").initializeUnorderedBulkOp();
			console.log(data.skills.length);
			var updatefield={};
			for (var i = 0, len = data.skills.length; i < len; i++) {
				var query =  { player: data.player, SID:data.skills[i].SID};
				updatefield=
				{ 
					$set: { 
						player: data.player,
						SID: data.skills[i].SID,
						SLVL: data.skills[i].SLVL,
						SPER: data.skills[i].SPER
					} 
				};
				
				if(Object.keys(updatefield).length) {
					bulk.find(query).upsert().update(updatefield);
				}
			}	
			setTimeout(function() {
				bulk.execute();
			}, 10000);
			
		});

		
		
		
		/*
		
		MongoClient.connect(devMongoURI, function(err, db) {
			var query = { player: data.player };
			
			
			
			
			
			db.collection("destinyBoards").update({ _id: id },
			
			
			find(query).toArray(function(err, result) {
				if (err) throw err;
				//console.log(result.length);
				if(result.length ==1){
					console.log("Updated 1 player's destiny board: "+data.player);
					//get ida
					var id = result[0]['_id'];
					var skills = result[0]['skills'];
					//console.log(skills);			
					//grab current skills
					//update skills
					

					for (var i = 0, len = data.skills.length; i < len; i++) {
						skills[i]=data.skills[i];
					}								
									
					//and do update

					db.collection("destinyBoards").update(
						{ _id: id },
						{
							$set: {
								"skills": skills,
								"timestamp": Date.now()
							}
						}
					)


				}else{
					//do insert
					
					//add the timestamp
					data.timestamp=Date.now();
					
					// fix skill structure
					var newskills={};
					for (var i = 0, len = data.skills.length; i < len; i++) {
						newskills[i]=data.skills[i];
					}
					data.skills=newskills;
					
					db.collection("destinyBoards").insertOne(data, function(err, res) {
						if (err) throw err;
						console.log("1 New player's destiny board added: "+data.player);
						if(data.player==""){
							console.log(data);
						}
					});
				}
				//console.log(result);
				db.close();
			});
		});
		*/
	
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


function getItemPrices(item){
	var query = { ItemGroupTypeId: item };
	var fields = {
		"ItemGroupTypeId": true,
		"LocationId": true,
		"QualityLevel": true,
		"EnchantmentLevel": true,
		"UnitPriceSilver": true,
		"Amount": true,
		"AuctionType": true,
		"Expires": true
	}
	
	var options = {
		"limit":1,
		"sort": [['UnitPriceSilver','asc']]		
	}

	return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const prices = db.collection('prices').findOne(query,fields,options);
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
function getUndefinedBoards(skills){
	var query = { SID: { $nin: skills } };

	return new Promise((res, rej) => {
    MongoClient.connect(devMongoURI)
      .then((db) => {
        const boards = db.collection('destinyBoards').find(query).toArray();
        boards.then(p => res(p))
      });
  })
	
	
}
function getBoardsBySkill(SID){
	return new Promise((res, rej) => {
		MongoClient.connect(devMongoURI)
		.then((db) => {
			var query = { SID: SID };
			var mysort = { SLVL: 1 };
			const boards = db.collection('destinyBoards').find(query).sort(mysort).toArray();
			boards.then(p => res(p));
		});
  })
}
function delayedprocess(data, req, res){
/*	
			MongoClient.connect(devMongoURI, function(err, db) {
			var query = { player: data.player };
			db.collection("destinyBoards").find(query).toArray(function(err, result) {
				if (err) throw err;
				//console.log("in deleayed");
				//console.log("result lenght:"+result.length);
				if(result.length ==1){
					console.log("Updated 1 player's destiny board: "+data.player);
					//get ida
					var id = result[0]['_id'];
					var skills = result[0]['skills'];
					//console.log(skills);			
					//grab current skills
					//update skills
					

					for (var i = 0, len = data.skills.length; i < len; i++) {
						skills[]=data.skills[i];
					}								
									
					//and do update

					db.collection("destinyBoards").update(
						{ _id: id },
						{
							$set: {
								"skills": skills,
								"timestamp": Date.now()
							}
						}
					)
//console.log("update done");

				}else{
					//do insert
					//console.log("do insert");
					//add the timestamp
					data.timestamp=Date.now();
					
					// fix skill structure
					var newskills={};
					for (var i = 0, len = data.skills.length; i < len; i++) {
						newskills[i]=data.skills[i];
					}
					data.skills=newskills;
					
					db.collection("destinyBoards").insertOne(data, function(err, res) {
						if (err) throw err;
						console.log("1 New player's destiny board added: "+data.player);
						if(data.player==""){
							console.log(data);
						}
					});
					//	console.log("insert done");
				}
				//console.log(result);
				db.close();
			});
		});	
		*/
}
