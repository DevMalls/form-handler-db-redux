import Card from "../UI/Card";
import { useLocation } from 'react-router-dom';
import FormInput from "./FormInput";
// import InputForm from "./InputForm";


const Form = (props) =>{
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const params = queryParam.get('id');
    // console.log(params);
    return (
        <Card>
            <h2>Fill the Details:</h2>
            {/* <InputForm inputId={params}/> */}
            <FormInput inputId={params}/>
        </Card>
    );
}
export default Form;