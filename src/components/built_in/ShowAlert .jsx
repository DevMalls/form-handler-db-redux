import Alert from '@mui/material/Alert';
const ShowAlert = (props) => {
    return <div>
        <Alert variant="filled"severity="error" sx={{ height: 50, width: 300 }} >{props.children}</Alert>
    </div>
}
export default ShowAlert;