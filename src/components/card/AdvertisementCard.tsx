import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Advertisement } from '../../config/advertisement-config';



const AdvertisementCard: React.FC<Advertisement> = (ad) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {Object.entries(ad).map(entry => {
          const [key, value] = [...entry]
          return <Typography variant="h6" component="div">
          {`${key}: ${value}`}
        </Typography>
        }) }

      </CardContent>

    </Card>
  );
}

export default AdvertisementCard;