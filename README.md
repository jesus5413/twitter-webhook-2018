# Twitter Webhook Boilerplate

## Why?

I've tried to use **[`this example`](https://github.com/super-ienien/twitter-webhooks#usage)** for my project, but sadly the Terms and Conditions of Twitter has changed recently (inclusively the way that APIs communicate with Twitter itself). I've found out this "workaround" (not much) to achieve the same.

## Usage

1. Rename `.env.example` to `.env` and fill the values (duh).
2. `npm i`
3. Push your app (Heroku, now... IBM Cloud 😏)

### ❗️IMPORTANT❗️

**TL;TR**: `VCAP_VARIABLES` > `.env`

I've done this app using `VCAP_VARIABLES` and I'm aware that not every provided has these, so be careful if you set your App variables instead of `.env`, because this code gives more importance to `VCAP_VARIABLES`.

## License

See **[`LICENSE`](https://github.com/FMGordillo/twitter-webhook-2018/blob/master/LICENSE)**

## Acknowledgment

Thanks to **[`Mariano Aragunde`](https://twitter.com/aragunde)** for this idea! 👨🏻‍💻
