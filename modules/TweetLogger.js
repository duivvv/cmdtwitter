var chalk = require("chalk");
var moment = require("moment");

var Logger = require("./Logger.js");
Logger.init();

var config_logger = require("./config_logger.js");
var config = require("../config/logger.json");

function TweetLogger(){

}

TweetLogger.init = function(){
	config_logger(TweetLogger, config);
}

TweetLogger.WORDS_PER_LINE = function(WORDS_PER_LINE){
	Logger.WORDS_PER_LINE = WORDS_PER_LINE;
};

TweetLogger.divider = Logger.divider;
TweetLogger.content = Logger.content;
TweetLogger.log = Logger.log;

TweetLogger.date = function(date){
	date = new Date(date);
	Logger.log(TweetLogger.DATE(moment(date).format('MMMM Do YYYY, HH:mm:ss')));
}

TweetLogger.screen_name = function(screen_name, my_screen_name){
	if(screen_name === my_screen_name){
		Logger.log(TweetLogger.MY_SCREEN_NAME(" @" + screen_name + " "));
	}else{
		Logger.log(TweetLogger.SCREEN_NAME(" @" + screen_name + " "));
	}
}

module.exports = TweetLogger;
