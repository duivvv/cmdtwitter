#!/usr/bin/env node

var args = require("command-line-args");

var API = require("./modules/API.js");
var Tweet = require("./modules/Tweet.js");
var Logger = require("./modules/Logger.js");

require("dotenv").load();

var screen_name = process.env.TWT_SCREEN_NAME;

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
    	name: "mentions",
    	alias: "m",
    	type: Boolean,
    	description: "flag to display mentions"
    },
    {
    	name: "directmessages",
    	alias: "d",
    	type: Boolean,
    	description: "flag to display direct messages"
    },
    {
    	name: "home",
    	alias: "h",
    	type: Boolean,
    	defaultOption: true,
    	value: true,
    	description: "flag to display your timeline, default action"
    },
    {
    	name: "limit",
    	alias: "l",
    	type: Number,
    	value: 15,
    	description: "limit results of query, default 15"
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

var api = new API(process.env);

if(obj.tweet === null || obj.tweet){
	if(obj.tweet){
		api.tweet(obj.tweet, resultHandler);
	}else{
		Logger.fail("please enter a tweet: -t \"#devinehowest rocks\"");
	}
}else if(obj.search === null || obj.search){
	if(obj.search){
		api.search(obj.search, obj.limit, resultHandler)
	}else{
		Logger.fail("enter a search query: -s \"#devinehowest\"");
	}
}else if(obj.mentions){
	api.mentions(obj.limit, resultHandler);
}else if(obj.directmessages){
	api.direct_messages(obj.limit, resultHandler);
}else if(obj.help){
	Logger.log(usage);
}else if(obj.home){
	api.home(obj.limit, resultHandler);
}else{
	Logger.fail("enter a valid command, see twt --help");
}

function resultHandler(err, result){
	if(err){
		Logger.fail(err.msg);
		return;
	}
	Logger.success(result.msg);
	if(result.data){
		var dm = result.dm || false;
		var data = result.data.reverse();
		for(var i = 0;i < data.length; i++){
			var tweet = new Tweet(data[i], screen_name, dm);
			tweet.display(Logger);
		}
	}
}
