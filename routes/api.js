const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

router.get("/", function (req, res) {
  connection.query(
    `SELECT area_name,sum(compliance) AS penjualan, ROUND((sum(compliance)/COUNT(compliance))*100,2) AS Presentase
     FROM report_product a LEFT JOIN store b
     ON a.store_id=b.store_id LEFT JOIN store_account c
     ON b.account_id=c.account_id LEFT JOIN product d
     ON a.product_id=d.product_id LEFT JOIN product_brand e
     ON d.brand_id=e.brand_id LEFT JOIN store_area f
     ON b.area_id=f.area_id GROUP BY f.area_id`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data",
          data: rows,
        });
      }
    }
  );
});

router.post("/", function (req, res) {
  function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  let id = req.body.area;
  let st = req.body.start;
  let fn = req.body.finish;

  if (isEmpty(st)) {
    connection.query(
      `SELECT area_name,sum(compliance) AS penjualan, ROUND((sum(compliance)/COUNT(compliance))*100,2) AS Presentase
       FROM report_product a LEFT JOIN store b
       ON a.store_id=b.store_id LEFT JOIN store_account c
       ON b.account_id=c.account_id LEFT JOIN product d
       ON a.product_id=d.product_id LEFT JOIN product_brand e
       ON d.brand_id=e.brand_id LEFT JOIN store_area f
       ON b.area_id=f.area_id WHERE f.area_id = ${id} GROUP BY f.area_id`,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        }

        if (rows.length <= 0) {
          return res.status(404).json({
            status: false,
            message: "Data Not Found!",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "List Data",
            data: rows,
          });
        }
      }
    );
  } else {
    connection.query(
      `SELECT area_name,sum(compliance) AS penjualan, ROUND((sum(compliance)/COUNT(compliance))*100,2) AS Presentase
       FROM report_product a LEFT JOIN store b
      ON a.store_id=b.store_id LEFT JOIN store_account c
      ON b.account_id=c.account_id LEFT JOIN product d
      ON a.product_id=d.product_id LEFT JOIN product_brand e
      ON d.brand_id=e.brand_id LEFT JOIN store_area f
      ON b.area_id=f.area_id WHERE f.area_id = ${id} AND a.tanggal between '${st}' AND '${fn}' GROUP BY f.area_id`,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        }

        if (rows.length <= 0) {
          return res.status(404).json({
            status: false,
            message: "Data Not Found!",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "List Data",
            data: rows,
          });
        }
      }
    );
  }
});

router.get("/table", function (req, res) {
  connection.query(
    `SELECT
  e.brand_name,
  ROUND(SUM(CASE WHEN f.area_id = 1 THEN compliance END)/SUM(compliance)*100,2) AS 'jakarta',
  ROUND(SUM(CASE WHEN f.area_id = 2 THEN compliance END)/SUM(compliance)*100,2) AS 'jawabarat',
  ROUND(SUM(CASE WHEN f.area_id = 3 THEN compliance END)/SUM(compliance)*100,2) AS 'kalimantan',
  ROUND(SUM(CASE WHEN f.area_id = 4 THEN compliance END)/SUM(compliance)*100,2) AS 'jawatengah',
  ROUND(SUM(CASE WHEN f.area_id = 5 THEN compliance END)/SUM(compliance)*100,2) AS 'bali'
  FROM report_product a LEFT JOIN store b
  ON a.store_id=b.store_id LEFT JOIN store_account c
  ON b.account_id=c.account_id LEFT JOIN product d
  ON a.product_id=d.product_id LEFT JOIN product_brand e
  ON d.brand_id=e.brand_id LEFT JOIN store_area f
  ON b.area_id=f.area_id GROUP BY e.brand_name`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data",
          data: rows,
        });
      }
    }
  );
});

router.post("/table", function (req, res) {
  function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  let id = req.body.area;
  let st = req.body.start;
  let fn = req.body.finish;

  if (isEmpty(st)) {
    connection.query(
      `SELECT
  e.brand_name,
  ROUND(SUM(CASE WHEN f.area_id = ${id} THEN compliance END)/SUM(compliance)*100,2) AS 'Persentase'
  FROM report_product a LEFT JOIN store b
  ON a.store_id=b.store_id LEFT JOIN store_account c
  ON b.account_id=c.account_id LEFT JOIN product d
  ON a.product_id=d.product_id LEFT JOIN product_brand e
  ON d.brand_id=e.brand_id LEFT JOIN store_area f
  ON b.area_id=f.area_id GROUP BY e.brand_name`,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        }

        if (rows.length <= 0) {
          return res.status(404).json({
            status: false,
            message: "Data Not Found!",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "List Data",
            data: rows,
          });
        }
      }
    );
  } else {
    connection.query(
      `SELECT
  e.brand_name,
  ROUND(SUM(CASE WHEN f.area_id = ${id} THEN compliance END)/SUM(compliance)*100,2) AS 'Persentase'
  FROM report_product a LEFT JOIN store b
  ON a.store_id=b.store_id LEFT JOIN store_account c
  ON b.account_id=c.account_id LEFT JOIN product d
  ON a.product_id=d.product_id LEFT JOIN product_brand e
  ON d.brand_id=e.brand_id LEFT JOIN store_area f
  ON b.area_id=f.area_id WHERE a.tanggal between '${st}' AND '${fn}' GROUP BY e.brand_name`,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        }

        if (rows.length <= 0) {
          return res.status(404).json({
            status: false,
            message: "Data Not Found!",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "List Data",
            data: rows,
          });
        }
      }
    );
  }
});

module.exports = router;
