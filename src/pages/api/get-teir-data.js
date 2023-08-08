const { Deta } = require('deta'); // import Deta

const deta = Deta();

// This how to connect to or create a database.
const db = deta.Base('languages');
// pages/api/getAverages.js

const calculateAverage = async (language) => {
    try {
      const data = await db.get(language); // Assuming you have a get method in your db library
      const totalVotes = data.total_votes;
      const voteCount = data.vote_count;
  
      if (voteCount === 0) {
        return 0; // Avoid division by zero
      }
  
      const average = totalVotes / voteCount;
      const roundedAverage = Math.round(average * 10) / 10; // Round to one decimal place
      
      return roundedAverage;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    try {
      const languages = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'Go', 'Rust', 'PHP'];
      const languageAverages = {};
  
      for (const language of languages) {
        const average = await calculateAverage(language);
        languageAverages[language] = average;
      }
  
      return res.status(200).json(languageAverages);
    } catch (error) {
      console.error('Error processing data:', error);
      return res.status(500).json({ message: 'Failed to process data' });
    }
  }
  
  