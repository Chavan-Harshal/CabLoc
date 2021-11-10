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

router.post("/getnearby", async (req, res) => {
  const start = req.body.start;
  connection.query(
    `select * from driver1 d inner join taxi1 t on d.taxi_id = t.taxi_id where t.taxi_id in (SELECT taxi_id from availability where zipcode="${start}");`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        console.log(op);
        return res.status(200).json({ msg: "Success", taxi: op });
      }
    }
  );
});

router.post("/booktrip", async (req, res) => {
  const { user_id, taxi_id, from_s, to_d, trip_id } = req.body;
  let driver_id = "";
  console.log(req.body);
  await connection.query(
    `INSERT INTO trip3 values("${user_id}","${from_s}","${to_d}","${trip_id}");INSERT INTO trip2 values("${trip_id}","${from_s}","${to_d}","00:00:00",0);`,
    [1, 2],
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      }
    }
  );
  await connection.query(
    `SELECT driver_id from taxi1 where taxi_id="${taxi_id}"`,
    async (e, op) => {
      if (e) {
        return res.status(400).json({ msg: "Error" });
      } else {
        console.log(op);
        driver_id = op[0].driver_id;
        console.log(driver_id);
        await connection.query(
          `INSERT INTO trip4 values("${trip_id}",1,FALSE,"${taxi_id}","${driver_id}")`,
          (e, op) => {
            if (e) {
              console.log(e);
              return res.status(404).json({ msg: "Error" });
            } else {
              return res.status(200).json({ msg: "Request made" });
            }
          }
        );
      }
    }
  );
  await connection.query(
    `INSERT INTO books values("${user_id}","${trip_id}")`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      }
    }
  );
});

router.get("/getlocnames", (req, res) => {
  connection.query(`Select * from location`, (e, op) => {
    if (e) {
      return res.status(404).json({ msg: "error" });
    } else {
      return res.status(200).json({ msg: "Success", data: op });
    }
  });
});

// TODO
// router.post("/gettrips", (req, res) => {

// })

module.exports = router;
