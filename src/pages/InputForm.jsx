import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import classes from "./InputForm.module.css";
import * as constants from "../utils/constants";
import * as utilities from "../utils/utilities";
import useInput from "../hooks/useInput";
import ShowAlert from "../components/built_in/ShowAlert ";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const InputForm = (props) => {
  const history = useHistory();
  const {
    inputs: inputValues,
    inputNameHandler: nameChangeHandler,
    inputEmailHandler: emailChangeHandler,
    inputAddressHandler: addressChangeHandler,
    inputBloodGroupHandler: bloodGroupChangeHandler,
    inputGenderHandler: genderChangeHandler,
    inputCenterHandler: centerChangeHandler,
    inputExpierenceHandler: expierenceChangeHandler,
    inputDateOfBirthHandler: dateOfBirthChangeHandler,
    clearInputs: cancelClearHandler,
    editInputs: editHandler,
  } = useInput();
  const actions = utilities.getAction(props.inputId);
  const [loadInput, setloadInput] = useState({});
  useEffect(() => {
    if (props.inputId !== null) fetchData();
    else if (props.inputId === null) cancelClearHandler();
  }, [props]);

  const fetchData = async () => {
    const response = await fetch(
      `https://form-inputs-8f8ee-default-rtdb.firebaseio.com/inputs/${props.inputId}.json`
    );
    const responseData = await response.json();
    // console.log("🚀 ~ file: InputForm.jsx ~ line 102 ~ fetchData ~ responseData", responseData)
    editHandler(responseData);
  };

  const submitHandler = (event) => {
    for (const load in inputValues) {
      const key = load;
      setloadInput(Object.assign((loadInput[key] = inputValues[load].value)));
    }

    for (var key in loadInput) {
      if (
        loadInput[key] === "" ||
        loadInput[key] === 0 ||
        loadInput[key].length === 0
      ) {
        inputValues[key].error = true;
        return;
      }
    }

    if (utilities.hasNoError(inputValues)) {
      fetch(actions.url, {
        method: actions.method,
        body: JSON.stringify(loadInput),
      }).then(() => {
        cancelClearHandler();
        setloadInput({});
        history.push("/showData");
      });
    }
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    cancelClearHandler();
  };
  return (
    <div>
      <div className={classes.eachInput}>
        <TextField
          id="name"
          label="Name"
          value={inputValues.name.value}
          onChange={nameChangeHandler}
        />
        {inputValues.name.error && (
          <ShowAlert>Name must not be empty</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <TextField
          id="email"
          label="Email"
          value={inputValues.email.value}
          onChange={emailChangeHandler}
        />
        {inputValues.email.error && (
          <ShowAlert>Please enter a valid email address</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <TextareaAutosize
          id="address"
          placeholder="Address"
          aria-label="minimum height"
          minRows={3}
          style={{ width: 225 }}
          value={inputValues.address.value}
          onChange={addressChangeHandler}
        />
        {inputValues.address.error && (
          <ShowAlert>Address must not be empty</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <InputLabel id="blood-group">Blood Group</InputLabel>
        <Select
          id="blood-group"
          label="Blood Group"
          sx={{ m: 1, minWidth: 220 }}
          labelId="blood-group"
          value={inputValues.blood.value}
          onChange={bloodGroupChangeHandler}
        >
          {constants.listOfBloods.map((bloodGroup) => (
            <MenuItem key={bloodGroup} value={bloodGroup}>
              {bloodGroup}
            </MenuItem>
          ))}
        </Select>
        {inputValues.blood.error && (
          <ShowAlert>Please select your blood Group</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          aria-labelledby="gender"
          value={inputValues.gender.value}
          onChange={genderChangeHandler}
        >
          {constants.listOfGenders.map((gender) => (
            <FormControlLabel
              key={gender}
              value={gender}
              control={<Radio />}
              label={gender}
            />
          ))}
        </RadioGroup>
        {inputValues.gender.error && (
          <ShowAlert>Please select your Gender</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <InputLabel id="exam-center">Exam Center</InputLabel>
        <Select
          id="exam-center"
          labelId="exam-center"
          sx={{ m: 1, minWidth: 220 }}
          multiple
          value={inputValues.center.value}
          onChange={centerChangeHandler}
        >
          {constants.listOfCenters.map((centerName) => (
            <MenuItem key={centerName} value={centerName}>
              {centerName}
            </MenuItem>
          ))}
        </Select>
        {inputValues.center.error && (
          <ShowAlert>Please select only 2 centers</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <TextField
          id="expierence"
          label="Expierence (No of years)"
          type="number"
          value={inputValues.expierence.value}
          onChange={expierenceChangeHandler}
        />
        {inputValues.expierence.error && (
          <ShowAlert>You should have atleast 2 years expierence</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <FormLabel id="dateOfBirth">Date of Birth </FormLabel>
        <TextField
          id="dateOfBirth"
          type="date"
          sx={{ width: 220 }}
          value={inputValues.dateOfBirth.value}
          onChange={dateOfBirthChangeHandler}
        />
        {inputValues.dateOfBirth.error && (
          <ShowAlert sc>Birth of Year must be before 2022</ShowAlert>
        )}
      </div>

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button variant="contained" onClick={submitHandler}>
          {actions.value}{" "}
        </Button>
      </Stack>
    </div>
  );
};
export default InputForm;
