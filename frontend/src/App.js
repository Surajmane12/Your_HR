import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import PersonalDetails from './components/SignUp/PersonalDetails/PersonalDetails';
import EducationDetails from './components/SignUp/EducationDetails/EducationDetails';
import { useState } from 'react';
import UploadDocuments from './components/SignUp/Upload Documents/UploadDocuments';
import SignUpForm from './components/SignUp/SignUpForm/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  const [showdegree,setShowDegree]=useState(true);
  return (
   <>
  

   
   <BrowserRouter>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<SignUpForm/>}/>
   </Routes>
   
   </BrowserRouter>
  
 
   {/* <SignUpForm/> */}
   </>
  );
}

export default App;
