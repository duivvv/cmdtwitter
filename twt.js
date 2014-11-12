#!/usr/bin/env node

var program = require("commander");

var Tweet = require("./modules/Tweet.js");
var User = require("./modules/User.js");

var Logger = require("./modules/Logger.js");
var TweetLogger = require("./modules/TweetLogger.js");
var UserLogger = require("./modules/UserLogger.js");

var API = require("./modules/API.js");

var params = {};

require("dotenv").load();

var screen_name = process.env.TWT_SCREEN_NAME;

if(screen_name.indexOf("@") === 0){
	screen_name = screen_name.substring(1, screen_name.length);
}

var version = require("./package.json").version;

var api = new API(process.env);

program
	.version(version)
	.usage('- cmdtwitter, a command line twitter client \n\n  $ twt {command} <argument> <options>')
  .option("-l, --limit <limit>", "limit results")
  .option("-w, --words <words>", "words per line");

program
	.command('home')
	.alias('h')
	.description('display your home timeline')
	.action(home_timeline);

program
	.command('tweet <status>')
	.alias('t')
	.description('tweet a new status')
	.action(tweet);

program
	.command('mentions')
	.alias('m')
	.description('display your mentions')
	.action(mentions_timeline);

program
	.command('directmesssages')
	.alias('d')
	.description('display your direct messages')
	.action(direct_messages);

program
	.command('search <search_query>')
	.alias('s')
	.description('search tweets by query')
	.action(search);

program
	.command('user <screen_name>')
	.alias('u')
	.description('display timeline of user')
	.action(user_timeline);

program
	.command('own')
	.alias('o')
	.description('display your timeline')
	.action(own_timeline);

program
	.command('whois <screen_name>')
	.alias('w')
	.description('display information on user')
	.action(whois);

program.parse(process.argv)

function parseOptions(program){
	params.words = parseInt(program.words) || 12;
	return parseInt(program.limit) || 15;
}

function tweet(status){
	api.tweet(status, result);
}

function search(query){
	api.search(query, parseOptions(program), result)
}

function home_timeline(){
	api.home_timeline(parseOptions(program), result);
}

function mentions_timeline(){
	api.mentions_timeline(parseOptions(program), result);
}

function direct_messages(){
	api.direct_messages(parseOptions(program), result);
}

function own_timeline(){
	user_timeline(screen_name);
}

function user_timeline(user){
	api.user_timeline(user, parseOptions(program), result)
}

function whois(user){
	api.whois(user, whoisHandler);
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
			if(params.words){
				TweetLogger.WORDS_PER_LINE(params.words);
			}
			tweet.display(TweetLogger);
		}
	}
}

function whoisHandler(err, result){
	if(err){
		Logger.fail(err.msg);
		return;
	}
	Logger.divider();
	if(result.data){
		var user = new User(result.data, screen_name);
		user.display(UserLogger, TweetLogger)
	}
	Logger.divider();
}
