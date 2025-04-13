import { Router, type Request, type Response } from 'express';
import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';

const router = Router();

// POST /api/weather
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const weatherData = await WeatherService.getForecastForCity(city);
    const savedCity = await HistoryService.addCity(city);

    return res.json({ city: savedCity, forecast: weatherData });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET /api/weather/history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getHistory();
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load search history' });
  }
});

// DELETE /api/weather/history/:id
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedHistory = await HistoryService.deleteCity(id);
    return res.json(updatedHistory);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;