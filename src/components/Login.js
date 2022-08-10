import axios from 'axios';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  const onSubmit = async (e) => {
    const res = await axios.get(
      `https://faucets-app.herokuapp.com/people/${e.email}/${e.password}`
    );
    console.log(res);
    if (res?.data.message) {
      toast.success('Logged in successfully');
      navigate('/');
    }
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:flex justify-center items-center md:w-[800px] w-[400px] md:h-[600px] h-700px border shadow-xl rounded gap-4">
        <div className="bg-blue-400 md:h-full md:py-0 py-12 flex-1 flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">New Here?</h1>
          <Link to="/sign-up">
            <button className=" bg-white py-2 px-6 mt-4 rounded font-bold">
              Sign Up
            </button>
          </Link>
        </div>

        <form className="flex-1 md:py-0 py-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center font-bold text-3xl ">Login</h1>
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="email"
              className="block font-bold text-gray-600 text-sm"
            >
              Email
            </label>
            <input
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="password"
              className="block font-bold text-gray-600 text-sm"
            >
              Password
            </label>
            <input
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
          </div>

          <input
            className="outline-none border-none py-2 w-80 mx-auto block bg-blue-400 font-bold text-white rounded hover:bg-blue-600 transition"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
