# cmdtwitter

## setup

    npm install --g cmdtwitter

* create a twitter application [https://apps.twitter.com/](https://apps.twitter.com/)
* fill in keys created on tab "Keys and Access Tokens" on your app's page
* add the following environment variables to your .profile/.bash_profile...

```

export TWT_CONSUMER_KEY=<consume_key>
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
