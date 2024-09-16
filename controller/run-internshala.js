const path = require('path');
const { main } = require('../script.js');
exports.runInternshalaAutomation = async (req, res) => {
  try {
    const { email, password, dataFile1 } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send({ error: 'Missing required parameters' });
    }

    // Check if dataFile1 is an array and not empty
    if (!Array.isArray(dataFile1) || dataFile1.length === 0) {
      return res.status(400).send({ error: 'Invalid dataFile1: Expected a non-empty array' });
    }

    // Example: Validate each object inside the array
    for (let i = 0; i < dataFile1.length; i++) {
      const dataItem = dataFile1[i];

      // Ensure each object has the required properties (e.g., 'college', 'degree')
      if (!dataItem.college || !dataItem.degree) {
        return res.status(400).send({ error: `Invalid dataFile1 entry at index ${i}: Missing college or degree` });
      }
    }

    console.log('Starting Internshala automation...', email);
    console.log('DataFile1 content:', dataFile1);
    // await main(dataFile1, email, password);
    console.log('Internshala automation completed.', password);

    res.status(200).send({ message: 'Internshala automation completed successfully' });
  } catch (error) {
    console.error('Error in Internshala automation:', error);
    res.status(500).send({ error: 'An error occurred during the automation process' });
  }
};
