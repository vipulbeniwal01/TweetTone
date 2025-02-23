import React, { useState } from 'react';
import './InputForm.css'; // Import the CSS file
import { fetchAndAnalyze } from '../services/api';

const InputForm = ({ twitterId, setTwitterId, setSentiment, setTweets }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Reset the sentiment and tweets before starting a new analysis
    setSentiment(null);
    setTweets([]);

    try {
      const response = await fetchAndAnalyze(twitterId);
      setSentiment(response.overallSentiment);
      setTweets(response.tweets);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Twitter User ID *"
          value={twitterId}
          onChange={(e) => setTwitterId(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </form>

      {loading && (
        <div className="loading-bar"></div>
      )}

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputForm;