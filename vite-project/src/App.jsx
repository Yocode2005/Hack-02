import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // use react-router dom for using routing
import { useSelector } from 'react-redux'; // use react-redux
import Login from './pages/Login'; // complete login page
import SOSPage from './pages/SOSPage';
import ResponderDashboard from './pages/ResponderDashboard'; // import pages form responderdashboard
import HospitalDashboard from './pages/HospitalDashboard'; // import pages from hospitaldashboard
import AdminDashboard from './pages/AdminDashboard'; // for admindashboard
import PrivateRoute from './components/common/PrivateRoute'; // import components
function App() {
 const { user } = useSelector((state) => state.auth);
 return (
 <Routes>
 <Route path="/login" element={<Login />} /> // login route
 <Route path="/" element={<PrivateRoute />}> // privateRoute route
 <Route index element={ // add one  more route
 user?.role === 'responder' ? <ResponderDashboard /> : // route for dashboard
 user?.role === 'hospital' ? <HospitalDashboard /> : // route for hospital dashboard
 user?.role === 'admin' ? <AdminDashboard /> : // set path for adminDashboard
 <SOSPage />
 } />
 <Route path="sos" element={<SOSPage />} /> // route for sospage
 <Route path="responder" element={<ResponderDashboard />} /> // route for responder dashboard
 <Route path="hospital" element={<HospitalDashboard />} />
 <Route path="admin" element={<AdminDashboard />} /> for admin dashboard
 </Route>
 <Route path="*" element={<Navigate to="/" />} /> // to navigate
 </Routes>
 );
}
export default App;
