import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CalculatorCard = ({calculator}) => {

    return (
        <Card className="clickableCard" 
                sx={{ 
                    borderRadius: '16px',
                    ".cardText": {
                        color: "text.secondary"
                    },
                    "&:hover .cardText": {
                        color: "white"
                    },
                    cursor: 'pointer'
                    }}>
            <CardContent sx={{ m: 1.5 }}>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography> */}
                <Typography variant="h5" sx={{fontWeight:'bold'}} component="div">
                    {calculator.name}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography> */}
                <Typography className="cardText" variant="body2" sx={{ mt: 1.5, fontSize: 18}}>
                    {calculator.description}
                <br />
                {/* {'"a benevolent smile"'} */}
                </Typography>
            </CardContent>
        </Card>
  );
}

export default CalculatorCard;