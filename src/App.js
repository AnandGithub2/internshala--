import './App.css';
import Footer from './Componets/Footerr/Footer'; // Corrected path if needed
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern";
import JobAvl from "./Componets/Job/JobAvl";
import JobDetail from './Componets/Job/JobDetail';
import InternDetail from "./Componets/Internships/InternDeatil"; // Corrected path if needed
import { useDispatch } from 'react-redux';
import { login, logout } from "./Feature/Userslice";
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication";
import Postinternships from './Admin/Postinternships';
import DetailApplication from './Applications/DeatilApplication'; // Corrected path if needed
import UserApplication from './profile/UserApplicatiom'; // Corrected path if needed
import UserApplicationDetail from "./Applications/DeatilApplicationUser"; // Corrected path if needed

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          name: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/internship' element={<Intern />} />
        <Route path='/Jobs' element={<JobAvl />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/detailjob' element={<JobDetail />} />
        <Route path='/detailInternship' element={<InternDetail />} />
        <Route path='/detailApplication' element={<DetailApplication />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminpanel' element={<Adminpanel />} />
        <Route path='/postInternship' element={<Postinternships />} />
        <Route path='/applications' element={<ViewAllApplication />} />
        <Route path='/userApplicationDetail' element={<UserApplicationDetail />} />
        <Route path='/userApplication' element={<UserApplication />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
