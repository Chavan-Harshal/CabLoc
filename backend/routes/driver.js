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

router.post("/mylocation", (req, res) => {
  const { driver_id } = req.body;
  // console.log("hidshf");
  // console.log(driver_id);
  connection.query(
    `SELECT * from location where zipcode in (select zipcode from present_at where driver_id="${driver_id}");`,
    (e, op) => {
      if (e) {
        console.log(e);
        res.status(404).json({ msg: "Error" });
      } else {
        res.status(200).json({ msg: "Success", data: op });
      }
    }
  );
});

router.post("/gettaxi", (req, res) => {
  const { driver_id } = req.body;
  connection.query(
    `SELECT * FROM taxi1 WHERE driver_id="${driver_id}"`,
    (e, op) => {
      if (e) {
        return res.status(400).json({ msg: "Error occured" });
      } else {
        res.status(200).json({ msg: "Success", data: op });
      }
    }
  );
});

router.post("/getshift", (req, res) => {
  const { driver_id } = req.body;
  connection.query(
    `SELECT * FROM shifts where shift_id in (SELECT shift_id from works where driver_id="${driver_id}")`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        return res.status(200).json({ msg: "Success", shifts: op });
      }
    }
  );
});

router.post("/decline", (req, res) => {
  const { trip_id } = req.body;
  connection.query(
    `DELETE FROM trip3 where trip_id="${trip_id}"; DELETE FROM books where trip_id="${trip_id}"`,
    [1, 2],
    (e, op) => {
      if (e) {
        console.log(e);
      }
      res.status(200).json({ msg: "Done" });
    }
  );
});

router.post("/getuser", (req, res) => {
  const { user_id } = req.body;
  // console.log(user_id);
  connection.query(
    `select phone_no,name from user1 inner join user2 on user1.user_id=user2.user_id and user1.user_id="${user_id}";`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ msg: "Error" });
      } else {
        console.log(op);
        return res.status(200).json({ msg: "Success", data: op });
      }
    }
  );
});

router.post("/getrequests", (req, res) => {
  const { taxi_id } = req.body;
  // console.log(taxi_id);
  connection.query(
    `SELECT * FROM trip4 WHERE taxi_id="${taxi_id}" and status=FALSE;`,
    async (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        if (op.length > 0) {
          let trip_id = "";
          let dataRes = [];
          let k = op.length;
          await op.map(async (val, key) => {
            trip_id = val.trip_id;

            await connection.query(
              `SELECT * FROM trip3 where trip_id="${trip_id}"`,
              (err, opt) => {
                if (err) {
                  console.log(err);
                  return res.status(404).json({ msg: "Lol" });
                } else {
                  // console.log("opt", opt.length);
                  if (opt.length === 0) {
                  } else {
                    let dataObj = {
                      r: opt,
                    };
                    dataRes.push(dataObj);

                    // console.log("hey");
                    // console.log(opt);
                    if (k === key + 1) {
                      return res
                        .status(200)
                        .json({ msg: "Success", data: dataRes });
                    }
                    // console.log(key, k);
                  }
                }
              }
            );
          });
        } else {
          return res.status(200).json({ data: {} });
        }
      }
    }
  );
});

router.post("/approve", async (req, res) => {
  const { trip_id, start, end, duration, fare, user_id } = req.body;
  let from_s = "";
  let to_d = "";
  await connection.query(
    `INSERT INTO ongoing values("${user_id}","${trip_id}")`,
    (e, o) => {
      if (e) {
        console.log(e);
      }
    }
  );
  await connection.query(
    `SELECT from_s, to_d from trip3 WHERE trip_id="${trip_id}"`,
    async (e, op) => {
      if (e) {
        console.log(e);
        return res.status(400).json({ msg: "err" });
      } else {
        from_s = op[0].from_s;
        to_d = op[0].to_d;
        await connection.query(
          `UPDATE trip2 SET duration="${duration}",fare=${fare} WHERE from_s="${from_s}" and to_d="${to_d}" and trip_id="${trip_id}";UPDATE trip4 SET status=1 WHERE trip_id="${trip_id}"`,
          [1, 2],
          (e, op) => {
            if (e) {
              console.log(e);
              return res.status(400).json({ msg: "err" });
            } else {
              connection.query(
                `INSERT INTO trip1 values("${trip_id}","${start}","${end}","${duration}");`,
                (e, o) => {
                  if (e) {
                    console.log(e);
                    return res.status(400).json({ msg: "err" });
                  } else {
                    return res.status(200).json({ msg: "Accepted" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// Updates the drivers location
router.post("/update", async (req, res) => {
  const { driver_id, zipcode } = req.body;
  console.log("body");
  console.log(req.body);

  connection.query(
    `UPDATE present_at set zipcode="${zipcode}" where driver_id="${driver_id}";UPDATE availability set zipcode="${zipcode}" WHERE taxi_id in (SELECT taxi_id from driver1 where driver_id ="${driver_id}")`,
    [1, 2],
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      }
      return res.status(200).json({ msg: "Success" });
    }
  );
});

module.exports = router;
