//The fs module enables interacting with the file system in a way modeled on
//standard POSIX functions.
const fs = require("fs");

//console.log(fs);

//writing file in async way
fs.writeFile("./practice.txt", "Hello learning something", (error) => {
  if (error) throw error;
  console.log("File message.txt is added");
});
