import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'
import BaseEntryForm from './BaseEntryForm'

const AddOccupationalHealthEntry = () => {
   return (
      <div>
         <h3>New Occupational Health Entry</h3>
         <BaseEntryForm />
         <FormControl sx={{
            width: '100%',
            marginBottom: '1rem'
         }}>
            <InputLabel
               htmlFor="employerName"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Employer Name
            </InputLabel>
            <Input
               name='employerName'
               required
            />
         </FormControl>
         <h3>Sick Leave</h3>
         <FormControl sx={{
            width: '100%',
            marginBottom: '1rem',
            marginLeft: '1rem',
         }}
         focused
         >
            <InputLabel
               htmlFor="sickLeaveStartDate"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Start Date
            </InputLabel>
            <Input
               name='sickLeaveStartDate'
               type='date'
               sx={{
                  marginRight: '1rem'
               }}
            />
         </FormControl>
         <FormControl sx={{
            width: '100%',
            marginBottom: '1rem',
            marginLeft: '1rem',
         }}
         focused
         >
            <InputLabel
               htmlFor="sickLeaveEndDate"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               End Date
            </InputLabel>
            <Input
               name='sickLeaveEndDate'
               type='date'
               sx={{
                  marginRight: '1rem'
               }}
            />
         </FormControl>
      </div>
   )
}

export default AddOccupationalHealthEntry