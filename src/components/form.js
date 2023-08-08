import React, { useState } from 'react';

const tiers = ['S-tier', 'A-tier', 'B-tier', 'C-tier', 'D-tier'];

const programmingLanguages = [
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Swift',
  'Go',
  'Rust',
  'PHP',
];

function TierListForm() {
  const [languageTiers, setLanguageTiers] = useState({});

  const handleTierChange = (language, tier) => {
    setLanguageTiers((prevTiers) => ({
      ...prevTiers,
      [language]: tier,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(languageTiers),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Programming Language Tier List</h2>
      <table className="tier-table">
        <thead>
          <tr>
            <th></th>
            {tiers.map((tier) => (
              <th key={tier} className="tier-header">
                {tier}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {programmingLanguages.map((language) => (
            <tr key={language}>
              <td className="language-cell">{language}</td>
              {tiers.map((tier) => (
                <td key={tier} className="tier-cell">
                  <input
                    type="radio"
                    name={language}
                    value={tier}
                    checked={languageTiers[language] === tier}
                    onChange={() => handleTierChange(language, tier)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TierListForm;