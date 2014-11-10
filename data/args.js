var args = [
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
    	name: "user",
    	alias: "u",
    	type: String,
    	description: "user to display timeline, @ is not needed"
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
    	name: "words",
    	alias: "w",
    	type: Number,
    	value: 12,
    	description: "words per line, default 12"
    },
    {
    	name: "help",
    	type: Boolean,
    	description: "show help"
    }
];

module.exports = args;
