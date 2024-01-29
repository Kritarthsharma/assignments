const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function sum(a, b) {
  return a + b;
}

const intCalculator = (principal, time, rate) => {
  let interest = (principal * time * rate) / 100;
  return principal + interest;
};

app.get("/sum", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);

  let total = sum(a, b);

  res.send(total.toString());
});

app.get("/interest", (req, res) => {
  let principal = parseInt(req.query.principal);
  let rate = parseInt(req.query.rate);
  let time = parseInt(req.query.time);
  const total = intCalculator(principal, time, rate);

  res.send(total.toString());
});

app.listen(3000, () => console.log("listening on port 3000"));
