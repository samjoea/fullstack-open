import { Diagnose, Discharge, Entry, HealthCheckRating, SickLeave } from "../types/types";
import { assertNever } from "./helper";
import { parseDate, parseString } from "./patientUtils";

export const parseEntries = (entries: unknown): Entry[] => {
   if (!entries) return [];
   if (!isArray(entries)) {
      throw new Error(`Incorrect or missing entries: ${entries}`);
   }
   const newEntry: Entry[] = entries.map(entry => {
      if (!isEntry(entry)) {
         throw new Error(`Incorrect or missing entry: ${entry}`);
      }

      const baseEntry = {
         id: parseString(entry.id, 'id'),
         description: parseString(entry.description, 'description'),
         date: parseDate(entry.date, 'date'),
         specialist: parseString(entry.specialist, 'specialist'),
         diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
      };
      switch (entry.type) {
         case 'HealthCheck':
            return {
               ...baseEntry,
               type: 'HealthCheck',
               healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
            };
         case 'Hospital':
            return {
               ...baseEntry,
               type: 'Hospital',
               discharge: parseDischarge(entry.discharge),
            };
         case 'OccupationalHealthcare':
            return {
               ...baseEntry,
               type: 'OccupationalHealthcare',
               employerName: parseString(entry.employerName, 'employerName'),
               sickLeave: parseSickLeave(entry.sickLeave),
            };
         default:
            return assertNever(entry);
      }
   });
   return newEntry;
};


const isArray = (array: unknown): array is Array<unknown> => {
   return Array.isArray(array);
};

const isEntry = (entry: unknown): entry is Entry => {
   return (entry !== null && typeof entry === 'object' && 'type' in entry);
};
const isNumber = (number: unknown): number is number => {
   return (typeof number === 'number' || number instanceof Number);
};
const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
   return (Object.values(HealthCheckRating).map(v => Number(v)).includes(rating));
};
const isDischarge = (discharge: unknown): discharge is Discharge => {
   return (discharge !== null && typeof discharge === 'object' && 'date' in discharge && 'criteria' in discharge);
};
const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
   return (sickLeave !== null && typeof sickLeave === 'object' && 'startDate' in sickLeave && 'endDate' in sickLeave);
};
const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnose['code']> => {
   return (diagnosisCodes !== null && typeof diagnosisCodes === 'object' && Array.isArray(diagnosisCodes));
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
   if (!isNumber(rating) || !isHealthCheckRating(rating)) {
      throw new Error(`Incorrect or missing healthCheckRating: ${rating}`);
   }
   return rating;
};
const parseDischarge = (discharge: unknown): Discharge => {
   if (!isDischarge(discharge)) {
      throw new Error(`Incorrect or missing discharge: ${discharge}`);
   }
   return {
      date: parseDate(discharge.date, 'date'),
      criteria: parseString(discharge.criteria, 'criteria'),
   };
};
const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
   if(!sickLeave) return undefined;
   if (!isSickLeave(sickLeave)) {
      throw new Error(`Incorrect or missing sickLeave: ${sickLeave}`);
   }
   return {
      startDate: parseDate(sickLeave.startDate, 'startDate'),
      endDate: parseDate(sickLeave.endDate, 'endDate'),
   };
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> | undefined => {
   if (!diagnosisCodes) return undefined;
   if (!isDiagnosisCodes(diagnosisCodes)) {
      throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}`);
   }
   return diagnosisCodes.map(code => parseString(code, 'code'));
};