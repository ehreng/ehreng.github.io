// pages/api/grok.js
export default function handler(req, res) {
  const { question } = req.body;
  const fakeAnswer = `Grok says: The answer to "${question}" is classified until January 2027.`;
  res.status(200).json({ answer: fakeAnswer });
}
