// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve everything in your project folder
app.use(express.static(path.join(__dirname)));

// Expose auth_config.json to the client
app.get('/auth_config.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth_config.json'));
});

// Fallback to index.html for any client‑side route (SPA)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
