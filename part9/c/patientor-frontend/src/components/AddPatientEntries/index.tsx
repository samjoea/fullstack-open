import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react'
import { NewEntry } from '../../types';
import EntriesForm from './EntriesForm';
import { assertNever } from '../../utils/helper';

interface Props {
   setShowEntryForm: React.Dispatch<React.SetStateAction<boolean>>
   setEntriesData: React.Dispatch<React.SetStateAction<NewEntry | undefined>>
}

const AddPatientEntries = ({ setShowEntryForm, setEntriesData }: Props) => {
   const [activeForm, setActiveForm] = React.useState<'healthCheck' | 'occupationalHealthCare' | 'hospital'>('healthCheck');
   const formRef = React.useRef<HTMLFormElement>(null);

   const style = {
      margin: '1rem 0',
      padding: '1rem',
      border: '2px dotted #ccc',
      borderRadius: '5px'
   };




   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formInputData = new FormData(formRef.current as HTMLFormElement);

      setEntriesData((): NewEntry => {
         const date = formInputData.get('date')?.toString() ?? '';
         const description = formInputData.get('description')?.toString() ?? '';
         const diagnosisCodes = formInputData.get('diagnosisCodes')?.toString().split(',') ?? [];
         const specialist = formInputData.get('specialist')?.toString() ?? '';
         const healthCheckRating = formInputData.get('healthCheckRating')?.toString() ?? '';
         const employerName = formInputData.get('employerName')?.toString() ?? '';
         const sickLeaveEndDate = formInputData.get('sickLeaveEndDate')?.toString() ?? '';
         const sickLeaveStartDate = formInputData.get('sickLeaveStartDate')?.toString() ?? '';
         const dischargeDate = formInputData.get('dischargeDate')?.toString() ?? '';
         const dischargeCriteria = formInputData.get('dischargeCriteria')?.toString() ?? '';

         switch (activeForm) {
            case 'healthCheck': {
               return {
                  healthCheckRating: Number(healthCheckRating),
                  description,
                  date,
                  diagnosisCodes,
                  specialist,
                  type: 'HealthCheck'
               }
            }
            case 'occupationalHealthCare': {
               return {
                  employerName,
                  sickLeave: {
                     endDate: sickLeaveEndDate,
                     startDate: sickLeaveStartDate
                  },
                  description,
                  date,
                  diagnosisCodes,
                  specialist,
                  type: 'OccupationalHealthcare'
               }
            }
            case 'hospital': {
               return {
                  discharge: {
                     date: dischargeDate,
                     criteria: dischargeCriteria
                  },
                  description,
                  date,
                  diagnosisCodes,
                  specialist,
                  type: 'Hospital'
               }
            }
            default: return assertNever(activeForm);
         }
      })
      event.target.dispatchEvent(new Event('reset'));
   }

   return (
      <>
         <ToggleButtonGroup
            value={activeForm}
            size='small'>
            <ToggleButton
               value='healthCheck'
               onClick={() => setActiveForm('healthCheck')}
            >
               Health Check Entry
            </ToggleButton>
            <ToggleButton
               value='occupationalHealthCare'
               onClick={() => setActiveForm('occupationalHealthCare')}
            >
               Occupational Heath Care Entry
            </ToggleButton>
            <ToggleButton
               value='hospital'
               onClick={() => setActiveForm('hospital')}
            >
               Hospital Entry
            </ToggleButton>
         </ToggleButtonGroup>
         <form
            ref={formRef}
            style={style}
            onSubmit={handleSubmit}
         >
            <EntriesForm
               entryType={activeForm}
            />
            <div
               style={{ display: 'flex', justifyContent: 'space-between' }}
            >
               <Button
                  variant="contained"
                  color="error"
                  type="reset"
                  onClick={() => {
                     setShowEntryForm(false);
                     setEntriesData(undefined);
                  }}
               >
                  Cancel
               </Button>
               <Button
                  variant="contained"
                  color="inherit"
                  type="submit"
               >
                  Add
               </Button>
            </div>

         </form>
      </>
   )
}

export default AddPatientEntries;