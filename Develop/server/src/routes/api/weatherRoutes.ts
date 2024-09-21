import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService.js';
const router = Router();

import HistoryService from '../../service/historyService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  console.log("POST",req.body)
  weatherService.getWeatherForCity(req.body.cityName).then((weatherData) => {
    HistoryService.addCity(req.body.cityName);

    res.json(weatherData);
  });

  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => { 
  HistoryService.getCities().then((cities) => {
    res.json(cities);
  });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => { 
  HistoryService.removeCity(req.params.id);
  res.sendStatus(200);
});

export default router;
