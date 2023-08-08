// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Deta } = require('deta'); // import Deta

const deta = Deta();

// This how to connect to or create a database.
const db = deta.Base('languages');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const languageTiers = req.body;
    // Here you can process the submittedData as needed, e.g., save it to a database.
    // Remember to handle validation and error cases.
    console.log(languageTiers)
    for (const language in languageTiers) {
      const tier = languageTiers[language];
      let points = 0;

      switch (tier) {
        case 'S-tier':
          points = 5;
          break;
        case 'A-tier':
          points = 4;
          break;
        case 'B-tier':
          points = 3;
          break;
        case 'C-tier':
          points = 2;
          break;
        case 'D-tier':
          points = 1;
          break;
        default:
          points = 0;
          break;
      }

      // Assuming your database library has an update method
      console.log(language)
      await db.update({ total_votes: db.util.increment(points), vote_count: db.util.increment(1) }, language);
    }
    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error processing submitted data:', error);
    return res.status(500).json({ message: 'Failed to process data' });
  }
}
