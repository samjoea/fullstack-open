import { SelectInputProps } from "@mui/material/Select/SelectInput";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Diagnose = {
   code: string;
   name: string;
   latin?: string;
};

interface BaseEntry {
   id: string;
   description: string;
   date: string;
   specialist: string;
   diagnosisCodes?: Array<Diagnose['code']>;
 }

export enum HealthCheckRating {
   "Healthy" = 0,
   "LowRisk" = 1,
   "HighRisk" = 2,
   "CriticalRisk" = 3
}

export type SickLeave = {
   startDate: string;
   endDate: string;
};
export type Discharge = {
   date: string;
   criteria: string;
};

interface HealthCheckEntry extends BaseEntry {
   type: "HealthCheck";
   healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
   type: "OccupationalHealthcare";
   employerName: string;
   sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
   type: "Hospital";
   discharge: Discharge;
}
 
export type Entry =
   | HealthCheckEntry
   | OccupationalHealthCareEntry
   | HospitalEntry;

export type Patient = {
   id: string;
   name: string;
   dateOfBirth: string;
   ssn: string;
   gender: string;
   occupation: string;
   entries: Entry[];
};

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface EntryData {
   entry: Entry;
   diagnoses?: Diagnose[];
}

export interface CustomInputElements extends HTMLFormControlsCollection {
   description: HTMLInputElement;
   date: HTMLInputElement;
   specialist: HTMLInputElement;
   healthCheckRating: HTMLInputElement;
   diagnosisCodes: SelectInputProps<string[]>;
   employerName: HTMLInputElement;
   sickLeaveStartDate: HTMLInputElement;
   sickLeaveEndDate: HTMLInputElement;
   dischargeDate: HTMLInputElement;
   dischargeCriteria: HTMLInputElement;
}


export type NewEntry = UnionOmit<Entry, "id">;