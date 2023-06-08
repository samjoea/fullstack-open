import React from 'react'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { healthCheckRatingToColor } from '../../utils/helper';
import { Entry } from '../../types';

const HealthCheckRatingIcon = ({ entry }: { entry: Entry }): React.JSX.Element | null => {
   if ('healthCheckRating' in entry) {
      return (
         <div>
             {
               <p>
                  <FavoriteSharpIcon sx={{
                     color: healthCheckRatingToColor(entry.healthCheckRating),
                  }} />
               </p> 
         }
         </div>
      )
   }
   return null;
}

export default HealthCheckRatingIcon;