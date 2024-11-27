import { Alert } from "react-bootstrap";
import classes from "./CustomAlert.module.scss";

const CustomAlert = ({ error }: { error: string }) => {
  return <>{error && <Alert className={classes.alert}>{error}</Alert>}</>;
};

export default CustomAlert;
