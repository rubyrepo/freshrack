import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;

    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL || null
      });

      // Login user in context
      login({
        username: formData.name,
        email: formData.email,
        uid: userCredential.user.uid,
        photoURL: formData.photoURL
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Login user in context
      login({
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to register with Google!'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL (optional)"
              className="input input-bordered"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className={`input input-bordered ${passwordError ? 'input-error' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <label className="label">
                <span className="label-text-alt text-error">{passwordError}</span>
              </label>
            )}
          </div>

          <div className="form-control mt-6">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !!passwordError}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Register'}
            </button>
          </div>

          <div className="divider">OR</div>

          <div className="form-control">
            <button 
              type="button"
              onClick={handleGoogleRegister} 
              className="btn btn-outline"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-primary ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;