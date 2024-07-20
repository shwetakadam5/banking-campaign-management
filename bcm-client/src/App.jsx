import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        {/* The Outlet component will conditionally swap between the different pages according to the URL */}
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
