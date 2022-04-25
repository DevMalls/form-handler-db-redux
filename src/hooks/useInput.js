import { useReducer } from "react";
import * as constants from '../utils/constants';
import * as utilities from '../utils/utilities';

const inputReducerFunction = (state, action) => {
    switch(action.type){
        case constants.name:
            return {
                ...state,
                name:{value:action.value,error:action.error}};
        case constants.email:
            return {
                ...state,
                email:{value:action.value,error:action.error}};
        case constants.address:
            return {
                ...state,
                address:{value:action.value,error:action.error}};  
        case constants.blood:
            return {
                ...state,
                blood:{value:action.value,error:action.error}};    
        case constants.center:
            return {
                ...state,
                center:{value:action.value,error:action.error}}; 
        case constants.gender:
            return {
                ...state,
                gender:{value:action.value,error:action.error}};     
        case constants.expierence:
            return {
                ...state,
                expierence:{value:action.value,error:action.error}};   
        case constants.dateOfBirth:
            return {
                ...state,
                dateOfBirth:{value:action.value,error:action.error}}; 
        case constants.edit:
            return {
                name:{value:action.name,error:false},
                email:{value:action.email,error:false},
                address:{value:action.address,error:false},
                blood:{value:action.blood,error:false},
                center:{value:action.center,error:false},
                gender:{value:action.gender,error:false},
                expierence:{value:action.expierence,error:false},
                dateOfBirth:{value:action.dateOfBirth,error:false}};      
        default: 
            return constants.defaultInput;
       }   
        
}
const useInput = () => {
    const [input, dispatch] = useReducer(inputReducerFunction, constants.defaultInput); 
    const inputNameHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isEmpty(event.target.value)}
        dispatch({type:constants.name,...payload});  
    }
    const inputEmailHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isEmail(event.target.value)}
        dispatch({type:constants.email,...payload});  
    }
    const inputAddressHandler = (event) =>{
        console.log("Address",event);
        const payload = {value:event.target.value,error:utilities.isEmpty(event.target.value)}
        dispatch({type:constants.address,...payload});  
    }
    const inputBloodGroupHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isEmpty(event.target.value)}
        dispatch({type:constants.blood,...payload});  
    }
    const inputGenderHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isEmpty(event.target.value)}
        dispatch({type:constants.gender,...payload});  
    }
    const inputCenterHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isCenter(event.target.value)}
        dispatch({type:constants.center,...payload});  
    }
    const inputExpierenceHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isExpierence(event.target.value)}
        dispatch({type:constants.expierence,...payload});  
    }
    const inputDateOfBirthHandler = (event) =>{
        const payload = {value:event.target.value,error:utilities.isBirthYear(event.target.value)}
        dispatch({type:constants.dateOfBirth,...payload});  
    }
    const clearInputs = (event) =>{
        dispatch({type:constants.clear});  
    }
    const editInputs = (data) =>{
        dispatch({type:constants.edit,...data}); 
        console.log(input);
    }
    return {
        inputs:input,
        inputNameHandler,
        inputEmailHandler,
        inputAddressHandler,
        inputBloodGroupHandler,
        inputGenderHandler,
        inputCenterHandler,
        inputExpierenceHandler,
        inputDateOfBirthHandler,
        clearInputs,
        editInputs,
    };
}
export default useInput;