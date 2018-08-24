require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twitterWebhooks = require("twitter-webhooks");

const app = express();
app.use(bodyParser.json());

const {
  SERVER_URL,
  ENVIRONMENT,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} = Object.assign({}, process.env, process.env.VCAP_SERVICES);

console.log(
  {
    server: SERVER_URL,
    env: ENVIRONMENT,
    consumer: CONSUMER_KEY,
    secret: CONSUMER_SECRET,
    token: ACCESS_TOKEN,
    secret2: ACCESS_TOKEN_SECRET
  },
  process.env.VCAP_SERVICES
);

/**
 * To check if it works
 */
app.get("/", (req, res) => {
  res.send("Hello world");
});

const userActivityWebhook = twitterWebhooks.userActivity({
  serverUrl: SERVER_URL,
  route: "/webhook",
  environment: ENVIRONMENT,

  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  app
});

/**
 * DEBUG
 */
// userActivityWebhook
//   .getWebhooks()
//   .then(({ environments }) => console.log(environments[0]))
//   .catch(({ statusCode, body }) =>
//     console.log(`.register() error ${statusCode}`, body)
//   );

/**
 * FIRST TIME, LATER IT WILL GIVE ERROR (one webhook per free account allowed only)
 */
// userActivityWebhook
//   .register()
//   .catch(({ statusCode, body }) =>
//     console.log(`.register() error ${statusCode}`, body)
//   );

const user = {
  userId: "FMGordillo", // Use your own!
  accessToken: ACCESS_TOKEN,
  accessTokenSecret: ACCESS_TOKEN_SECRET
};

//listen to any user activity
userActivityWebhook.on("event", (event, userId, data) => {
  switch (event) {
    // https://github.com/super-ienien/twitter-webhooks#event-favorite
    case "favorite":
      console.log(`[USER-EVENT]: favorite!`);
      break;
    // https://github.com/super-ienien/twitter-webhooks#event-follow
    case "follow":
      console.log(`[USER-EVENT]: follows!`);
      break;
    case "direct_message":
      console.log(`[USER-EVENT]: direct message!`);
      // TODO
      break;

    // NO DEFINIMOS, pero por alguna razón pasan...
    case "users":
      console.log(`[USER-EVENT]: users?`);
      break;
    case "apps":
      console.log(`[USER-EVENT]: apps?`);
      break;

    // Catch
    default:
      console.log(`[USER-EVENT] anything else: ${event}`);
      break;
  }
  return console.log("data", data);
});

//listen to unknown payload (in case of api new features)
userActivityWebhook.on("unknown-event", rawData => console.log(rawData));

app.listen(process.env.PORT || 8000);
