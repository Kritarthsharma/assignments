function updateClock() {
  var now = new Date();

  // Format: HH:MM:SS IST
  var optionsIST = { timeZone: "Asia/Kolkata", hour12: false };
  var hhmmssIST = now.toLocaleTimeString("en-US", optionsIST);

  // Format: HH:MM:SS AM/PM IST
  var optionsISTAMPM = { timeZone: "Asia/Kolkata", hour12: true };
  var hhmmssISTAMPM = now.toLocaleTimeString("en-US", optionsISTAMPM);

  console.log(hhmmssIST);
  console.log(hhmmssISTAMPM);
}

const time = setInterval(updateClock, 1000);

setTimeout(() => {
  clearInterval(time);
}, 10000);
