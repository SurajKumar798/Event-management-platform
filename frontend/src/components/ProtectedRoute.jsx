import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{
     if(!token){
    alert('please login to view your events');
    navigate('/login', {replace: true});
   }
  }, [token, navigate])
 
 if(!token){
   return null;
 }
 return children;
}

export default ProtectedRoute;
