let timeOut;
const debounce = () => {
  clearTimeout(timeOut);
  setTimeout(sum, 5000);
};

const debounce2 = () => {
  clearTimeout(timeOut);
  setTimeout(total, 5000);
};

const sum = async () => {
  let num1 = parseInt(document.querySelector("#number1").value);
  let num2 = parseInt(document.querySelector("#number2").value);

  const getSum = await fetch(`http://localhost:3000/sum?a=${num1}&b=${num2}`);
  const response = await getSum.text();
  document.getElementById("sum").innerHTML = response;
};

const total = async () => {
  let principal = parseInt(document.querySelector("#principal").value);
  let time = parseInt(document.querySelector("#time").value);
  let rate = parseInt(document.querySelector("#rate").value);

  const getTotal = await fetch(
    `http://localhost:3000/interest?principal=${principal}&rate=${rate}&time=${time}`
  );
  response = await getTotal.text();
  document.getElementById("total").innerHTML = response;
};
