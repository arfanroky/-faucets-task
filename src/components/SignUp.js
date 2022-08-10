import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [
    createUserWithEmailAndPassword,
    createUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [user, loading, authError] = useAuthState(auth);

  if (createLoading || updating || loading) return <p>Loading...</p>;
  if (createError || updateError || authError)
    console.log(createError || updateError || authError);

  const onSubmit = async (e) => {
    const name = e.firstName.concat(' ', e.lastName);
    await createUserWithEmailAndPassword(e.email, e.password);
    await updateProfile({ displayName: name });

    const userCredential = {
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      phone: e.phone,
      password: e.password,
      confirmPassword: e.confirmPassword,
    };

    if (e.email) {
      await fetch(`http://localhost:8000/people`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userCredential),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message) {
            toast.success('User Created Successfully!');
          }
          setError(data.errors);
          if (data.message) {
            navigate('/');
          }
        });
    } else {
      toast.error('Email must type!');
    }

    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="md:flex justify-center items-center md:w-[800px] w-[400px] md:h-[600px] h-700px border shadow-xl rounded gap-4">
        <div className="bg-blue-400 md:h-full md:py-0 py-12 flex-1 flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">
            You Have an Account?
          </h1>
          <Link to="/login">
            <button className="btn btn-accent hover:bg-white bg-white py-2 px-6 mt-4 rounded font-bold">
              Login
            </button>
          </Link>
        </div>

        <form className="flex-1 md:py-0 py-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center font-bold text-3xl ">Sign Up</h1>
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="firstName"
              className="block font-bold text-gray-600 text-sm"
            >
              First Name
            </label>
            <input
              className="block w-full outline-none border-b border-black focus:border-gray-600 pt-1 pb-2"
              type="text"
              name="firstName"
              {...register('firstName')}
              placeholder="Enter your first name"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.firstName?.msg : ''}
            </span>
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="lastName"
              className="block font-bold text-gray-600 text-sm"
            >
              Last Name
            </label>
            <input
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="text"
              name="lastName"
              {...register('lastName')}
              placeholder="Enter your last name"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.lastName?.msg : ''}
            </span>
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="phone"
              className="block font-bold text-gray-600 text-sm"
            >
              Phone
            </label>
            <input
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="tel"
              name="phone"
              {...register('phone')}
              placeholder="Enter your phone number"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.phone?.msg : ''}
            </span>
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="email"
              className="block font-bold text-gray-600 text-sm"
            >
              Email
            </label>
            <input
              name="email"
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.email?.msg : ''}
            </span>
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="password"
              className="block font-bold text-gray-600 text-sm"
            >
              Password
            </label>
            <input
              name="password"
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.password?.msg : ''}
            </span>
          </div>
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="confirmPassword"
              className="block font-bold text-gray-600 text-sm"
            >
              confirmPassword
            </label>
            <input
              name="confirmPassword"
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="password"
              {...register('confirmPassword')}
              placeholder="Enter your confirmPassword"
            />
            <span className="text-red-500">
              {' '}
              {error ? error?.confirmPassword?.msg : ''}
            </span>
          </div>

          <input
            className="outline-none border-none py-2 w-80 mx-auto block bg-blue-400 font-bold text-white rounded hover:bg-blue-600 transition"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
