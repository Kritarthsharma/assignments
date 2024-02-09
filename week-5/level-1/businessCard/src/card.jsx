export function Card({ cards }) {
  return (
    <div className="container">
      {cards.map(function (card) {
        return (
          <div key={card.heading} className="card">
            <p className="heading">{card.heading}</p>
            <p className="description">{card.description}</p>
            <p className="heading">Interests</p>
            {card.interests.map((interest) => {
              return (
                <p key={interest} className="interest">
                  {interest}
                </p>
              );
            })}
            <button>Linkedin</button>
            <button style={{ marginLeft: 20 }}>Twitter</button>
          </div>
        );
      })}
    </div>
  );
}
