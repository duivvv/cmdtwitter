# cmdtwitter

## install

With [npm](http://npmjs.org) do:

```
npm install -g cmdtwitter
```

## setup

* create a twitter application [https://apps.twitter.com/](https://apps.twitter.com/)
* make sure to set your apps permissions to "Read, write, and direct messages"
* create consumer and access keys on the "Keys and Access Tokens" tab
* add the keys as environment variables in your .profile/.bash_profile...

```bash

export TWT_CONSUMER_KEY=<consumer_key>
export TWT_CONSUMER_SECRET=<consumer_secret>
export TWT_ACCESS_TOKEN=<access_token>
export TWT_ACCESS_TOKEN_SECRET=<access_token_secret>

export TWT_SCREEN_NAME=<screen_name>
# without @, for colouring
# example: export TWT_SCREEN_NAME=duivvv

```

* restart your terminal
* done.

*please be aware that most API calls are rate limited*

## usage

```bash

cmdtwitter, a command line twitter client

$ twt {arguments} <content>

Usage

-t, --tweet <string>   status to tweet
-s, --search <string>  search query
-m, --mentions         flag to display mentions
-d, --directmessages   flag to display direct messages
-h, --home             flag to display your timeline, default action
-l, --limit <number>   limit results of query, default 15
-w, --words <number>   words per line, default 12
--help                 show help

```

### examples

tweet a new status

```bash
$ twt -t "my tweet"
```

show my timeline

```bash
$ twt
```

show my mentions

```bash
$ twt -m
```

get all tweets with hashtag #devinehowest (first example shows 50, default is 15)

```bash
$ twt -s "#devinehowest" -l 50
$ twt -s "#devinehowest"
```

show my direct messages

```bash
$ twt -d
```

Tweets are displayed in reverse order (newest ones last).

## todo

* make environment variables step interactive (--set KEY_NAME --key ...)
* add functionality
* async url expanding (http://t.co to original URL)
