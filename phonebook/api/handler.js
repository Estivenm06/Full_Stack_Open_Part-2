const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json(persons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to read database file" });
    }
  } else if (req.method === "POST") {
    try {
      const body = req.body;

      const newEntry = { id: String(persons.length + 1), ...body };
      persons.push(newEntry);

      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save data" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, ...updatedData } = req.body;

      const index = persons.findIndex((entry) => entry.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Entry not found" });
      }

      const {
        newObject: { name, number },
      } = updatedData;
      const updatedEntry = { name, number };
      persons[index] = { ...persons[index], ...updatedEntry };

      res.status(200).json(persons[index]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const updatedData = persons.filter((entry) => entry.id !== id);

      if (persons.length === updatedData.length) {
        return res.status(404).json({ error: "Entry not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
