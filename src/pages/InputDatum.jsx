import Button from '@mui/material/Button';
import { useHistory  } from "react-router-dom";
const InputDatum = (props) => {
    let history  = useHistory (); 
    let inputID = props.id;
    const routeChange = () =>{
        history.push(`/formInput?id=${inputID}`);
    }
    return (
        <li>
            <div>
                <h3>{props.email}</h3>
                <div>Name: {props.name}</div>
                <div>Gender: {props.gender}</div>
                <div>DOB: {props.dateOfBirth}</div>
                <div>Blood Group: {props.blood}</div>
                <div>Address: {props.address}</div>
                <div>Expierence: {props.expierence}</div>
                <div>Centers: {props.center}</div>
            </div>
            <div>
            <Button onClick={routeChange} variant="outlined">Edit</Button>
            </div>
        </li>);
}
export default InputDatum;
