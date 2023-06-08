import { Entry, NewPatientEntry, NonSensitivePatient, Patient } from "../types/types";
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

const getAllPatientEntries = (): Patient[] => {
   return patientData;
};
const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
   return patientData.map(({ id, gender, dateOfBirth, name, occupation}) => ({
      id,
      dateOfBirth,
      gender,
      name,
      occupation,
      entries: []
   }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
   const id: string = uuid();
   const newPatientEntry = {
      id: id,
      ...entry
   };
   patientData.push(newPatientEntry);
   return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
   const patient = patientData.find(patient => patient.id === id);
   if (patient) {
      return {
         ...patient
      };
   }
   return patient;
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
   const patient = getPatientById(id);
   if (patient) {
      const newPatient = {
         ...patient,
         entries: [...patient.entries, { ...entry, id: uuid() }]
      }
      patientData.forEach((patient, idx) => patient.id === id ? patientData.splice(idx, 1, newPatient) : patient);
      return newPatient;
   }
   return patient;
};

export default {
   getAllPatientEntries,
   getNonSensitivePatientEntries,
   addPatient,
   getPatientById,
   addEntry
};