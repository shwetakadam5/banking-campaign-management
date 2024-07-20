import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* The Outlet component will conditionally swap between the different pages according to the URL */}
      <Outlet />
    </>
  );
}

export default App;
