import Card from "../UI/Card";
import { useLocation } from "react-router-dom";
import FormInput from "./FormInput";

const Form = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const params = queryParam.get("id");

  return (
    <Card>
      <h2>Fill the Details:</h2>
      <FormInput inputId={params} />
    </Card>
  );
};
export default Form;
