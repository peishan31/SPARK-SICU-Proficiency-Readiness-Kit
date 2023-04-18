import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CalculatorCard = ({calculator}) => {

    return (
        <Card className="clickableCard" 
                sx={{ 
                    borderRadius: '16px',
                    ".calculatorCardText": {
                        color: "text.secondary"
                    },
                    "&:hover .calculatorCardText": {
                        color: "white"
                    },
                    cursor: 'pointer'
                    }}>
            <CardContent sx={{ m: 1.5 }}>
                <Typography variant="h5" sx={{fontWeight:'bold'}} component="div">
                    {calculator.name}
                </Typography>
                <Typography variant="body2" className="calculatorCardText"  sx={{ mt: 1.5, fontSize: 18}}>
                    {calculator.description}
                <br />
                </Typography>
            </CardContent>
        </Card>
  );
}

export default CalculatorCard;