/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length == 0 || str.length == 1) return true;
  str = str.toLowerCase();
  let j = str.length - 1;
  let i = 0;
  while (i <= j) {
    while (!str[i].match(/[a-z]/i)) i++;
    while (!str[j].match(/[a-z]/i)) j--;
    if (str[i] != str[j]) return false;
    i++;
    j--;
  }
  return true;
}

isPalindrome("Able, was I ere I saw Elba!");

module.exports = isPalindrome;
