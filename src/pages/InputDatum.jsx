import Button from '@mui/material/Button';
import { useHistory  } from "react-router-dom";
const InputDatum = (props) => {
    let history  = useHistory (); 
    const {id,email,name,gender,dateOfBirth,blood,address,expierence,center} = props;
    const routeChange = () =>{
        history.push(`/formInput?id=${id}`);
    }
    return (
        <li>
            <div>
                <h3>{email}</h3>
                <div>Name: {name}</div>
                <div>Gender: {gender}</div>
                <div>DOB: {dateOfBirth}</div>
                <div>Blood Group: {blood}</div>
                <div>Address: {address}</div>
                <div>Expierence: {expierence}</div>
                <div>Centers: {center}</div>
            </div>
            <div>
            <Button onClick={routeChange} variant="outlined">Edit</Button>
            </div>
        </li>);
}
export default InputDatum;
