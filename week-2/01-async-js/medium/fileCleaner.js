const fs = require("fs");

// fs.readFile("./practice.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   let wordsArray = data.split(" ");
//   let filteredWords = wordsArray.filter((word) => word != "");
//   let newData = filteredWords.join(" ");
//   fs.writeFile("./practice.txt", newData, (err) => {
//     if (err) throw err;
//     console.log("New data has been successfully written");
//   });

//   fs.readFile("./practice.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// });

fs.readFile("./practice.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
  var linesArray = data.split("\n");
  // Remove extra spaces from each line and join them back into a string
  var modifiedString = linesArray
    .map(function (line) {
      // Split the line by spaces and filter out empty strings
      var wordsArray = line.split(" ");

      let filteredWords = wordsArray.filter(function (word) {
        return word !== "";
      });

      // Join the words back into a line with a single space between each word
      return filteredWords.join(" ");
    })
    .join("");

  fs.writeFile("./practice.txt", modifiedString, (err) => {
    if (err) throw err;
    console.log("New data has been successfully written");
  });

  fs.readFile("./practice.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});
