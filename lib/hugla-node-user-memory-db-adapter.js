"use strict";
const db = require('userDBadapter');
const Promise = require('bluebird');

const users = [{name: "Jack"}, {name: "Ammi"}, {name: "Klara"}];

/**
 * hugla node user memory db adapter
 */
class HuglaUserMemoryDBAdapter extends db {

	/**
	 * Class constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Get existing user
	 *
	 * @param a
	 */
	get(a) {
		super.get(a);
		return new Promise(function (resolve, reject) {
			for (let i in users) {
				if (a.name == users[i].name) {
					process.nextTick(function () {
						resolve(users[i]);
					});
				} else {
					process.nextTick(function () {
						resolve(null);
					});
				}
			}
		});
	}

	/**
	 * Insert new user
	 *
	 * @param a
	 */
	insert(a) {
		super.insert(a);
		return new Promise(function (resolve, reject) {
			if (a.name.length > 0) {
				this.get(a).then(function (u) {
					if (!u) {
						users.push(a);
						return resolve(true);
					}

					resolve(false);
				}, function (e) {
					reject(e);
				});
			}
		}.bind(this));
	}

	/**
	 * Remove a user
	 *
	 * @param a
	 */
	remove(a) {
		super.remove(a);
		return new Promise(function (resolve, reject) {
			for (let i in users) {
				if (a.name == users[i].name) {
					users.splice(i, 1);
					process.nextTick(function () {
						resolve(users);
					});
				} else {
					process.nextTick(function () {
						resolve(users);
					});
				}
			}
		});
	}

	/**
	 *
	 * @param filter
	 * @param user
	 */
	update(filter,user){
		return new Promise(function(resolve,reject){
			this.get(filter).then(function(u){
				for(let i in user){
					u[i]=user[i];
				}
				resolve();
			}, function(){
				reject();
			})
		}.bind(this))
	}
}

module.exports = HuglaUserMemoryDBAdapter;