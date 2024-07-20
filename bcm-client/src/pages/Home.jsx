//import the useQuery hook from @apollo/client
import { useQuery } from "@apollo/client";

//import the specific query we'd like to perform from our queries.js utility
import { QUERY_APPUSERS } from "../utils/queries";

import AppUserList from "../components/AppUserList";

const Home = () => {
  //We pass the query we'd like to execute on component load to the useQuery hook
  const { loading, data, error } = useQuery(QUERY_APPUSERS);

  //use the optional chaining operator to get the resulting profile from our query, or fallback to an empty object if the query isn't resolved yet

  const appUsers = data?.appUsers || [];

  return (
    <div>
      <h1>Home </h1>
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
