#!/usr/bin/env node

var Twit = require("twit");
var chalk = require("chalk");
var moment = require("moment");

var args = require("command-line-args");

require("dotenv").load();

var cli = args([
    {
    	name: "tweet",
    	type: String,
    	alias: "t",
    	description: "status to tweet"
    },
    {
    	name: "search",
    	alias: "s",
    	type: String,
    	description: "search query"
    },
    {
    	name: "home",
    	alias: "h",
    	type: Boolean,
    	description: "flag to display your timeline"
    },
    {
    	name: "limit",
    	alias: "l",
    	type: Number,
    	value: 15,
    	description: "limit results of query, default: 15"
    },
    {
    	name: "help",
    	type: Boolean,
    	description: "show help"
    }

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
		console.log("")
		console.log(obj)
		console.log("")
	}
}

var client = new Twit({
	consumer_key: process.env.TWT_CONSUMER_KEY,
	consumer_secret: process.env.TWT_CONSUMER_SECRET,
	access_token: process.env.TWT_ACCESS_TOKEN,
	access_token_secret: process.env.TWT_ACCESS_TOKEN_SECRET
});

if(obj.tweet === null || obj.tweet){
	if(obj.tweet){
		tweet(obj.tweet);
	}else{
		fail("please enter a tweet: -t '#devinehowest rocks'");
	}
}else if(obj.search === null || obj.search){
	if(obj.search){
		search(obj.search, obj.limit)
	}else{
		fail("enter a search query: -s '#devinehowest'");
	}
}else if(obj.home){
	home(obj.limit);
}

function fail(message){
	console.log("\n",chalk.bgRed(" " + message + " "),"\n");
}

function success(message){
	console.log("\n",chalk.bgGreen(" " + message + " "),"\n");
}

function colorizeTweet(tweet){
	tweet = tweet.replace(/#(\S*)/g,chalk.green("#$1"));
	tweet = tweet.replace(/@(\S*)/g,chalk.cyan("@$1"));
	tweet = tweet.replace(/(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig, chalk.yellow.underline("$1"));
	return tweet;
}

function tweet(status){
	if(status.length > 140){
		fail("tweet is too long");
		return;
	}
	client.post('statuses/update', {status: status}, function(err, data, response) {
		if(err){
			fail("could not post tweet");
			return;
		}
		if(data){
			success("tweet posted");
			return;
		}
	});
}

function search(query, limit){
	limit = limit || 10;
	client.get('search/tweets', {q: query+"+exclude:retweets+exclude:replies", count: limit}, function(err, data, response) {
		if(err){
			fail("could not get tweets / " + err.message);
			return;
		}
		success("displaying last " + limit + " search results for '" + query + "'");
		displayTweets(data.statuses);
	})
}

function formatDate(date){
	date = new Date(date);
	return chalk.white.underline(moment(date).format('MMMM Do YYYY, HH:mm:ss'));
}

function formatTweet(tweet){
	console.log(chalk.cyan("@" + tweet.user.screen_name))
	console.log(colorizeTweet(tweet.text));
	console.log(formatDate(tweet.created_at),"\n");
}

function displayTweets(data){
	data = data.reverse();
	for(var i = 0;i < data.length; i++){
		formatTweet(data[i]);
	}
}

function home(limit){
	limit = limit || 10;
	client.get('statuses/home_timeline', {count: limit}, function(err, data, response) {
		if(err){
			fail("could not get tweets / " + err.message);
			console.log(err);
			return;
		}
		success("displaying last " + limit + " tweets on your timeline");
		displayTweets(data);
	})
}
