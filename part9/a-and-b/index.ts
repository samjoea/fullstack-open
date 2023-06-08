import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
      res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
      const { height, weight } = req.query;
      const bmi: string = calculateBmi(Number(height), Number(weight));

      if (!height || !weight) {
            res.status(400).json({ error: 'malformatted parameters' });
      }
      res.json({
            weight,
            height,
            bmi
      });
});

app.post('/exercises', (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { daily_exercises, target } = req.body;
      if (!daily_exercises || !target) {
            res.status(400).json({ error: 'parameters missing' });
      }
      if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) { 
            res.status(400).json({ error: 'malformatted parameters' });
      }
      const dailyExercises = daily_exercises as Array<number>;
      const targetHours = Number(target);
      const results = exerciseCalculator(dailyExercises, targetHours);
      res.json(results);
});

const PORT = 3002;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});