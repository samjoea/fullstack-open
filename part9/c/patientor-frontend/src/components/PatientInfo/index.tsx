import React from 'react'
import { useMatch } from 'react-router-dom';
import patientService from '../../services/patients';
import axios from 'axios';
import { Button, Container } from '@mui/material';
import { NewEntry, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from './EntryDetails';
import AddPatientEntries from '../AddPatientEntries/';
import patientsServices from '../../services/patients';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PatientInfo = () => {
   const match = useMatch('/patients/:id');
   const id = match?.params.id;
   const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
   const [showEntryForm, setShowEntryForm] = React.useState<boolean>(false);
   const [entriesData, setEntriesData] = React.useState<NewEntry | undefined>(undefined);
   const [error, setError] = React.useState<string | undefined>(undefined);

   React.useEffect(() => {
      if (!id) return;
      const fetchPatientInfo = async () => {
         try {
            const patient = await patientService.getOne(id);
            setPatient(patient);
         } catch (error) {
            if (axios.isAxiosError(error)) {
               setError(error.response?.data);
            }
         }
      };
      void fetchPatientInfo();
   }, []);

   React.useEffect(() => {
      if (!entriesData) return;
      const addEntry = async () => {
         try {
            const newPatient = await patientsServices.addEntry(id, entriesData);
            setPatient(newPatient);
         } catch (error) {
            if (axios.isAxiosError(error)) {
               setError(error.response?.data);
            }
         }
         setEntriesData(undefined);
      };
      void addEntry();
   }, [entriesData]);


   const genderIcon = (gender: string | undefined): JSX.Element | null => {
      if (gender === 'male') return <MaleIcon />;
      else if (gender === 'female') return <FemaleIcon />;
      else return null;
   };

   const style = {
      margin: '1rem 0',
      padding: '1rem',
      border: '2px solid #ccc',
      borderRadius: '5px'
   };

   const errorStyle = {
      backgroundColor: '#fdece9',
      padding: '1rem 1rem',
      margin: '1rem 0',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '5px',
   }

   return (
      <Container>
         <div>
            <h1>{patient?.name} {genderIcon(patient?.gender)}</h1>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
         </div>
         {
            error &&
         <div style={errorStyle}>
            <ErrorOutlineIcon sx={{ color: '#c56250', fontSize: '2rem', marginRight: '1rem' }} />
            <span style={{ color: '#c56250' }}>{error}</span>
         </div>
         }
         {
            showEntryForm && <AddPatientEntries
               setShowEntryForm={setShowEntryForm}
               setEntriesData={setEntriesData}
            />
         }
         <div>
            <h2>entries</h2>
            {
               patient?.entries.map(entry => (
                  <div style={style} key={entry.id}>
                     <EntryDetails entry={entry} />
                  </div>
               ))
            }
         </div>
         <Button
            variant="contained"
            onClick={() => {
               setShowEntryForm(true)  
               window.scrollTo(0, 0);
            }}
         >
            Add New Entry
         </Button>
      </Container>
   )
}

export default PatientInfo;