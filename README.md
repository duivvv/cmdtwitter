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

Usage: twt cmdtwitter, a command line twitter client

$ twt {command} <argument> <options>

Commands:

  home|h                   display your timeline
  mentions|m               display your mentions
  directmesssages|d        display your direct messages
  search|s <search_query>  search tweets by query
  user|u <screen_name>     display timeline of user
  own|o                    display your timeline
  tweet|t <status>         tweet a new status

Options:

  -h, --help                    output usage information
  -V, --version                 output the version number
  -l, --limit <limit>           limit results
  -w, --words <words>  words per line

```

### examples

tweet a new status

```bash
$ twt t "my tweet"
```

show my home timeline

```bash
$ twt h
```

show my latest tweets

```bash
$ twt o
```

show my mentions

```bash
$ twt m
```

get tweets by user *@devine_howest*

```bash
$ twt u "devine_howest"
```

get all tweets with hashtag *#devinehowest* (first example shows 50, default is 15)

```bash
$ twt s "#devinehowest" -l 50
$ twt s "#devinehowest"
```

show my direct messages

```bash
$ twt d
```

Tweets are displayed in reverse order (newest ones last).

## todo

* make environment variables step interactive (--set KEY_NAME --key ...)
* marking search results
* fix url expanding
