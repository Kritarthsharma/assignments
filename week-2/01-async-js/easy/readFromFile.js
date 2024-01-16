//The fs module enables interacting with the file system in a way modeled on
//standard POSIX functions.
const fs = require("fs");

//console.log(fs);

//reading file in async way
fs.readFile("./practice.txt", "utf-8", (err, data) => {
  //if we don't pass utf-8 it will return buffer not string
  if (err) throw err;
  console.log(data);
});
