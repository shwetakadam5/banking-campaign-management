const AppUserList = ({ appUsers }) => {
  if (!appUsers.length) {
    return <h3>No App Users</h3>;
  }

  return <h3>App users : {appUsers.length}</h3>;
};

export default AppUserList;
