import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/formInput">Add Data</Link>
          </li>
          <li>
            <Link to="/showData">Edit Data</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
