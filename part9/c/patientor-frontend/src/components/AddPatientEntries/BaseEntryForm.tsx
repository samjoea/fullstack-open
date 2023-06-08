import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react'
import MultiOptionsSelect from './MultiOptionsSelect';

const codes = [
   "H35.29",
   "S62.5",
   "M24.2",
   "M51.2",
   "S03.5",
   "J10.1",
   "J06.9",
   "Z57.1",
   "N30.0",
   "H54.7",
   "J03.0",
   "L60.1",
   "Z74.3",
   "L20",
   "F43.2",
]

const BaseEntryForm = () => {
   return (
      <div>
         <FormControl
            sx={{
               width: '100%',
               marginBottom: '1rem',
               marginTop: '1rem'
            }}
            focused
         >
            <InputLabel
               htmlFor="date"
               sx={{
                  marginLeft: '-12px',
               }}
            >
               Date
            </InputLabel>
            <Input
               name='date'
               type='date'
               placeholder='Date'
               required
            />
         </FormControl>
         <FormControl
            sx={{
               width: '100%',
               marginBottom: '1rem'
            }}
         >
            <InputLabel
               htmlFor="description"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Description
            </InputLabel>
            <Input
               name='description'
               required
            />
         </FormControl>
         <FormControl sx={{
            width: '100%',
            marginBottom: '1rem'
         }}>
            <InputLabel
               htmlFor="specialist"
               sx={{
                  marginLeft: '-12px'
               }}
            >
               Specialist
            </InputLabel>
            <Input
               name='specialist'
               required
            />
         </FormControl>
         <MultiOptionsSelect
            data={codes}
            label='Diagnosis Codes'
            id='diagnosisCodes'
         />
      </div>
   )
}

export default BaseEntryForm;