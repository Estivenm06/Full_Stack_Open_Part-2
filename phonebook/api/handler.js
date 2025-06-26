import path from "path";
import fs from "fs/promises";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, "../dist/db.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to read database file" });
    }
  } else if (req.method === "POST") {
    try {
      const body = req.body;
      const data = await fs.readFile(dbPath, "utf-8");
      const jsonData = JSON.parse(data);

      const newEntry = { id: String(jsonData.length + 1), ...body };
      jsonData.push(newEntry);

      await fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2));
      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save data" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, ...updatedData } = req.body;

      const data = await fs.readFile(dbPath, "utf-8");
      const jsonData = JSON.parse(data);

      const index = jsonData.findIndex((entry) => entry.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Entry not found" });
      }

      const {
        newObject: { name, number },
      } = updatedData;
      const updatedEntry = { name, number };
      jsonData[index] = { ...jsonData[index], ...updatedEntry };

      await fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), "utf-8");
      res.status(200).json(jsonData[index]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const data = await fs.readFile(dbPath, "utf-8");
      const jsonData = JSON.parse(data);

      const updatedData = jsonData.filter((entry) => entry.id !== id);

      if (jsonData.length === updatedData.length) {
        return res.status(404).json({ error: "Entry not found" });
      }

      await fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2), "utf-8");
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
