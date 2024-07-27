//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//import the specific query we'd like to perform from our queries.js utility
import { QUERY_APPUSERS } from "../utils/queries";

//Importing the global context related files.
import { useGlobalAppContext } from "../utils/GlobalAppContext";

import AppUserList from "../components/AppUserList";

// Import our action
import { TOGGLE_THEME } from "../utils/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useEffect } from "react";

const Home = () => {
  // Extracting the context details
  const [state, dispatch] = useGlobalAppContext();
  //dispatch({ type: TOGGLE_THEME, payload: state.darkTheme }); //(Call a dispatch option to modify the state)

  console.log(state);
  console.log(dispatch);

  //We pass the query we'd like to execute on component load to the useQuery hook
  const { loading, data, error } = useQuery(QUERY_APPUSERS);

  //use the optional chaining operator to get the resulting profile from our query, or fallback to an empty object if the query isn't resolved yet
  const appUsers = data?.appUsers || [];

  useEffect(() => {
    toast.success("Welcome!", {
      autoClose: 2000, // milliseconds
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Home </h1>
      <button
        id="button"
        // To change the theme we invoke dispatch and pass in an object containing action type and payload
        onClick={() =>
          dispatch({ type: TOGGLE_THEME, payload: state.darkTheme })
        }
        className="btn btn-secondary"
        type="button"
      >
        Toggle dark theme
      </button>
      <section className="text-center">
        The current value from global state for{" "}
        <code style={{ fontWeight: "bold" }}>
          darkTheme: {state.darkTheme.toString()}
        </code>
      </section>

      <div>
        {/* Displaying error messages */}
        {error && <div> something went wrong</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AppUserList appUsers={appUsers} title="Application User's List" />
        )}
      </div>
    </div>
  );
};

export default Home;

// import { LOGIN, SEND_EMAIL } from "../utils/mutations";
// const [sendemail, { error: sendemailerr }] = useMutation(SEND_EMAIL);
// const sendEmailResponse = await sendemail({
//   variables: {
//     email: userLoginResponse.data.login.appUserDetails.appUserEmail,
//   },
// });

// console.log(sendEmailResponse.responseMsg);

// {sendemailerr ? (
//   <div>
//     <p className="error-text">Sending email failed</p>
//   </div>
// ) : null}
