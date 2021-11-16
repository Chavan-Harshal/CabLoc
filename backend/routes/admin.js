const router = require("express").Router();
const connection = require("../connection");

router.post("/adddriver", async (req, res) => {
  const {
    driver_id,
    taxi_id,
    d_name,
    d_phone_no,
    rating,
    number,
    color,
    model,
    cclass,
    capacity,
  } = req.body;
  console.log(req.body);
  const que = `insert into taxi1 values("${taxi_id}","${color}","${number}", NULL,"${model}");
    insert into taxi2 values("${taxi_id}","${model}");
    insert into taxi3 values("${model}", ${capacity}, "${cclass}");
    insert into driver1 values("${driver_id}","${d_name}","${d_phone_no}","${taxi_id}",${rating});
    insert into driver2 values("${driver_id}","${d_phone_no}");
    insert into driver3 values("${d_phone_no}","${d_name}");
    UPDATE taxi1 SET driver_id="${driver_id}" where taxi_id="${taxi_id}";
    insert into works values("${driver_id}","2");
    insert into drives values("${driver_id}","${taxi_id}");
    insert into present_at values("${driver_id}","411002");
    insert into availability values("${taxi_id}","411002");`;
  console.log("hii");
  connection.query(`${que}`, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], (e, op) => {
    if (e) {
      console.log(e);
      res.status(404).json({ msg: "Error" });
    } else {
      return res.status(200).json({ msg: "Inserted" });
    }
  });
});

router.get("/getgarage", (req, res) => {
  connection.query(
    "select * from taxi1 t inner join garage g on t.taxi_id = g.taxi_id;",
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        return res.status(200).json({ garage: op });
      }
    }
  );
});

router.get("/getalldrivers", (req, res) => {
  console.log(req.data);
  connection.query("select * from driver1;", (e, op) => {
    if (e) {
      console.log(e);
      return res.status(404).json({ msg: "Error" });
    } else {
      console.log(op);
      return res.status(200).json({ driver: op });
    }
  });
});

// router.get("/getallusers", (req, res) => {
//   console.log(req.data);
//   let a;
//   connection.query("select * from user1", (e, op) => {
//     if (e) {
//       console.log(e);
//       return res.status(404).json({ msg: "Error" });
//     } else {
//       a = op;
//       for (let i = 0; i < a.length; i++) {
//         connection.query(
//           `select phone_no from user2 where user_id="${
//             a[i].user_id
//           };", select address from user3 where user_id="${a[i.user_id]}";`,
//           [1, 2],
//           (e, usr) => {
//             // console.l
//             console.log(usr);
//             return res.status(200).json({ users: usr });
//           }
//         );
//       }
//     }
//   });
// });
router.get("/getallusers", (req, res) => {
  console.log(req.data);
  connection.query(
    "select name, phone_no, address from user1, user2, user3 where user1.user_id = user2.user_id and user2.user_id = user3.user_id;",
    (e, op) => {
      if (e) {
        console.log(e);
        return res.status(404).json({ msg: "Error" });
      } else {
        console.log(op);
        return res.status(200).json({ users: op });
      }
    }
  );
});
module.exports = router;
