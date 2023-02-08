import Sidebar from '../components/sidebar/Sidebar';
import Widget from '../components/widget/Widget';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const navigateToSubChapter = () => {
    navigate('/createsubchapter');
  }
  return (
    <div className='home'>
      {/* <Sidebar /> */}
      <div className='homeContainer'>
        <div className='widgets'>
          <h2>&#x1f9e0;Neurology/Trauma</h2>
          <div className='buttons'>
            <Button variant='outlined'>Select</Button>
            <Button variant='outlined' onClick={navigateToSubChapter}>
              <AddIcon />
              Create new subchapter
            </Button>
            <Button variant='outlined'>
              <FilterListIcon />
              Filter
            </Button>
          </div>
        </div>
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>
      </div>
    </div>
  );
};

export default Home;
