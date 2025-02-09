import React, { useState } from 'react';
import './Home.css'; // Import the CSS file
import InputForm from '../components/InputForm';
import SentimentResult from '../components/SentimentResult';
import TweetList from '../components/TweetList';
import Chatbot from '../components/Chatbot';
import PersonalityCards from '../components/PersonalityCards'; // Import the new component
import { fetchAndAnalyze } from '../services/api'; // Import the API function

const Home = () => {
  const [twitterId, setTwitterId] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startAnalysis = async (id) => {
    setError(null);
    setLoading(true);
    setSentiment(null);
    setTweets([]);

    try {
      const response = await fetchAndAnalyze(id);
      setSentiment(response.overallSentiment);
      setTweets(response.tweets);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <PersonalityCards setTwitterId={setTwitterId} startAnalysis={startAnalysis} />
      <InputForm twitterId={twitterId} setSentiment={setSentiment} setTweets={setTweets} setTwitterId={setTwitterId} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {sentiment !== null && (
        <div className="sentiment-result">
          <SentimentResult sentiment={sentiment} />
        </div>
      )}
      {tweets.length > 0 && (
        <div className="tweet-list">
          <TweetList tweets={tweets} />
        </div>
      )}
      {sentiment !== null && (
        <div className="chatbot">
          <Chatbot tweets={tweets} twitterId={twitterId} />
        </div>
      )}
    </div>
  );
};

export default Home;