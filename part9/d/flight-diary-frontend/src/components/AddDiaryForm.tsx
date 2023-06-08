import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { createNewDiary } from '../service';
import { FormValues } from '../types';
import axios from 'axios';

const AddDiaryForm = () => {
   const queryClient = useQueryClient();
   const [errorMessages, setErrorMessages] = useState<string>(''); // ['Date is required', 'Visibility is required'
   const addDiary = useMutation({
      mutationFn: createNewDiary,
      onSuccess: (apiData) => {
         queryClient.invalidateQueries(['diaries']);
         console.log('Success: ', apiData)
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            setErrorMessages(error.response?.data);
         }
      }
   })

   useEffect(() => {
      setTimeout(() => {
         setErrorMessages('');
      }, 3000);
   }, [errorMessages]);

   const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & FormValues
      const { date, visibility, weather, comment } = target;
      addDiary.mutate({
         date: date.value,
         visibility: visibility.value,
         weather: weather.value,
         comment: comment.value
      })
      if (addDiary.status === 'success') {
         target.dispatchEvent(new Event('reset'));
      }
   };

   const hideErrorMessages = !errorMessages ? 'none' : 'block';

   return (
      <div>
         <h2>Add New Entry</h2>
         <h3 style={{ color: 'red', display: hideErrorMessages }}>{errorMessages}</h3>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="date">Date:</label>
               <input
                  type="date"
                  id="date"
                  name="date"
                  required
               />
            </div>
            <br />
            <div>
               <label htmlFor="visibility">Visibility: </label>
               {
                  visibilityOptions.map((option, index) => (
                     <React.Fragment key={index}>
                        <input
                           type="radio"
                           id={option}
                           name="visibility"
                           value={option}
                           required
                        />
                        <label htmlFor={option}>{option}</label>
                     </React.Fragment>
                  ))
               }
            </div>
            <br />
            <div>
               <label htmlFor="weather">Weather: </label>
               {
                  weatherOptions.map((option, index) => (
                     <React.Fragment key={index}>
                        <input
                           type="radio"
                           id={option}
                           name="weather"
                           value={option}
                           required
                        />
                        <label htmlFor={option}>{option}</label>
                     </React.Fragment>
                  ))
               }
            </div>
            <br />
            <label htmlFor="comment">Comment:</label>
            <input
               type="text"
               id="comment"
               name="comment"
               required
            />
            <br />
            <button type="submit">Add</button>
         </form>
      </div>
   )
}

const visibilityOptions = ['great', 'good', 'ok', 'poor'];
const weatherOptions = ['sunny', 'cloudy', 'rainy', 'stormy', 'windy'];

export default AddDiaryForm;