var config_logger = require("./config_logger.js");
var config = require("../config/logger.json");

function Logger(){

}

Logger.init = function(){
	config_logger(Logger, config);
}

Logger.log = function(message, addspaces){
	addspaces = addspaces || false;
	if(addspaces){
		message = " " + message + " ";
	}
	console.log(message);
}

Logger.content = function(content, my_screen_name){
	content = content.replace(/(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig, Logger.URL("$1"));
	content = content.replace(/#(\S*)/g, Logger.HASHTAG("#$1"));
	content = content.replace(/@(\S*)/g, function(match){
		if(match === "@"){
			return match;
		}
		//check if mention screen_name
		if(match === "@" + my_screen_name){
			return Logger.MY_SCREEN_NAME(" " + match + " ");
		}else{
			return Logger.MENTION(match);
		}
	});
	var words = content.split(" ");
	var line = "";
	if(Logger.WORDS_PER_LINE){
		for(var i = 1;i <= words.length;i++){
			line += words[i-1] + " ";
			if(i % Logger.WORDS_PER_LINE === 0 && i !== 0){
				Logger.log(line);
				line = "";
			}else if(i === words.length){
				Logger.log(line);
			}
		}
	}else{
		Logger.log(content);
	}
}

Logger.divider = function(character){
	if(character){
		Logger.log(" " + character + " ");
		return;
	}
	Logger.log(" ");
}

Logger.fail = function(message){
	Logger.log("\n" + Logger.FAIL(" " + message + " ") + "\n");
}

Logger.success = function(message){
	Logger.log("\n" + Logger.SUCCESS(" " + message + " ") + "\n");
}

module.exports = Logger;
