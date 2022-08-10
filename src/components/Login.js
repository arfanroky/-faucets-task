import axios from 'axios';
import React, { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  if (loading || signInLoading) return <p>Loading.....</p>;
  if (error || signInError) alert(error);

  const onSubmit = async (e) => {
    console.log(e);
    await signInWithEmailAndPassword(e.email, e.password);

    if (e.email) {
      const { data } = await axios
        .get(`https://intense-chamber-34587.herokuapp.com/user/${e.email}`)
        .catch((error) => console.log(error));
    }

    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:flex justify-center items-center md:w-[800px] w-[400px] md:h-[600px] h-700px border shadow-xl rounded gap-4">
        <div className="bg-blue-400 md:h-full md:py-0 py-12 flex-1 flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">New Here?</h1>
          <Link to="/sign-up">
            <button className="btn bg-white py-2 px-6 mt-4 rounded font-bold">
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
              {...register('email', {
                required: {
                  value: true,
                  message: 'Write your email',
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email?.type === 'required' && (
              <span className="text-blue-600">{errors.email.message}</span>
            )}
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
              {...register('password', {
                required: {
                  value: true,
                  message: 'Write your password',
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password?.type === 'required' && (
              <span className="text-blue-600">{errors.password.message}</span>
            )}
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
