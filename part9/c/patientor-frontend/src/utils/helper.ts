import { HealthCheckRating } from "../types";

export const assertNever = (value: never): never => {
   throw new Error(
     `Unhandled discriminated union member: ${JSON.stringify(value)}`
   );
};
 

export const healthCheckRatingToColor = (rating: HealthCheckRating): string => {
    switch (rating) {
        case HealthCheckRating.Healthy:
          return 'green';
        case HealthCheckRating.LowRisk:
          return 'yellow';
        case HealthCheckRating.HighRisk:
          return 'orange';
        case HealthCheckRating.CriticalRisk:
          return 'red';
        default:
          return 'black';
    }
};