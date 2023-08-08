// pages/TierListPage.js

import { useEffect, useState } from 'react';

const TierListPage = () => {
  const [languageAverages, setLanguageAverages] = useState({});

  useEffect(() => {
    // Fetch language averages from your API endpoint
    fetch('/api/get-teir-data')
      .then((response) => response.json())
      .then((data) => setLanguageAverages(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const getTier = (average) => {
    if (average >= 5) {
      return 'S';
    } else if (average >= 4) {
      return 'A';
    } else if (average >= 3) {
      return 'B';
    } else if (average >= 2) {
      return 'C';
    } else {
      return 'D';
    }
  };

  const tiers = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className="tier-list-container">
      <h1>Language Tier List</h1>
      <table className="tier-list-table">
        <thead>
          <tr>
            <th></th>
            {tiers.map((tier) => (
              <th key={tier}>{tier}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(languageAverages).map(([language, average]) => (
            <tr key={language}>
              <td className="language-name">{language}</td>
              {tiers.map((tier) => (
                <td key={tier} className={`tier-item ${getTier(average) === tier ? tier.toLowerCase() : ''}`}>
                  {getTier(average) === tier ? 'X' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TierListPage;
