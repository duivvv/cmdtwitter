var chalk = require("chalk");
var moment = require("moment");

function Logger(){

}

Logger.MY_SCREEN_NAME = chalk.bgRed;
Logger.HASHTAG = chalk.green;
Logger.MENTION = chalk.cyan;
Logger.SCREEN_NAME = chalk.bgBlue.white.cyan;
Logger.URL = chalk.yellow.underline;
Logger.DATE = chalk.white.underline;

Logger.FAIL = chalk.bgRed;
Logger.SUCCESS = chalk.bgGreen;

Logger.log = function(message){
	console.log(message);
}

Logger.date = function(date){
	date = new Date(date);
	Logger.log(Logger.DATE(moment(date).format('MMMM Do YYYY, HH:mm:ss')));
}

Logger.content = function(content, my_screen_name){
	content = content.replace(/#(\S*)/g, Logger.HASHTAG("#$1"));
	content = content.replace(/@(\S*)/g, function(match){
		if(match === "@"){
			return match;
		}
		//check if mention screen_name
		if(match === "@" + my_screen_name){
			return Logger.MY_SCREEN_NAME(match);
		}else{
			return Logger.MENTION(match);
		}
	});
	content = content.replace(/(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig, Logger.URL("$1"));
	Logger.log(content);
}

Logger.screen_name = function(screen_name, my_screen_name){
	if(screen_name === my_screen_name){
		Logger.log(Logger.MY_SCREEN_NAME(" @" + screen_name + " "))
	}else{
		Logger.log(Logger.SCREEN_NAME(" @" + screen_name + " "))
	}
}

Logger.fail = function(message){
	Logger.log("\n" + Logger.FAIL(" " + message + " ") + "\n");
}

Logger.success = function(message){
	Logger.log("\n" + Logger.SUCCESS(" " + message + " ") + "\n");
}


module.exports = Logger;
