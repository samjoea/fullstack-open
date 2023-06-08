export interface Result {
   numberOfDays: number;
   numberOfTrainingDays: number;
   target: number;
   averageTime: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
}

export const exerciseCalculator = (dailyExerciseHours: Array<number>, target: number): Result => {
   const numberOfDays = dailyExerciseHours.length;
   const numberOfTrainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
   const averageTime = dailyExerciseHours.reduce((a, b) => a + b) / numberOfDays;
   const success = averageTime >= target;
   let rating: number;
   let ratingDescription: string;
   if (success) { 
      rating = 3;
      ratingDescription = 'good';
   }
   else if (averageTime >= target - 1) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
   }
   else {
      rating = 1;
      ratingDescription = 'bad';
   }

   return {
      numberOfDays,
      numberOfTrainingDays,
      target,
      averageTime,
      success,
      rating,
      ratingDescription
   };
};

const parseArguments = (args: string[]): number[] => {
   const dailyExerciseHours = args.slice(3).map(hours => Number(hours));
   if (dailyExerciseHours.some(hours => isNaN(hours))) throw new Error('Provided values were not numbers!');
   return dailyExerciseHours;
};
const target = Number(process.argv[2]);
const dailyExerciseHours = parseArguments(process.argv);
if (process.argv.length >= 4) { 
   console.log(exerciseCalculator(dailyExerciseHours, target));
} else {
   console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
}