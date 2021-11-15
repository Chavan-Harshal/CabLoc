const router = require("express").Router();
const connection = require("../connection");

// route for user registration
router.post("/register", async (req, res) => {
  //   console.log(req);
  console.log(req.body);
  const { name, pass, add, ph } = req.body;
  //   return res.status(200).json("success");
  const que = `INSERT INTO user1 values("${pass}", "${name}"); INSERT INTO user2 values("${pass}", "${ph}"); INSERT INTO user3 values("${pass}", "${add}"); INSERT INTO user4 values("${ph}", "${name}")`;
  connection.query(`${que}`, [1, 2, 3, 4], (e, op) => {
    if (e) {
      console.log(e);
      return res.status(404).json({ msg: "Error" });
    } else {
      return res.status(200).json({ msg: "Successfully Registered" });
    }
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { name, pass } = req.body;
  console.log(req.body);
  connection.query(
    `SELECT * FROM user1 WHERE name="${name}" and user_id="${pass}";`,
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Some error occured" });
      } else {
        if (op.length === 0) {
          console.log("yes");
          return res.status(404).json({ msg: "Invalid creds" });
        } else {
          return res.status(200).json({ msg: "Success", data: op });
        }
      }
    }
  );
});

router.post("/driverlogin", (req, res) => {
  console.log(req.body);
  const { name, pass } = req.body;
  console.log(req.body);
  connection.query(
    `SELECT * FROM driver1 WHERE d_name="${name}" and driver_id="${pass}";`,
    // `select * from driver1`,
    (e, op) => {
      console.log(op);
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Some error occured" });
      } else {
        if (op.length === 0) {
          console.log("yes");
          return res.status(403).json({ msg: "Invalid creds" });
        } else {
          return res.status(200).json({ msg: "Success", data: op });
        }
      }
    }
  );
});

module.exports = router;
