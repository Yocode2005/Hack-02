import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // use react-router dom for using routing
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import SOSPage from './pages/SOSPage';
import ResponderDashboard from './pages/ResponderDashboard'; // import pages form responderdashboard
import HospitalDashboard from './pages/HospitalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/common/PrivateRoute';
function App() {
 const { user } = useSelector((state) => state.auth);
 return (
 <Routes>
 <Route path="/login" element={<Login />} />
 <Route path="/" element={<PrivateRoute />}>
 <Route index element={
 user?.role === 'responder' ? <ResponderDashboard /> :
 user?.role === 'hospital' ? <HospitalDashboard /> :
 user?.role === 'admin' ? <AdminDashboard /> :
 <SOSPage />
 } />
 <Route path="sos" element={<SOSPage />} />
 <Route path="responder" element={<ResponderDashboard />} />
 <Route path="hospital" element={<HospitalDashboard />} />
 <Route path="admin" element={<AdminDashboard />} />
 </Route>
 <Route path="*" element={<Navigate to="/" />} />
 </Routes>
 );
}
export default App;
