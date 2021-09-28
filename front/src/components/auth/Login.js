import { clearState, loginUser, userSelector } from "features/UserSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const { isSuccess, isError, errorMessage, successMessage } = useSelector(userSelector);

  // isFetching,
  const dispatch = useDispatch();

  const history = useHistory();

  const [login, setLogin] = useState({
    username: "khoe.le.hutech@gmail.com",
    password: "Louisle@9991",
  });

  const { username, password } = login;

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(login));
  };

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

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          <Form onSubmit={handleLogin}>
            <Form.Group className="my-4">
              <Form.Control
                type="text"
                placeholder="User Name"
                name="username"
                required
                value={username}
                onChange={(event) =>
                  setLogin({
                    ...login,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(event) =>
                  setLogin({
                    ...login,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Login{" "}
            </Button>
          </Form>
          <p>
            Don't have account ?
            <Link to="/register">
              <Button variant="info" size="sm" className="ml-2">
                Register
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
