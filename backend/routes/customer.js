const router = require("express").Router();
const connection = require("../connection");

router.get("/getlocation", async (req, res) => {
  connection.query(`Select * from location;`, (e, op) => {
    if (e) {
      console.log(e);
      return res.status(404).json({ msg: "Some error occured" });
    } else {
      return res.status(200).json({ msg: "Success", data: op });
    }
  });
});

router.get("/getnearby", async (req, res) => {
  const start = req.body;
  connection.query(
    `select * from driver1 d inner join taxi1 t on d.taxi_id = t.taxi_id where t.taxi_id in (SELECT taxi_id from availability where zipcode="${start}");`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        console.log(op);
        return res.status(200).json({ msg: "Success", data: op });
      }
    }
  );
});

module.exports = router;
