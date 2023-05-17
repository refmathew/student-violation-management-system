const db = require("./connect.js");

const guardList = [
  { firstname: "N/A", lastname: "" },
  { firstname: "Dario", lastname: "Fullion" },
  { firstname: "Iyrome", lastname: "Argao" },
  { firstname: "Jayson", lastname: "Verzo" },
  { firstname: "Melvin", lastname: "Boston" },
  { firstname: "Mercedita", lastname: "Abalona" },
  { firstname: "Reejay", lastname: "Ortega" },
  { firstname: "Remond", lastname: "Rivera" },
  { firstname: "Ronaldo", lastname: "Villacruel" },
];

let sql = `INSERT INTO Guard(firstname, lastname) VALUES`;
let values = guardList.map((guard, index) => {
  if (index === guardList.length - 1)
    return ` ('${guard.firstname}', '${guard.lastname}')`;
  return `('${guard.firstname}', '${guard.lastname}')`;
});
sql += values.join(", ");

db.run(sql, (err) => {
  if (err) {
    console.log(err);
  }
});
