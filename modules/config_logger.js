var chalk = require("chalk");

var colors = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white",
	"gray"
];

var background_colors = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white"
];

var styles = [
	"bold",
	"dim",
	"italic",
	"underline",
	"inverse",
	"hidden",
	"strikethrough"
];

function config_logger(Logger, config){
	for(var i = 0;i < config.keys.length;i++){
		var key = config.keys[i];
		var list = [];
		for(var property in key.style){
			var style = loadStyle(property, key.style[property]);
			if(style){
				list.push(style);
			}
    }
    Logger[key.id.toUpperCase()] = eval("chalk." + list.join("."));
	}
}

function loadStyle(property, content){
	switch(property){
		case "background-color":
			return return_background_color(content);
		break;
		case "color":
			return return_color(content);
		break;
		case "style":
			return return_style(content);
		break;
	}
}

function return_style(style){
	for(var i = 0;i < styles.length;i++){
		if(styles[i].toLowerCase() === style.toLowerCase()){
			return style;
		}
	}
	return false;
}

function return_color(color){
	for(var i = 0;i < colors.length;i++){
		if(colors[i].toLowerCase() === color.toLowerCase()){
			return color;
		}
	}
	return false;
}

function return_background_color(background_color){
	for(var i = 0;i < background_colors.length;i++){
		if(background_colors[i].toLowerCase() === background_color.toLowerCase()){
			var color = background_colors[i];
			color = "bg" + color.charAt(0).toUpperCase() + color.slice(1, color.length);
			return color;
		}
	}
	return false;
}

module.exports = config_logger;
