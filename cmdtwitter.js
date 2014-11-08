#!/usr/bin/env node

var Twit = require("twit");
var chalk = require("chalk");

var args = require("command-line-args");

require("dotenv").load();

var cli = args([
    {
    	name: "tweet",
    	type: String,
    	alias: "t",
    	description: "send a tweet"
    },
    {
    	name: "search",
    	alias: "s",
    	type: String,
    	description: "search for a specific query"
    },
    {
    	name: "help",
    	alias: "h",
    	type: Boolean,
    	description: "show help"
    },

]);

var obj = cli.parse();

var usage = cli.getUsage({
    header: "cmdtwitter, a command line twitter client \n\n  $ twt {arguments} <content>",
    footer: ""
});

if(obj.help){
	console.log(usage);
}else{
	if(process.env.LOCAL){
		console.log(obj)
	}
}

var client = new Twit({
	consumer_key: process.env.TWT_CONSUMER_KEY,
	consumer_secret: process.env.TWT_CONSUMER_SECRET,
	access_token: process.env.TWT_ACCESS_TOKEN,
	access_token_secret: process.env.TWT_ACCESS_TOKEN_SECRET
});

if(!process.env.LOCAL){

	if(obj.tweet){
		tweet(obj.tweet);
	}

}

if(obj.search){
	search(obj.search)
}

function tweet(status){
	if(status.length === 0){
		console.log(chalk.bgRed(" FAILED:please enter a tweet "));
		return;
	}
	if(status.length > 140){
		console.log(chalk.bgRed(" FAILED: tweet is too long "));
		return;
	}
	client.post('statuses/update', {status: status}, function(err, data, response) {
		if(err){
			console.log(chalk.bgRed(" FAILED: could not post tweet "));
			return;
		}
		if(data){
			console.log(chalk.bgGreen(" POSTED "));
			return;
		}
	});
}

function search(query){
	client.get('search/tweets', {q: query+"+exclude:retweets+exclude:replies", count: 10}, function(err, data, response) {
	 for(var i = 0;i < data.statuses.length; i++){
	 	var status = data.statuses[i];
	 	console.log(chalk.cyan("@" + status.user.screen_name) + ": " + chalk.white(status.text));
	 }
	})
}
