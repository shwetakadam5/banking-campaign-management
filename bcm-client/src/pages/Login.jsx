import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { useMutation } from "@apollo/client";
import { LOGIN, SEND_EMAIL } from "../utils/mutations";
import { jwtlogin } from "../utils/jwtAuthentication";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, dispatch] = useGlobalAppContext();
  // console.log(state.authAppUserDetail);
  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    appUserEmail: "",
    appUserPassword: "",
  });

  const [login, { error }] = useMutation(LOGIN);
  const [sendemail, { error: sendemailerr }] = useMutation(SEND_EMAIL);

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(loginFormState);
    console.log("In Handle Form Submit");

    const userLoginResponse = await login({
      variables: {
        appUserEmail: loginFormState.appUserEmail,
        appUserPassword: loginFormState.appUserPassword,
      },
    });
    console.log(userLoginResponse.data);

    const token = userLoginResponse.data.login.token;
    jwtlogin(token);

    dispatch({
      type: "SET_USER",
      payload: userLoginResponse.data.login.appUserDetails,
    });

    // const sendEmailResponse = await sendemail({
    //   variables: {
    //     email: userLoginResponse.data.login.appUserDetails.appUserEmail,
    //   },
    // });

    // console.log(sendEmailResponse.responseMsg);

    navigate("/home");
  };

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({ ...loginFormState, [name]: value });
  };

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleLoginFormSubmit}>
        {sendemailerr ? (
          <div>
            <p className="error-text">Sending email failed</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="appUserEmail"
            type="email"
            id="email"
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="appUserPassword"
            type="password"
            id="pwd"
            onChange={handleLoginFormChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
