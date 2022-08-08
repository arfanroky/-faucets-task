import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";

const PrivateAuth = ({children}) => {
    let location = useLocation();
    const [user, loading, error] = useAuthState(auth)
  
    if(loading) return <p>Loading...</p>
    if(error) alert(error)

    if (!user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
  
  export default PrivateAuth;