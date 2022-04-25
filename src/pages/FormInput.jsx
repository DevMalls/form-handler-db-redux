import * as constants from "../utils/constants";
import * as utilities from "../utils/utilities";
import * as MUI from "@mui/material";
import ShowAlert from "../components/built_in/ShowAlert ";
import classes from "./InputForm.module.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { inputActions } from "../store/inputSlice";
import { useDispatch, useSelector } from "react-redux";

const defaultInput = constants.defaultInput;

const InputForm = (props) => {
  const { inputId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const input = useSelector((state) => state);
  const actions = utilities.getAction(inputId);

  useEffect(() => {
    inputId !== null
      ? fetchData()
      : dispatch(inputActions.inputClear(defaultInput));
  }, [props]);

  const fetchData = async () => {
    const response = await fetch(utilities.getSpecificFirebaseURL(inputId));
    const responseData = await response.json().then((responseData)=>{
      dispatch(inputActions.inputEdit(responseData));
    });
    
  };

  const submitHandler = (event) => {
    for (var key in input) {
      if (
        input[key].value === "" ||
        input[key].value === 0 ||
        input[key].value.length === 0
      ) {
        const payload = { key: key, error: true };
        dispatch(inputActions.key(payload));
        return;
      }
    }

    if (utilities.hasNoError(input)) {
      fetch(actions.url, {
        method: actions.method,
        body: JSON.stringify(utilities.getInputs(input)),
      }).then(() => {
        dispatch(inputActions.inputClear(defaultInput));
        history.push("/showData");
      });
    }
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(inputActions.inputClear(defaultInput));
  };
  const nameCheckHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isEmpty(event.target.value),
    };
    dispatch(inputActions.name(payload));
  };
  const emailChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isEmail(event.target.value),
    };
    dispatch(inputActions.email(payload));
  };
  const addressChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isEmpty(event.target.value),
    };
    dispatch(inputActions.address(payload));
  };
  const bloodChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isEmpty(event.target.value),
    };
    dispatch(inputActions.blood(payload));
  };
  const genderChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isEmpty(event.target.value),
    };
    dispatch(inputActions.gender(payload));
  };
  const centerChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isCenter(event.target.value),
    };
    dispatch(inputActions.center(payload));
  };
  const expierenceChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isExpierence(event.target.value),
    };
    dispatch(inputActions.expierence(payload));
  };
  const dateOfBirthChangeHandler = (event) => {
    const payload = {
      value: event.target.value,
      error: utilities.isBirthYear(event.target.value),
    };
    dispatch(inputActions.dateOfBirth(payload));
  };

  return (
    <div>
      <div className={classes.eachInput}>
        <MUI.TextField
          id="name"
          label="Name"
          value={input.name.value}
          onChange={nameCheckHandler}
        />
        {input.name.error && <ShowAlert>Name must not be empty</ShowAlert>}
      </div>

      <div className={classes.eachInput}>
        <MUI.TextField
          id="email"
          label="Email"
          value={input.email.value}
          onChange={emailChangeHandler}
        />
        {input.email.error && (
          <ShowAlert>Please enter a valid email address</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <MUI.TextareaAutosize
          id="address"
          placeholder="Address"
          aria-label="minimum height"
          minRows={3}
          style={{ width: 225 }}
          value={input.address.value}
          onChange={addressChangeHandler}
        />
        {input.address.error && (
          <ShowAlert>Address must not be empty</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <MUI.InputLabel id="blood-group">Blood Group</MUI.InputLabel>
        <MUI.Select
          id="blood-group"
          label="Blood Group"
          sx={{ m: 1, minWidth: 220 }}
          labelId="blood-group"
          value={input.blood.value}
          onChange={bloodChangeHandler}
        >
          {constants.listOfBloods.map((bloodGroup) => (
            <MUI.MenuItem key={bloodGroup} value={bloodGroup}>
              {bloodGroup}
            </MUI.MenuItem>
          ))}
        </MUI.Select>
        {input.blood.error && (
          <ShowAlert>Please select your blood Group</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <MUI.FormLabel id="gender">Gender</MUI.FormLabel>
        <MUI.RadioGroup
          row
          name="gender"
          aria-labelledby="gender"
          value={input.gender.value}
          onChange={genderChangeHandler}
        >
          {constants.listOfGenders.map((gender) => (
            <MUI.FormControlLabel
              key={gender}
              value={gender}
              control={<MUI.Radio />}
              label={gender}
            />
          ))}
        </MUI.RadioGroup>
        {input.gender.error && <ShowAlert>Please select your Gender</ShowAlert>}
      </div>

      <div className={classes.eachInput}>
        <MUI.InputLabel id="exam-center">Exam Center</MUI.InputLabel>
        <MUI.Select
          id="exam-center"
          labelId="exam-center"
          sx={{ m: 1, minWidth: 220 }}
          multiple
          value={input.center.value}
          onChange={centerChangeHandler}
        >
          {constants.listOfCenters.map((centerName) => (
            <MUI.MenuItem key={centerName} value={centerName}>
              {centerName}
            </MUI.MenuItem>
          ))}
        </MUI.Select>
        {input.center.error && (
          <ShowAlert>Please select only 2 centers</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <MUI.TextField
          id="expierence"
          label="Expierence (No of years)"
          type="number"
          value={input.expierence.value}
          onChange={expierenceChangeHandler}
        />
        {input.expierence.error && (
          <ShowAlert>You should have atleast 2 years expierence</ShowAlert>
        )}
      </div>

      <div className={classes.eachInput}>
        <MUI.FormLabel id="dateOfBirth">Date of Birth </MUI.FormLabel>
        <MUI.TextField
          id="dateOfBirth"
          type="date"
          sx={{ width: 220 }}
          value={input.dateOfBirth.value}
          onChange={dateOfBirthChangeHandler}
        />
        {input.dateOfBirth.error && (
          <ShowAlert >Birth Year must be before 2022</ShowAlert>
        )}
      </div>

      <MUI.Stack direction="row" spacing={2}>
        <MUI.Button variant="outlined" onClick={cancelHandler}>
          Cancel
        </MUI.Button>
        <MUI.Button variant="contained" onClick={submitHandler}>
          {actions.value}
        </MUI.Button>
      </MUI.Stack>
    </div>
  );
};
export default InputForm;
