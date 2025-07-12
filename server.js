const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const tokenPath = path.join(__dirname, 'token.json');

let clients = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/putToken', (req, res) => {
  const token = req.body;

  if (!token || !token.user || !token.browser) {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  fs.writeFileSync(tokenPath, JSON.stringify(token));
  res.json({ success: true });
});

app.get('/getToken', (req, res) => {
  if (!fs.existsSync(tokenPath)) {
    return res.status(404).json({ error: 'Token not found' });
  }

  const token = JSON.parse(fs.readFileSync(tokenPath));
  res.json(token);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
