import { useState } from "react";
import { useMemo } from "react";
// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  // Your solution starts here
  const factorial = (num) => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
  };
  const expensiveValue = useMemo(() => factorial(input), [input]);
  // Your solution ends here

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
      />
      <p>Calculated Value: {expensiveValue}</p>
    </div>
  );
}
