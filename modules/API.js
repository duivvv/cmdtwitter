var Twit = require("Twit");
var expand = require("expand-url");

function API(config, expand){
	this.expand = expand || false;
	this.client = new Twit({
		consumer_key: config.TWT_CONSUMER_KEY,
		consumer_secret: config.TWT_CONSUMER_SECRET,
		access_token: config.TWT_ACCESS_TOKEN,
		access_token_secret: config.TWT_ACCESS_TOKEN_SECRET
	});
}

API.need_to_expand = 0;
API.expanded = 0;

function _expandURL(id, url, cb){
	expand.expand(url, function(err, original){
		if(err){
			return cb(err)
		}
	  return cb(null, id, original);
	});
}

function _processURL(data, cb){
	if(this.expand){
		for(var i = 0; i < data.length; i++){
			var regex = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
			var match = regex.exec(data[i].text);
			if(match){
				API.need_to_expand ++;
				_expandURL(i, match[0], function(err, id, original){
					API.expanded ++;
					if(!err){
						data[id].text = data[id].text.replace(/(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig, original);
					}
					if(API.expanded === API.need_to_expand){
						return cb(data);
					}
				});
			}
		}
	}else{
		return cb(data);
	}
}

API.prototype.tweet = function(status, cb){
	if(status.length > 140){
		return cb({
			msg: "tweet is too long"
		});
	}
	this.client.post('statuses/update', {
		status: status
	}, function(err, data, response) {
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
	this.client.get('search/tweets', {
		q: query + "+exclude:retweets+exclude:replies",
		count: limit
	},(function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get tweets / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest search results for '" + query + "'";
		if(limit === 1){
			msg = "displaying last search results for '" + query + "'";
		}
		_processURL.call(this, data, function(data){
			return cb(null, {
				data: data.statuses,
				msg: msg
			});
		});
	}).bind(this));
}

API.prototype.home_timeline = function(limit, cb){
	limit = limit || 15;
	this.client.get('statuses/home_timeline', {
		count: limit
	}, (function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get home timeline / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest tweets on your timeline";
		if(limit === 1){
			msg = "displaying last tweet on your timeline";
		}
		_processURL.call(this, data, function(data){
			return cb(null, {
					data: data,
					msg: msg
			});
		});
	}).bind(this));
}

API.prototype.mentions_timeline = function(limit, cb){
	limit = limit || 15;
	this.client.get('statuses/mentions_timeline', {
		count: limit
	}, (function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		var msg = "displaying " + limit + " latest mentions";
		if(limit === 1){
			msg = "displaying last mention";
		}
		_processURL.call(this, data, function(data){
			return cb(null, {
				data: data,
				msg: msg
			});
		});
	}).bind(this));
}

API.prototype.direct_messages = function(limit, cb){
	limit = limit || 15;
	this.client.get('direct_messages', {
		count: limit
	}, (function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get mentions / " + err.message
			});
		}
		var msg ="displaying " + limit + " latest direct messages";
		if(limit === 1){
			msg = "displaying last direct message";
		}
		_processURL.call(this, data, function(data){
			return cb(null, {
				data: data,
				msg: msg,
				dm: true
			});
		});
	}).bind(this));
}

API.prototype.user_timeline = function(screen_name, limit, cb){
	limit = limit || 15;
	if(screen_name.indexOf("@") === 0){
		screen_name = screen_name.substring(1, screen_name.length)
	}
	this.client.get('statuses/user_timeline', {
		screen_name: screen_name,
		count: limit
	}, (function(err, data, response) {
		if(err){
			return cb({
				msg: "could not get tweets of user " + screen_name + " / " + err.message
			});
		}
		var msg = "displaying last " + limit + " tweets by @" + screen_name;
		if(limit === 1){
			msg = "displaying last tweet by @" + screen_name;
		}
		_processURL.call(this, data, function(data){
			return cb(null, {
				data: data,
				msg: msg
			});
		});
	}).bind(this));
}

module.exports = API;
