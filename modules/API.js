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
	limit = limit || 15;
	this.client.get('search/tweets', {q: query+"+exclude:retweets+exclude:replies", count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get tweets / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest search results for '" + query + "'";
		if(limit === 1){
			msg = "displaying last search results for '" + query + "'";
		}
		return cb(null, {
			data: data.statuses,
			msg: msg
		});
	});
}

API.prototype.home_timeline = function(limit, cb){
	limit = limit || 15;
	this.client.get('statuses/home_timeline', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get home timeline / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest tweets on your timeline";
		if(limit === 1){
			msg = "displaying last tweet on your timeline";
		}
		return cb(null, {
			data: data,
			msg: msg
		});
	});
}

API.prototype.mentions_timeline = function(limit, cb){
	limit = limit || 15;
	this.client.get('statuses/mentions_timeline', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest mentions";
		if(limit === 1){
			msg = "displaying last mention";
		}
		return cb(null, {
			data: data,
			msg: msg
		});
	});
}

API.prototype.direct_messages = function(limit, cb){
	limit = limit || 15;
	this.client.get('direct_messages', {count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		var msg ="displaying " + limit + " latest direct messages";
		if(limit === 1){
			msg = "displaying last direct message";
		}
		return cb(null, {
			data: data,
			msg: msg,
			dm: true
		});
	});
}

API.prototype.user_timeline = function(screen_name, limit, cb){
	limit = limit || 15;
	if(screen_name.indexOf("@") === 0){
		screen_name = screen_name.substring(1,screen_name.length)
	}
	this.client.get('statuses/user_timeline', {screen_name: screen_name, count: limit}, function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get tweets of user " + screen_name + " / " + err.message
			});
		}
		var msg = "displaying last " + limit + " tweets by @" + screen_name;
		if(limit === 1){
			msg = "displaying last tweet by @" + screen_name;
		}
		return cb(null, {
			data: data,
			msg: msg
		});
	});
}

module.exports = API;
