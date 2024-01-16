let count = 1;
const interval = setInterval(function () {
  console.log(count++);
}, 1000);

setTimeout(function () {
  clearInterval(interval);
}, 11000);
