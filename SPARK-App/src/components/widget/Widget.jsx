import "./widget.css";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Widget = ({ type }) => {
  let data;

switch (type) {
    case "user":
        data = {
            title: "Management of Raised Intracranial Pressure",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            link: "/about",
            image: "../../src/handbook1.jpg",
        };
        break;
        case "order":
            data = {
                title: "Severe TBI Management",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                link: "/about",
                image: "../../src/handbook2.jpg",
            };
            break;
            case "earning":
                data = {
                    title: "Barbiturate coma protocol",
                    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    link: "/about",
                    image: "../../src/handbook3.jpg",
                };
                break;
                case "balance":
                    data = {
                        title: "SAH (aneurysm, AVM)",
                        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                        link: "/about",
                        image: "../../src/handbook4.jpg",
                    };
                    break;
               default:
                    break;
}

    return (
        <Card className="clickableCard" sx={{ maxWidth: 345 }}>
            <Link to={data.link} className="nav-link">
            <CardMedia
                sx={{ height: 140 }}
                image={data.image}
                title="image name"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography variant="body2">
                    {data.desc}
                </Typography>
            </CardContent>
            </Link>
        </Card> 
    );

}

export default Widget
