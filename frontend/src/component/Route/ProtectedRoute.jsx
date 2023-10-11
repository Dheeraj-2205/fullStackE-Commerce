import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log(rest);
  return (
    <>
      {!loading && (
        <>
          <Route
            {...rest}
            element={(props) => {
              if (!isAuthenticated) {
                return <Navigate to={"/login"} />;
              }
              return <Component {...props} />;
            }}
          />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;

// const ProtectedRoute = ({path, element}) =>{
//   console.log(path);
//   const {isAuthenticated , user, loading} = useSelector((state) => state.user)

//     if(!loading && !isAuthenticated){
//       return <Navigate to = "/login"/>
//     }
//     return <Route path = {path} element = {element} />

// }
// export default ProtectedRoute
