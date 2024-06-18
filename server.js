// workout-planner-backend/server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

const url = 'https://api.openai.com/v1/chat/completions';
const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
};

app.post('/api/generate-workout', async (req, res) => {
  const { muscleGroups, focuses, timeConstraint, coolDown } = req.body;
  try {
    const response = await axios.post(url, {
      model: 'gpt-3.5-turbo',
      messages: [{
        role: "user",
        content: `Generate a single day workout with the criteria I give you, based on key principles of muscle hypertrophy, and on a 6 day a week Push Pull Legs split, attempting to exceed no more than 20 sets per muscle group per week:
        Muscle Groups: ${muscleGroups.join(', ')}
        Focuse on a little more: ${focuses.join(', ')}
        Time Constraint: ${timeConstraint}
        Cool Down: ${coolDown}`
      }],
      max_tokens: 550
    }, {
      headers
    });

    console.log('OpenAI Response:', response.data); // Log the response for debugging

    res.json({ workoutPlan: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error from OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error generating workout plan' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
