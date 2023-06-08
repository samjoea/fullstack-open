import React from 'react'
import { EntryData } from '../../types';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';
import MedicationIcon from '@mui/icons-material/Medication';

const OccupationalHealthCareEntry = ({ entryData }: { entryData: EntryData }) => {
   return (
      <>
         <h3>
            {entryData.entry.date}
            <i>
               <MedicationIcon />
            </i>
            <span>
               {
                  ('employerName' in entryData.entry) ? entryData.entry.employerName : null
               }
            </span>
         </h3>
         <p>{entryData.entry.description}</p>
         <ul>
            {
               entryData.diagnoses?.map(diagnose => (
                  <li key={diagnose.code}>{diagnose.code} - {diagnose.name}</li>
               ))
            }
         </ul>
         <HealthCheckRatingIcon entry={entryData.entry} />
         <p>specialist: {entryData.entry.specialist}</p>
      </>
   )
}

export default OccupationalHealthCareEntry;