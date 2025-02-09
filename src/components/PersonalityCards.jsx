import React from 'react';
import './PersonalityCards.css'; // Create a CSS file for styling

const personalities = [
  { name: 'Narendra Modi', twitterId: 'narendramodi' },
  { name: 'Virat Kohli', twitterId: 'imVkohli' },
  { name: 'Elon Musk', twitterId: 'elonmusk' },
  { name: 'Bill Gates', twitterId: 'BillGates' },
  { name: 'Sundar Pichai', twitterId: 'sundarpichai' },
  // Add more personalities as needed
];

const PersonalityCards = ({ setTwitterId, startAnalysis }) => {
  return (
    <div className="personality-cards">
      {personalities.map((personality) => (
        <div
          key={personality.twitterId}
          className="personality-card"
          onClick={() => {
            setTwitterId(personality.twitterId);
            startAnalysis(personality.twitterId);
          }}
        >
          {personality.name}
        </div>
      ))}
    </div>
  );
};

export default PersonalityCards; 