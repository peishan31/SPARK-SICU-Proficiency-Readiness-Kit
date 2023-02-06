import "./sidebar.css"
import {Link} from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="sidebar"> 
    <div className="center">
        <ul>
          <Link to="/Home" style={{textDecoration: "none", color: "#5D5C5C"}}>
          <li>
              <span className="icon">&#127968;</span>
              <span>Home</span>
          </li>
          </Link>
          <Link to="/Bookmarks" style={{textDecoration: "none", color: "#5D5C5C"}}>
          <li>
              <span className="icon">&#128278;</span>
              <span>Bookmark</span>
          </li>
          </Link>
          <Link to="/Calculators" style={{textDecoration: "none", color: "#5D5C5C"}}>
          <li>
              <span className="icon">&#129518;</span>
              <span>Calculator</span>
          </li>
          </Link>
          <Link to="/Sign%20In" style={{textDecoration: "none", color: "#5D5C5C"}}>
          <li>
              <span className="icon">&#128104;&#8205;&#9877;&#65039;</span>
              <span>Sign In</span>
          </li>
          </Link>
        </ul>
    </div>
    </div>
  )
}

export default Sidebar
