var moment = require("moment");

var Logger = require("./Logger.js");
Logger.init();

var config_logger = require("./config_logger.js");
var config = require("../config/logger.json");

function UserLogger(){

}

UserLogger.init = function(){
	config_logger(UserLogger, config);
}

UserLogger.divider = Logger.divider;
UserLogger.content = Logger.content;
UserLogger.log = Logger.log;

Logger.WORDS_PER_LINE = 12;

UserLogger.status = function(following, follow_request_sent){
	var status = "not following";
	var statusUserLogger;
	if(follow_request_sent){
		status = "requested";
		statusUserLogger = UserLogger.REQUESTED;
	}else if(following){
		status = "following";
		statusUserLogger = UserLogger.FOLLOWING;
	}else{
		status = "not following";
		statusUserLogger = UserLogger.NOT_FOLLOWING;
	}
	status = status.toUpperCase();
	UserLogger.log(statusUserLogger(" " + status + " "));
}

UserLogger.screen_name = function(screen_name, verified, my_screen_name){
	var ver = " ";
	if(verified){
		ver =" ✔";
	}
	if(screen_name === my_screen_name){
		UserLogger.log(UserLogger.MY_SCREEN_NAME(" @" + screen_name + " ") + ver);
	}else{
		UserLogger.log(UserLogger.SCREEN_NAME(" @" + screen_name + " ") + ver);
	}
};

UserLogger.last_tweet = function(){
	Logger.log(UserLogger.LAST_TWEET(" Last Tweet: ") + "\n");
}

UserLogger.stats = function(statuses_count, followers_count, friends_count){
	UserLogger.log(UserLogger.STATS(" " + statuses_count + " ") + " tweets, "
		+ UserLogger.STATS(" " + followers_count + " ") + " followers, following " + UserLogger.STATS(" " + friends_count + " "));
}

UserLogger.location = function(location){
	if(location){
		UserLogger.log("from " + location);
	}
}

UserLogger.registered = function(date){
	date = new Date(date);
	Logger.log("registered at " + UserLogger.DATE(moment(date).format('MMMM Do YYYY, HH:mm:ss')));
}

module.exports = UserLogger;
