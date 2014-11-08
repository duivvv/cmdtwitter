# cmdtwitter

## install

With [npm](http://npmjs.org) do:

```
npm install -g cmdtwitter
```

## setup

* create a twitter application [https://apps.twitter.com/](https://apps.twitter.com/)
* create consumer and access keys on tab "Keys and Access Tokens" for your app
* add the following environment variables to your .profile/.bash_profile...

```bash

export TWT_CONSUMER_KEY=<consumer_key>
export TWT_CONSUMER_SECRET=<consumer_secret>
export TWT_ACCESS_TOKEN=<access_token>
export TWT_ACCESS_TOKEN_SECRET=<access_token_secret>

```

* you will have to probably restart your terminal

## usage

```
cmdtwitter, a command line twitter client

Usage

-t, --tweet <string>   the tweet you want send
-s, --search <string>  search query
-h, --help             Print usage instructions

``

### examples

```
$ twt -t "my tweet"
```

```
$ twt -s "#devinehowest"
```

## todo

* add authentication / skip environment variables step
* add functionality
