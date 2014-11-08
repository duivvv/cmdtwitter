# cmdtwitter

## setup

    npm install --g cmdtwitter

* create a twitter application [https://apps.twitter.com/](https://apps.twitter.com/)
* create consumer and access keys on tab "Keys and Access Tokens" for your app
* add the following environment variables to your .profile/.bash_profile...

```

export TWT_CONSUMER_KEY=<consumer_key>
export TWT_CONSUMER_SECRET=<consumer_secret>
export TWT_ACCESS_TOKEN=<access_token>
export TWT_ACCESS_TOKEN_SECRET=<access_token_secret>

```

* you will have to probably restart your terminal

# usage

twt "your tweet"

## 0.0.1

proof of concept

## todo

* add authentication / skip environment variables step
* make this a full client
