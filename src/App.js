import {Routes, Route} from 'react-router-dom';
import PrivateAuth from './Authentication/PrivateAuth';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
   {/* <Navbar/> */}
   <Routes>
    <Route path='/' element={<PrivateAuth>
      <Home></Home>
    </PrivateAuth>}/>
    <Route path='/faq' element={<Faq></Faq>}/>
    <Route path='/profile' element={<Profile></Profile>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   <Footer/>
   <ToastContainer/>
   </>
  );
}

export default App;
