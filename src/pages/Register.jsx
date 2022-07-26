import React, { useState } from 'react';
import { register, selectRegisterErrors } from '../store/auth/index';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  const registerErrors = useSelector(selectRegisterErrors);

  const initialForm = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  };

  const [form, setForm] = useState(initialForm);

  function handleRegister(e) {
    e.preventDefault();
    dispatch(register(form));
  }
  return (
    <div className="container">
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <label htmlFor="first_name" className="form-label">
          First name
        </label>
        <input
          className="form-control mb-1"
          type="text"
          id="first_name"
          name="first_name"
          required
          value={form.first_name}
          onChange={({ target }) =>
            setForm({ ...form, [target.name]: target.value })
          }
        />
        {registerErrors?.first_name && (
          <p className="text-danger">{registerErrors.first_name}</p>
        )}

        <label htmlFor="last_name" className="form-label">
          Last name
        </label>
        <input
          className="form-control mb-1"
          type="text"
          id="last_name"
          name="last_name"
          required
          value={form.last_name}
          onChange={({ target }) =>
            setForm({ ...form, [target.name]: target.value })
          }
        />
        {registerErrors?.last_name && (
          <p className="text-danger">{registerErrors.last_name}</p>
        )}

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-control mb-1"
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={({ target }) =>
            setForm({ ...form, [target.name]: target.value })
          }
        />
        {registerErrors?.email && (
          <p className="text-danger">{registerErrors.email}</p>
        )}

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control mb-1"
          type="password"
          id="password"
          name="password"
          required
          value={form.password}
          onChange={({ target }) =>
            setForm({ ...form, [target.name]: target.value })
          }
        />
        {registerErrors?.password && (
          <p className="text-danger">{registerErrors.password}</p>
        )}

        <label htmlFor="password_confirmation" className="form-label">
          Confirm password
        </label>
        <input
          className="form-control mb-1"
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          required
          value={form.password_confirmation}
          onChange={({ target }) =>
            setForm({ ...form, [target.name]: target.value })
          }
        />

        <div>
          <input
            className="form-check-input mb-1"
            type="checkbox"
            id="terms"
            name="terms"
            checked={form.terms}
            onChange={({ target }) =>
              setForm({ ...form, [target.name]: target.checked })
            }
          />
          <label htmlFor="terms" className="form-check-label px-3">
            I accept terms and conditions
          </label>
        </div>
        {registerErrors?.terms && (
          <p className="text-danger">{registerErrors.terms}</p>
        )}

        <button className="btn btn-primary my-3">Register</button>
      </form>
    </div>
  );
}

export default Register;
