import { createSlice } from "@reduxjs/toolkit";
import * as constants from '../utils/constants';

const inputSlice = createSlice({
    name:'input',
    initialState: constants.defaultInput,
    reducers: {
        name(state,action){
            state.name.value = action.payload.value;
            state.name.error = action.payload.error;
        },
        email(state,action){
            state.email.value = action.payload.value;
            state.email.error = action.payload.error;
        },
        address(state,action){
            state.address.value = action.payload.value;
            state.address.error = action.payload.error;
        },
        blood(state,action){
            state.blood.value = action.payload.value;
            state.blood.error = action.payload.error;
        },
        gender(state,action){
            state.gender.value = action.payload.value;
            state.gender.error = action.payload.error;
        },
        center(state,action){
            state.center.value = action.payload.value;
            state.center.error = action.payload.error;
        },
        expierence(state,action){
            state.expierence.value = action.payload.value;
            state.expierence.error = action.payload.error;
        },
        dateOfBirth(state,action){
            state.dateOfBirth.value = action.payload.value;
            state.dateOfBirth.error = action.payload.error;
        },
        key(state,action){
            state[action.payload.key].error = action.payload.error;
        },
        inputClear(state,action){
           state.name = action.payload.name;
           state.email = action.payload.email;
           state.address = action.payload.address;
           state.blood = action.payload.blood;
           state.center = action.payload.center;
           state.gender = action.payload.gender;
           state.expierence = action.payload.expierence;
           state.dateOfBirth = action.payload.dateOfBirth;

        },
        inputEdit(state,action){
            state.name.value = action.payload.name;
            state.email.value = action.payload.email;
            state.address.value = action.payload.address;
            state.blood.value = action.payload.blood;
            state.center.value = action.payload.center;
            state.gender.value = action.payload.gender;
            state.expierence.value = action.payload.expierence;
            state.dateOfBirth.value = action.payload.dateOfBirth;
        },
    }
});
export const inputActions = inputSlice.actions;
export default inputSlice.reducer;