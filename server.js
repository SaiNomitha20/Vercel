const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (you can replace this with DB later)
let documents = [];

// Save a new document
app.post('/api/documents', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const newDoc = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date()
  };

  documents.push(newDoc);

  res.status(201).json({ message: 'Document saved!', document: newDoc });
});

// Get all saved documents
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

// Get a single document by ID
app.get('/api/documents/:id', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }
  res.json(doc);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
