import { FormControl, InputLabel, Select, Input, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

interface MultiOptionsSelectProps {
   data: string[];
   id: string;
   label: string;
}

const MultiOptionsSelect = ({ data, id, label }: MultiOptionsSelectProps) => {
   const [codeValues, setCodeValues] = React.useState<string[]>([]);

   const handleChange = (event: SelectChangeEvent<string[]>) => {
      const { value } = event.target;
      setCodeValues(
         typeof value === 'string' ? value.split(',') : value,
      );
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
               {label}
            </InputLabel>
            <Select
               id={id}
               name={id}
               multiple
               value={codeValues}
               onChange={handleChange}
               input={<Input />}
               MenuProps={MenuProps}
            >
               {data.map((item) => (
                  <MenuItem
                     key={item}
                     value={item}
                  >
                     {item}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   )
}

export default MultiOptionsSelect;