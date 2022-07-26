import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../store/auth/index';

function Navbar({ isAuthenticated }) {
  const user = useSelector(selectAuthUser);

  return (
    <>
      <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-nav align-items-baseline">
            <h4 className="navbar-brand ">Galleries app</h4>
            <Link to="/" className="nav-link">
              All Galleries
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/my-galleries" className="nav-link">
                  My Galleries
                </Link>
                <Link to="/create" className="nav-link">
                  Create New Gallery
                </Link>
              </>
            )}
          </div>
          <div className="navbar-nav">
            {isAuthenticated && (
              <div className="d-flex">
                <div className="nav-link">
                  {user?.first_name} {user?.last_name}
                </div>
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </div>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
