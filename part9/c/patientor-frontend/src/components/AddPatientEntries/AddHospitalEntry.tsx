import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'
import BaseEntryForm from './BaseEntryForm'

const AddHospitalEntry = () => {
   return (
      <div>
         <h3>New Hospital Entry</h3>
         <BaseEntryForm />
         <h3>Discharge</h3>
         <FormControl sx={{
            width: '100%',
            marginBottom: '1rem',
            marginLeft: '1rem',
         }}
         focused
         >
            <InputLabel
               htmlFor="dischargeDate"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Date
            </InputLabel>
            <Input
               name='dischargeDate'
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
         >
            <InputLabel
               htmlFor="dischargeCriteria"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Criteria
            </InputLabel>
            <Input
               name='dischargeCriteria'
               sx={{
                  marginRight: '1rem'
               }}
            />
         </FormControl>

      </div>
   )
}

export default AddHospitalEntry