#!/usr/bin/env node

var Twit = require("twit");

var args = require("command-line-args");

var cli = args([
    {
    	name: "status",
    	type: String,
    	defaultOption: true,
    	description: "the tweet"
    }
]);

var obj = cli.parse();

var client = new Twit({
	consumer_key: process.env.TWT_CONSUMER_KEY,
	consumer_secret: process.env.TWT_CONSUMER_SECRET,
	access_token: process.env.TWT_ACCESS_TOKEN,
	access_token_secret: process.env.TWT_ACCESS_TOKEN_SECRET
});

if(obj.status.length === 0){
	return;
}

if(obj.status.length > 140){
	console.log("----")
	console.log("FAILED: tweet is too long");
	return;
}else{
	client.post('statuses/update', obj, function(err, data, response) {
		if(err){
			console.log("----")
			console.log("FAILED");
			return;
		}
		if(data){
			console.log("----")
			console.log("POSTED");
			return;
		}
	})
}

