import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../db/db.json');

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(dbPath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch {
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(cities, null, 2));
  }

  async getHistory(): Promise<City[]> {
    return this.read();
  }

  async addCity(name: string): Promise<City> {
    const cities = await this.read();

    // Prevent duplicates
    if (cities.some(city => city.name.toLowerCase() === name.toLowerCase())) {
      return cities.find(city => city.name.toLowerCase() === name.toLowerCase())!;
    }

    const newCity: City = { id: uuidv4(), name };
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  async deleteCity(id: string): Promise<City[]> {
    const cities = await this.read();
    const filtered = cities.filter(city => city.id !== id);
    await this.write(filtered);
    return filtered;
  }
}

export default new HistoryService();
