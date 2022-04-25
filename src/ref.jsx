import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';

import React, { useEffect, useReducer, useState } from 'react';
import classes from './InputForm.module.css';
import { Redirect } from 'react-router-dom';
import * as constClass from '../utils/constants';
const defaultInputState = {
    name: '',
    email: '',
    address: '',
    bg:'',
    center: [],
    gender:'',
    expierence: 0,
    dob: ''
};
const defaultValidateState = {
    name: false,
    email: false,
    address: false,
    bg:false,
    center: false,
    gender: false,
    expierence: false,
    dob: false
};
const InputForm = (props) => {
    const [data,setData] = useState(defaultInputState);
    const buttonValue = (props.inputId  !== null ) ?  "Update" : "Add";
    
    useEffect(() => { 
        if(props.inputId  !== null ){
        fetchData()
        }
        else if(props.inputId  === null){
            dispatchState({type:'LOAD'})
        }
    },[props]);
    const fetchData = async () => {
        const response = await fetch(`https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs/${props.inputId}.json`);
        const responseData = await response.json();
        console.log("🚀 ~ file: InputForm.jsx ~ line 102 ~ fetchData ~ responseData", responseData)
        setData(responseData);        
        dispatchState({type:'EDIT', ...data});        
    }

    const inputReducerFunction = (state,action) =>{
       switch(action.type){
        case "NAME":
            return {
                ...state,
                name:action.name};
        case "EMAIL":
            return {
                ...state,
                email:action.email};
        case "ADDRESS":
            return {
                ...state,
                address:action.address};  
        case "BG":
            return {
                ...state,
                bg:action.bg};    
        case "CENTER":
            return {
                ...state,
                center:action.center}; 
        case "GENDER":
            return {
                ...state,
                gender:action.gender};     
        case "EXPIERENCE":
            return {
                ...state,
                expierence:action.expierence};   
        case "DOB":
            return {
                ...state,
                dob:action.dob}; 
        case "EDIT":
            return{
              ...data
            }
        default: 
            return defaultInputState;
       }   
    }
    const validateReducerFunction = (state,action) => {
        switch(action.type){
            case "NAME_CHECK":
                return {
                    ...state,
                    name:action.name};
            case "EMAIL_CHECK":
                return {
                    ...state,
                     email:action.email};
            case "ADDRESS_CHECK":
                return {
                    ...state,
                     address:action.address};
            case "CENTER_CHECK":
                return {
                    ...state,
                     center:action.center}; 
             case "GENDER_CHECK":
                return {
                    ...state,
                    gender:action.gender};  
            case "EXPIERENCE_CHECK":
                return {
                    ...state,
                    expierence:action.expierence};      
            case "DOB_CHECK":
                return {
                    ...state,
                    dob:action.dob};        
            default:
                return defaultValidateState;        
        }
    }
    const validate = (inputValue,inputType) => {
        
                
        }
    }
    const [inputState, dispatchState] = useReducer(inputReducerFunction, defaultInputState); 
    const [validateState, dispatchValidate] = useReducer(validateReducerFunction, defaultValidateState);                     
    const nameChangeHandler = (event) =>{

        dispatchState({type:'NAME',name: event.target.value});

        if(event.target.value.length >= 10){
            dispatchValidate({type:'NAME_CHECK',name: true});  
        }
        else if(event.target.value.length <= 10){
            dispatchValidate({type:'NAME_CHECK',name: false});  
        }

    }
    const emailChangeHandler = (event) =>{        
        dispatchState({type:'EMAIL',email: event.target.value});
        if(!(event.target.value).includes('@')){
            dispatchValidate({type:'EMAIL_CHECK',email: true});  
        }
        else{
            dispatchValidate({type:'EMAIL_CHECK',email: false});  
        }
    }
    const addressChangeHandler = (event) =>{      
        dispatchState({type:'ADDRESS',address: event.target.value})
        if((event.target.value).length >= 20){
            dispatchValidate({type:'ADDRESS_CHECK',address: true});  
        }
        else if((event.target.value).length <= 10){
            dispatchValidate({type:'ADDRESS_CHECK',address: false});  
        }
    }
    const bgChangeHandler = (event) =>{
        dispatchState({type:'BG',bg: event.target.value})
    }
    const ecChangeHandler = (event) =>{
        dispatchState({type:'CENTER',center: event.target.value})
        if((event.target.value).length !== 2 ){
            dispatchValidate({type:'CENTER_CHECK',center: true});  
        }
        else{
            dispatchValidate({type:'CENTER_CHECK',center: false});  
        } 
    }
    const genderChangeHandler = (event) =>{
        dispatchState({type:'GENDER',gender: event.target.value})
    }
    const expierenceChangeHandler = (event) =>{
        dispatchState({type:'EXPIERENCE',expierence: event.target.value})
        let year =event.target.value;
        year = + year;
        if(year <= 1){
            dispatchValidate({type:'EXPIERENCE_CHECK',expierence: true});  
        }
        else if(year >= 1 ){
            dispatchValidate({type:'EXPIERENCE_CHECK',expierence: false});  
        }
    }
    const dobChangeHandler = event =>{
        dispatchState({type:'DOB',dob: event.target.value})
        let dateOfYear = new Date(event.target.value);
        dateOfYear = dateOfYear.getFullYear();
        if(dateOfYear > 2021){
            dispatchValidate({type:'DOB_CHECK',dob: true});  
        }
        else if(dateOfYear < 2021){
            dispatchValidate({type:'DOB_CHECK',dob: false});  
        }
    }
    const [prompt,setPrompt] = useState(null);
    const formAddHandler = event =>{
        event.preventDefault();
        if(Object.values(validateState).includes(true)){
           setPrompt(true);
        }
        else{           
            console.log(validateState);
            fetch('https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs.json',{
                method:'POST',
                body:JSON.stringify(inputState)
            });
            dispatchState({type:'RESET'});
            dispatchValidate({type:'RESET'});
            setPrompt(false);
            
        }
    }
    const formUpdateHandler = event =>{
        event.preventDefault();
        if(Object.values(validateState).includes(true)){
            setPrompt(true);
         }
         else{
            fetch(`https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs/${props.inputId}.json`,{
                method:'PUT',
                body:JSON.stringify(inputState)
            });
            dispatchState({type:'RESET'});
            dispatchValidate({type:'RESET'});
            setPrompt(false);
         }
    }
    const cancelHandler = event =>{
        event.preventDefault();
        dispatchState({type:'RESET'});
        dispatchValidate({type:'RESET'});
    }
    return (
         <div> 
            <div className={classes.eachInput} >
                    <TextField
                        required
                        id="name"
                        label="Name"
                        onChange={nameChangeHandler}
                        value={inputState.name }
                    />
                    {validateState.name  &&  <p>Your Name is too long</p>}
                    </div>
                    <div className={classes.eachInput} >
                    <TextField
                        required
                        id="email"
                        label="Email"
                        onChange={emailChangeHandler}
                        value={inputState.email}
                    />
                    { validateState.email &&  <p>Please enter a valid email addres</p>}
                    </div>
                    <div className={classes.eachInput} >
                    <TextareaAutosize
                        required
                        id="address"
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Address"
                        style={{ width: 225 }}     
                        onChange={addressChangeHandler}
                        value={inputState.address }
                        />
                    {validateState.address &&  <p>Your address is too long</p>}
                    </div>
                    <div className={classes.eachInput}>
                    <InputLabel id="blood-group">Blood Group</InputLabel>
                        <Select sx={{ m: 1, minWidth: 220 }}
                            required
                            labelId="blood-group"
                            id="blood-group"
                            label="Blood Group"
                            defaultValue="O+ve"
                            onChange={bgChangeHandler}
                            value={inputState.bg }
                        >
                            {constClass.listOfBloods.map((bloodGroup) => (
                            <MenuItem
                            key={bloodGroup}
                            value={bloodGroup}
                            >
                            {bloodGroup}
                            </MenuItem>
                        ))}
                        </Select>
                    </div>
                    <div className={classes.eachInput}>
                    <InputLabel id="exam-center">Exam Center</InputLabel>
                    <Select  sx={{ m: 1, minWidth: 220 }}
                            required
                            multiple
                            labelId="exam-center"
                            id="exam-center"
                            onChange={ecChangeHandler}
                            value={inputState.center }
                        >
                         {constClass.listOfCenters.map((centerName) => (
                            <MenuItem
                            key={centerName}
                            value={centerName}
                            >
                            {centerName}
                            </MenuItem>
                        ))}
                        </Select>
                    {validateState.center && <p>Must select 2 centers only</p>}
                    </div>
                    <div className={classes.eachInput}>
                        <FormControl>
                            <FormLabel id="gender">Gender</FormLabel>
                                <RadioGroup 
                                    row
                                    aria-labelledby="gender"
                                    name="gender"
                                    onChange={genderChangeHandler}
                                    value={inputState.gender }
                                >
                                {constClass.listOfGenders.map((gender) => (
                                   <FormControlLabel
                                   key={gender}
                                   value={gender}
                                   control={<Radio />}
                                   label={gender}
                                   />
                               ))}
                                </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={classes.eachInput} >
                    <TextField  
                        required
                        type='number'
                        id="expierence"
                        label="Working Expierence"
                        onChange={expierenceChangeHandler}
                        value={inputState.expierence }
                    />
                     {validateState.expierence &&  <p>Atleast have 2 years expierence.</p>}
                    </div>
                    <div className={classes.eachInput}>
                    <div>
                    <FormLabel id="dob">DOB</FormLabel>
                    </div>
                        <TextField
                                required
                                type="date"
                                id="dob"
                                sx={{ width: 220 }}
                                onChange={dobChangeHandler}
                                value={inputState.dob }
                        />
                        {validateState.dob &&  <p>Date of Year should have before 2021.</p>}
                    </div>
                 <Stack direction="row" spacing={2}>
                    <Button  onClick={cancelHandler} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={buttonValue === "Add" ? formAddHandler : formUpdateHandler }   variant="contained">
                    {buttonValue}
                    </Button>
                </Stack>
            {prompt === true && Object.values(validateState).includes(true) && <Alert variant="filled" severity="error">Something went wrong in input field!</Alert>}
            {prompt === false && Object.values(validateState).includes(false) && <Redirect to='/showData'/> }
         </div>   
    );
};
export default InputForm;