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
    insert into present_at values("${driver_id}","414003");
    insert into availability values("${taxi_id}","414003");`;
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

module.exports = router;
