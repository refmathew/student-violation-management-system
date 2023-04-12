const path = require('path');
const sqlite = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, './SVMS.db');
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err)
})

module.exports = db;
