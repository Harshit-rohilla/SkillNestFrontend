import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({ condition, children }) {
  
    if (!condition) {
      toast.error("Unauthorized access");
     return <Navigate to="/login" />
    }
    else{
      return children;
    }
  

  
}

export default PrivateRoute;
