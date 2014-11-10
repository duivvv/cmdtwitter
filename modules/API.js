var Twit = require("Twit");

function API(config){
	this.client = new Twit({
		consumer_key: config.TWT_CONSUMER_KEY,
		consumer_secret: config.TWT_CONSUMER_SECRET,
		access_token: config.TWT_ACCESS_TOKEN,
		access_token_secret: config.TWT_ACCESS_TOKEN_SECRET
	});
}

API.prototype.tweet = function(status, cb){
	if(status.length > 140){
		return cb({
			msg: "tweet is too long"
		});
	}
	this.client.post('statuses/update', {status: status}, function(err, data, response) {
		if(err){
			return cb({msg: "could not post tweet / " + err.message});
		}
		if(data){
			return cb(null, {
				msg: "tweet posted"
			});
		}
	});
}

API.prototype.search = function(query, limit, cb){
	this.limit = limit || 15;
	this.client.get('search/tweets', {q: query+"+exclude:retweets+exclude:replies", count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get tweets / " + err.message
			});
		}
		return cb(null, {
			data: data.statuses,
			msg:"displaying last " + limit + " search results for '" + query + "'"
		});
	});
}

API.prototype.home = function(limit, cb){
	this.limit = limit || 15;
	this.client.get('statuses/home_timeline', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get home timeline / " + err.message
			});
		}
		return cb(null, {
			data: data,
			msg: "displaying last " + limit + " tweets on your timeline"
		});
	});
}

API.prototype.mentions = function(limit, cb){
	this.limit = limit || 15;
	this.client.get('statuses/mentions_timeline', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		return cb(null, {
			data: data,
			msg: "displaying last " + limit + " mentions"
		});
	});
}

API.prototype.direct_messages = function(limit, cb){
	this.limit = limit || 15;
	this.client.get('direct_messages', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		return cb(null, {
			data: data,
			msg: "displaying last " + limit + " direct messages",
			dm: true
		});
	});
}

module.exports = API;
