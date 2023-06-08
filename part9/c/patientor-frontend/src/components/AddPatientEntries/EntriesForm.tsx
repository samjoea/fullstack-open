import React from 'react'
import { assertNever } from '../../utils/helper'
import AddHealthCheckEntry from './AddHealthCheckEntry'
import AddOccupationalHealthEntry from './AddOccupationalHealthEntry'
import AddHospitalEntry from './AddHospitalEntry'

const EntriesForm = ({ entryType }: { entryType: 'healthCheck' | 'occupationalHealthCare' | 'hospital' }): React.JSX.Element => {
   switch (entryType) {
      case 'healthCheck':
         return (
            <AddHealthCheckEntry />
         )
      case 'occupationalHealthCare':
         return (
            <AddOccupationalHealthEntry />
         )
      case 'hospital':
         return (
            <AddHospitalEntry />
         )
      default: return assertNever(entryType);
   }
}

export default EntriesForm;