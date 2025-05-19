export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Метод рұқсат етілмеген' });
  }
  try {
    res.status(200).json({ message: "Сервер жауап берді!" });
  } catch (error) {
    res.status(500).json({ error: "Сервер қатесі: " + error.message });
  }
} 