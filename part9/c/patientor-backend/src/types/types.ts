type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

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


export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
   Male = 'male',
   Female = 'female',
   Other = 'other'
}