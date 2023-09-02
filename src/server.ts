import app from "./app";

import env from "./config";

const uri: string | undefined =
  process.env.NODE_ENV !== "production"
    ? "mongodb://127.0.0.1:27017/digital_cow_hut_with_auth"
    : env.db_uri;

async function dbConnection() {
  try {
    if (!env.db_uri) {
      app.listen(env.port, () => {
        console.log("server listening on port " + env.port);
      });
    } else {
      console.log("db uri is not defined");
    }
  } catch (err) {
    console.log(`Failed to connect database ${err}`);
  }
}

dbConnection();
