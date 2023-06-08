import { Gender, NewPatientEntry } from "../types/types";
import { parseEntries } from "./patientEntriesUtils";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
   if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
   }
   const expectedEntries = (
      'name' in object
      && 'ssn' in object
      && 'gender' in object
      && 'occupation' in object
      && 'dateOfBirth' in object
      && 'entries' in object
   );

   if (expectedEntries) { 
      const newPatientEntry: NewPatientEntry = {
         name: parseString(object.name, 'name'),
         dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
         ssn: parseString(object.ssn, 'ssn'),
         occupation: parseString(object.occupation, 'occupation'),
         gender: parseGender(object.gender, 'gender'),
         entries: parseEntries(object.entries),
      };
      return newPatientEntry;
   }
   throw new Error('Incorrect or missing data');
};

export const parseString = (string: unknown, name: string): string => {
   if (!string || !isString(string)) {
      throw new Error(`Incorrect or missing ${name}: ${string}`);
   }
   return string;
};

export const parseDate = (date: unknown, name: string): string => {
   if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing ${name}: ${date}`);
   }
   return date;
};

const parseGender = (gender: unknown, name: string): Gender => {
   if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error(`Incorrect or missiing ${name}: ${gender}`);
   }
   return gender;
};



const isString = (text: unknown): text is string => {
   return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
   return Boolean(Date.parse(date));
};
const isGender = (gender: string): gender is Gender => {
   return Object.values(Gender).map(value => value.toString()).includes(gender);
};
