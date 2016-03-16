"use strict";
const db = require('userDBadapter');
const Promise = require('bluebird');
const user = [{name: "Jack"}, {name: "Ammi"}, {name: "Klara"}]

/**
 * hugla node user memory db adapter
 */
class HuglaUserMemoryDBAdapter extends db {

	/**
	 * Class constructor
	 * @param {object} app Hugla app
	 *
	 */
	constructor() {
		super();
	}

	get(a) {
		super.get(a);
		return new Promise(function (resolve, reject) {
			for (let i in user) {
				if (a.name == user[i].name) {
					process.nextTick(function () {
						resolve(user[i]);
					});
				} else {
					process.nextTick(function () {
						resolve(null);
					});
				}
			}
		});
	}

	insert(a) {
		super.insert(a);
		return new Promise(function (resolve, reject) {
			if (a.name.length > 0) {
				this.get(a).then(function (u) {
					if (!u) {
						user.push(a);
						return resolve(true);
					}

					resolve(false);
				}, function (e) {
					reject(e);
				});
			}
		}.bind(this));
	}

	remove(a) {
		super.remove(a);
		return new Promise(function (resolve,reject){
			for (let i in user){
				if(a.name == user[i].name){
					user.splice(i,1);
					process.nextTick(function(){
						resolve(user);
					});
				}else{
					process.nextTick(function(){
						resolve(user);
					});
				}
			}
		});
	}
}

module.exports = userMemoryDBadapter;