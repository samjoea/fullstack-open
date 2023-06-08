import React from 'react'
import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const ratings = [0, 1, 2, 3];
const SingleOptionSelector = () => {
   const [rate, setRate] = React.useState<string>('');

   const handleChange = (event: SelectChangeEvent<string>) => {
      setRate(event.target.value);
   };

   return (
      <div>
          <FormControl sx={{
            width: '100%',
            marginBottom: '1rem'
         }}
         >
            <InputLabel sx={{
               marginLeft: '-12px'
            }}
            >
               Health Check Rating
            </InputLabel>
            <Select
               input={<Input />}
               name='healthCheckRating'
               value={rate}
               onChange={handleChange}
               required
            >
               {ratings.map(rating => (
                  <MenuItem key={rating} value={rating}>
                     {rating}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   )
}

export default SingleOptionSelector;