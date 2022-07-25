import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/Navbar';
import Galleries from './pages/Galleries';
import CreateGallery from './pages/CreateGallery';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

function App() {
  const isAuthenticated = false; //fake for now
  return (
    <BrowserRouter>
      <>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Galleries />} />

          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/my-galleries" element={<Galleries />} />
            <Route path="/create" element={<CreateGallery />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
