const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./connection");
const router = require("./routes/loginreg");
const adminroute = require("./routes/admin");
const customerroute = require("./routes/customer");
const driverroute = require("./routes/driver");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

app.use("/api", router);
app.use("/admin", adminroute);
app.use("/customer", customerroute);
app.use("/driver", driverroute);
