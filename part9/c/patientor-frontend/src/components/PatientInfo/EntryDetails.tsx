import React from 'react'
import { Diagnose, Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';
import { assertNever } from '../../utils/helper';
import diagnosesService from '../../services/diagnoses';
import axios from 'axios';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
   const [diagnoses, setDiagnoses] = React.useState<Diagnose[]>([]);

   React.useEffect(() => {
      if (!entry.diagnosisCodes) return;
      let diagnosesArr: Diagnose[] = [];

      const fetchDiagnosisCodes = async (code: string) => {
         try {
            const codes = await diagnosesService.getOne(code);
            diagnosesArr = [...diagnosesArr, codes];
         } catch (error) {
            if (axios.isAxiosError(error)) {
               console.log(error.response?.data);
            }
         }
         setDiagnoses(diagnosesArr);
      };
      entry.diagnosisCodes.forEach(code => void fetchDiagnosisCodes(code));
   }, []);

   switch (entry.type) {
      case 'HealthCheck':
         return <HealthCheckEntry entryData={{ entry, diagnoses }} />;
      case 'Hospital':
         return <HospitalEntry entryData={{ entry, diagnoses }} />;
      case 'OccupationalHealthcare':
         return <OccupationalHealthCareEntry entryData={{ entry, diagnoses }} />;
      default:
         return assertNever(entry);
   }
}

export default EntryDetails;