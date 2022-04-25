export const listOfCenters = ['Chennai','Madurai','Sattur','Theni','Ooty'];
export const listOfBloods = ['O+ve','O-ve','A+ve','A-ve','B+ve','B-ve','AB+ve','AB-ve',];
export const listOfGenders = ['Female','Male',];
export const defaultInput = {
    name: {value: '', error:false},
    email: {value: '', error:false},
    address: {value: '',error:false},
    blood: {value: '', error:false},
    gender: {value: '', error:false},
    center: {value: [], error:false},
    expierence: {value: 0, error:false},
    dateOfBirth: {value: '', error:false}
};
export const firebaseInputURL = `https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs.json`;
export const putMethod = 'PUT';
export const postMethod = 'POST';
export const update = 'Update';
export const add = 'Add';