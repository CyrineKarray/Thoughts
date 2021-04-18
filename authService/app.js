const winston = require("winston"); //Message logger
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || 3002; //set port = 5000 on cmd
app.listen(port, () => winston.info(`Listening on port ${port}...`));
