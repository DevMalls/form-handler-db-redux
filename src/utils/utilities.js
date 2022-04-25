import * as constants from "../utils/constants";
export const isEmpty = (value) => value.trim() === '';
export const isEmail = (value) => !value.includes('@');
export const isCenter = (value) => value.length !==2;
export const isExpierence = (value) => +value <= 1 ;

export const isBirthYear = (value) => {
    const birthYear = new Date(value);
    return birthYear.getFullYear() > 2021 };

export const hasNoError = (value) => {
    const returnValue =((Object.values(value)).every((value)=>{return value.error === false}));
   return returnValue;
};

export const getInputs = (inputs) =>{
    return {
      name: inputs.name.value,
      email: inputs.email.value,
      address: inputs.address.value,
      blood: inputs.blood.value,
      gender: inputs.gender.value,
      center: inputs.center.value,
      expierence: inputs.expierence.value,
      dateOfBirth: inputs.dateOfBirth.value,
    }
}
export const getSpecificFirebaseURL = (id) => `https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs/${id}.json`;

export const getAction = (inputId) => {
    if(inputId  !== null) {
        return { 
            url: getSpecificFirebaseURL(inputId),
            method:constants.putMethod ,
            value:constants.update }
    }
return { 
    url: constants.firebaseInputURL ,
    method:constants.postMethod,
    value:constants.add }
}

export const getPayload = (value,error) => {
    return {
        value: value,
        error: error,
      };
}