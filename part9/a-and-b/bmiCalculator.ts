export const calculateBmi = (height: number, weight: number): string => {
   const bmi = weight / (height / 100) ** 2;
   if (bmi < 18.5) return 'Underweight';
   if (bmi < 25) return 'Normal (healthy weight)';
   if (bmi < 30) return 'Overweight';
   return 'Obese';
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (process.argv.length >= 4) {
   console.log(calculateBmi(height, weight));
} else {
   console.log(calculateBmi(180, 74));
}
