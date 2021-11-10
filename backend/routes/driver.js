const router = require("express").Router();
const connection = require("../connection");

router.post("/getme", (req, res) => {
  const data = req.body.driver_id;
  console.log(req.body);
  console.log("sdfkj");
  console.log(data);
  console.log("lsdkhfl");
  console.log(req.body);
  connection.query(
    `select * from driver1 where driver_id="${data}";`,
    (e, op) => {
      if (e) {
        return res.status(404).json({ msg: "Error" });
      } else {
        return res.status(200).json({ msg: "success", data: op });
      }
    }
  );
});

module.exports = router;
