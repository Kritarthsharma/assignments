import "./App.css";
import { Card } from "./card";
// import { BCard } from "./BusinessCard";

function App() {
  let cards = [
    {
      heading: "Kritarth Sharma",
      description: "Software Engineer",
      interests: ["Ionic", "Open Source", "App dev"],
    },
    {
      heading: "Mayank Pandey",
      description: "Chartered Accountant",
      interests: ["Business", "Entrepreneurship", "Accounting"],
    },
    {
      heading: "Priyanka Tiwari",
      description: "CMA",
      interests: ["Share Market", "Investment Banking"],
    },
  ];
  // let card = {
  //   name: "Kritarth Sharma",
  //   description: "Software Engineer",
  //   interests: ["Ionic", "Open Source", "App dev"],
  //   linkedin: "https://linkedin.com/",
  //   twitter: "https://twitter.com",
  // };
  return (
    <>
      <Card cards={cards}></Card>
      {/* <BCard props={card}></BCard> */}
    </>
  );
}

export default App;
