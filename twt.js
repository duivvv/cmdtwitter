#!/usr/bin/env node

var args = require("command-line-args");

var API = require("./modules/API.js");
var Tweet = require("./modules/Tweet.js");
var Logger = require("./modules/Logger.js");

var cli_args = require("./data/args.js");

require("dotenv").load();

var screen_name = process.env.TWT_SCREEN_NAME;

if(screen_name.indexOf("@") === 0){
	screen_name = screen_name.substring(1, screen_name.length);
}

var cli = args(cli_args);

try{
	var obj = cli.parse();
}catch(err){
	Logger.fail("enter a valid command, see twt --help");
	return;
}

var usage = cli.getUsage({
    header: "cmdtwitter, a command line twitter client \n\n  $ twt {arguments} <content>",
    footer: ""
});

var api = new API(process.env);

if(obj.tweet === null || obj.tweet){
	if(obj.tweet){
		api.tweet(obj.tweet, result);
	}else{
		Logger.fail("please enter a tweet: -t \"#devinehowest rocks\"");
	}
}else if(obj.search === null || obj.search){
	if(obj.search){
		api.search(obj.search, obj.limit, result)
	}else{
		Logger.fail("enter a search query: -s \"#devinehowest\"");
	}
}else if(obj.mentions){
	api.mentions_timeline(obj.limit, result);
}else if(obj.directmessages){
	api.direct_messages(obj.limit, result);
}else if(obj.help){
	Logger.log(usage);
}else if(obj.user === null || obj.user){
	if(obj.user){
		api.user_timeline(obj.user, obj.limit, result)
	}else{
		Logger.fail("enter a user: -u \"@duivvv\"");
	}
}else if(obj.own){
	api.user_timeline(screen_name, obj.limit, result)
}else if(obj.home){
	api.home_timeline(obj.limit, result);
}

function result(err, result){
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
			if(obj.words){
				Logger.WORDS_PER_LINE = obj.words;
			}
			tweet.display(Logger);
		}
	}
}
