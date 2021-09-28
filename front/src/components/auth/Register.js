// import toast from "react-hot-toast";
import { clearState, registerUser, userSelector } from "features/UserSlice";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Register() {

  const [register , setRegister] = useState({})

  const { isSuccess, isError, errorMessage, successMessage } = useSelector(userSelector);

  const { password,confirmpassword } =  register;

  const dispatch = useDispatch();

  const history = useHistory()


  const hanldeRegister = (e) =>{

    e.preventDefault();
    if(password === confirmpassword){
      dispatch(registerUser(register));
    }else{
      toast.error('Password not matchers')
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      toast.success(successMessage);
      history.push("/");
    }
  }, [dispatch, errorMessage, history, isError, isSuccess, successMessage]);

  // console.log(register)

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          <Form onSubmit={hanldeRegister}>
            <Form.Group className="my-4">
              <Form.Control
                type="text"
                placeholder="User Name"
                name="username"
                onChange ={(event) =>{
                  setRegister({...register, [event.target.name]: event.target.value})}}
                required
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange ={(event) =>{
                  setRegister({...register, [event.target.name]: event.target.value})}}
                required
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange ={(event) =>{
                  setRegister({...register, [event.target.name]: event.target.value})}}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
          <p>
            Already have an account?
            <Link to="/login">
              <Button variant="info" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
