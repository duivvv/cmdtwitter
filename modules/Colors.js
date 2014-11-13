var chalk = require("chalk");

var colors_default = [
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

var background_colors_default = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white"
];

var styles_default = [
	"bold",
	"dim",
	"italic",
	"underline",
	"inverse",
	"hidden",
	"strikethrough"
];

function Colors(config){
	_config_logger.call(this, config);
}

function _config_logger(config){
	for(var i = 0;i < config.keys.length;i++){
		var key = config.keys[i];
		var list = [];
		for(var property in key.style){
			var style = _loadStyle(property, key.style[property]);
			if(style){
				list.push(style);
			}
    }
    this[key.id.toUpperCase()] = eval("chalk." + list.join("."));
	}
}

function _loadStyle(property, content){
	switch(property){
		case "background-color":
			return _return_background_color(content);
		break;
		case "color":
			return _return_color(content);
		break;
		case "style":
			return _return_style(content);
		break;
	}
}

function _return_style(style){
	for(var i = 0;i < styles_default.length;i++){
		if(styles_default[i].toLowerCase() === style.toLowerCase()){
			return style;
		}
	}
	return false;
}

function _return_color(color){
	for(var i = 0;i < colors_default.length;i++){
		if(colors_default[i].toLowerCase() === color.toLowerCase()){
			return color;
		}
	}
	return false;
}

function _return_background_color(background_color){
	for(var i = 0;i < background_colors_default.length;i++){
		if(background_colors_default[i].toLowerCase() === background_color.toLowerCase()){
			var color = background_colors_default[i];
			color = "bg" + color.charAt(0).toUpperCase() + color.slice(1, color.length);
			return color;
		}
	}
	return false;
}

module.exports = Colors;
