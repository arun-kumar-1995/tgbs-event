import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

class EventService {
  #fileName = fileURLToPath(import.meta.url);
  #dirName = path.dirname(this.#fileName);
  #filePath = path.resolve(this.#dirName, "../data/data.json");

  async #readJsonFile() {
    try {
      const data = await readFile(this.#filePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading file", err);
      return null;
    }
  }

  async getEvents() {
    return await this.#readJsonFile();
  }

  async getEventDetails(id) {
    console.log(id, typeof id);
    const data = await this.#readJsonFile();
    if (!data) return null;
    return data.find((event) => event.id.toString() === id) || null;
  }
}

export const Event = new EventService();
