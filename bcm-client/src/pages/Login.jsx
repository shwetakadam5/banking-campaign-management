import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useGlobalAppContext } from "../utils/GlobalAppContext";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//Application specific imports
import { LOGIN } from "../utils/mutations";
import { jwtlogin } from "../utils/jwtAuthentication";

const Login = () => {
  const [state, dispatch] = useGlobalAppContext();

  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    appUserEmail: "",
    appUserPassword: "",
  });

  const [login, { error }] = useMutation(LOGIN);

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const userLoginResponse = await login({
      variables: {
        appUserEmail: loginFormState.appUserEmail,
        appUserPassword: loginFormState.appUserPassword,
      },
    });

    const token = userLoginResponse.data.login.token;
    jwtlogin(token);

    // set the user details on the global context
    dispatch({
      type: "SET_USER",
      payload: userLoginResponse.data.login.appUserDetails,
    });

    //based on user role we can navigate them to the appropriate pages.
    if (userLoginResponse.data.login.appUserDetails.appUserRole === "admin") {
      navigate("/adminHome");
    } else if (
      userLoginResponse.data.login.appUserDetails.appUserRole === "agent"
    ) {
      navigate("/agentHome");
    } else {
      navigate("/customerHome");
    }
  };

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({ ...loginFormState, [name]: value });
  };

  return (
    <div>
      <Heading as="h6"> Login </Heading>
      <form onSubmit={handleLoginFormSubmit}>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
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

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
