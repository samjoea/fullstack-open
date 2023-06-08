import React from 'react'
import BaseEntryForm from './BaseEntryForm'
import SingleOptionSelector from './SingleOptionSelector'

const AddHealthCheckEntry = () => {
   return (
      <div>
         <h3>New HealthCheck Entry</h3>
         <BaseEntryForm />
         <SingleOptionSelector />
      </div>
   )
}

export default AddHealthCheckEntry