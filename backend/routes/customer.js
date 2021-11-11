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
    `INSERT INTO trip3 values("${user_id}","${from_s}","${to_d}","${trip_id}");INSERT INTO trip2 values("${trip_id}","${from_s}","${to_d}","00:00:00",0);INSERT INTO last values("${user_id}", "${trip_id}");`,
    [1, 2, 3],
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
        // console.log(op);
        driver_id = op[0].driver_id;
        console.log(driver_id);
        await connection.query(
          `INSERT INTO trip4 values("${trip_id}",1,"0","${taxi_id}","${driver_id}")`,
          (e, op) => {
            if (e) {
              console.log(e);
              return res.status(404).json({ msg: "Error" });
            } else {
              console.log(op);
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
  connection.query(`Select * from location;`, (e, op) => {
    if (e) {
      console.log("eroor in getlocation");
      return res.status(404).json({ msg: "error" });
    } else {
      console.log(op);
      return res.status(200).json({ msg: "Success", data: op });
    }
  });
});

router.post("/gettrips", (req, res) => {
  // console.log(req);
  const { user_id } = req.body;
  connection.query(
    `select t.from_s, t.to_d, fare from trip2 t inner join trip3 k on t.trip_id = k.trip_id where k.user_id ="${user_id}";`,
    (e, op) => {
      if (e) {
        // console.log(e);
        return res.status(404).json({ msg: "Some error occured" });
      } else {
        if (op.length === 0) return res.status(200).json({ data: op });
        const from = op[0].from_s;
        const to = op[0].to_d;
        connection.query(
          `SELECT * FROM trip2 WHERE from_s="${from}" and to_d="${to}"`,
          (e, opt) => {
            console.log(opt);
          }
        );
        return res.status(200).json({ msg: "Sucess", data: op });
      }
    }
  );
});

router.post("/getongoing", (req, res) => {
  const { user_id } = req.body;

  connection.query(
    `SELECT trip_id from ongoing where user_id="${user_id}";`,
    (e, op) => {
      if (e) {
        console.log(e);
      } else {
        return res.status(200).json({ ongoing: op });
      }
    }
  );
});

router.post("/curtrip", (req, res) => {
  const { trip_id } = req.body;
  connection.query(
    `SELECT * FROM trip2 where trip_id="${trip_id}"`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ msg: "Error" });
      } else {
        return res.status(200).json({ ongoing: op });
      }
    }
  );
});

router.post("/getongoing", (req, res) => {
  const { user_id } = req.body;

  connection.query(
    `SELECT trip_id from ongoing where user_id="${user_id}";`,
    (e, op) => {
      if (e) {
        console.log(e);
      } else {
        return res.status(200).json({ ongoing: op });
      }
    }
  );
});

router.post("/checkstatus", (req, res) => {
  const { user_id, trip_id } = req.body;
  console.log(user_id, trip_id);
  connection.query(
    `SELECT * FROM ongoing where user_id="${user_id}"`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ msg: "Error" });
      } else {
        if (op.length !== 0) {
          return res.status(200).json({ msg: "approved" });
        } else {
          connection.query(
            `SELECT * FROM trip4 where trip_id="${trip_id}" and status="0"`,
            (err, opt) => {
              if (err) {
                console.log(err);
              } else if (opt.length !== 0) {
                console.log("in");
                return res.status(200).json({ msg: "wait" });
              } else {
                return res.status(200).json({ msg: "declined" });
              }
            }
          );
        }
      }
    }
  );
});

router.post("/setrating", (req, res) => {
  const { rating, trip_id } = req.body;
  let prevrating = 0;
  connection.query(
    `SELECT rating from trip4 where trip_id="${trip_id}"`,
    (err, op) => {
      if (err) {
        return res.status(404);
      } else {
        prevrating = op[0].rating;
      }
    }
  );
  console.log(prevrating);
  const r = Math.ceil((rating + prevrating) / 2);
  connection.query(
    `UPDATE trip4 set rating="${r}" where trip_id="${trip_id}";DELETE from ongoing where trip_id="${trip_id}"`,
    [1, 2],
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ msg: "Error" });
      }
      return res.status(200).json({ msg: "Updated" });
    }
  );
});

router.post("/getlast", (req, res) => {
  const { user_id } = req.body;
  connection.query(`select * from last where user_id="${user_id}"`, (e, op) => {
    if (e) {
      return res.status(404).json({ msg: "error" });
    } else {
      return res.status(200).json({ msg: "success", data: op });
    }
  });
});

module.exports = router;
