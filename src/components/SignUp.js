import React from 'react';
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

const SignUp = () => {
  const navigate = useNavigate();

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
  const [user, loading, error] = useAuthState(auth);

  if (createLoading || updating || loading) return <p>Loading...</p>;
  if (createError || updateError || error)
    console.log(createError || updateError || error);

  // if(user){
  //   navigate('/')
  // }

  const onSubmit = async (e) => {
    const name = e.firstName.concat(' ', e.lastName);
    await createUserWithEmailAndPassword(e.email, e.password);
    await updateProfile({ displayName: name });

    const userCredential = {
      name: name,
      email: e.email,
      phone: e.phone,
    };

    if (e.email) {
      const { data } = await axios
        .put(
          `https://intense-chamber-34587.herokuapp.com/user/${e.email}`,
          userCredential
        )
        .catch((error) => console.log(error));

      if (data.result.acknowledged) {
        navigate('/');
      }
    }

    reset();
  };

  const handleReCAPTCHA = (value) => {
    console.log(value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:flex justify-center items-center md:w-[800px] w-[400px] md:h-[600px] h-700px border shadow-xl rounded gap-4">
        <div className="bg-blue-400 md:h-full md:py-0 py-12 flex-1 flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">
            You Have an Account?
          </h1>
          <Link to="/login">
            <button className="btn bg-white py-2 px-6 mt-4 rounded font-bold">
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
              {...register('firstName', {
                required: {
                  value: true,
                  message: 'Write your first name',
                },
              })}
              placeholder="Enter your first name"
            />
            {errors.firstName?.type === 'required' && (
              <span className="text-blue-600">{errors.firstName.message}</span>
            )}
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
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'Write your last name',
                },
              })}
              placeholder="Enter your last name"
            />
            {errors.lastName?.type === 'required' && (
              <span className="text-blue-600">{errors.lastName.message}</span>
            )}
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
              {...register('phone', {
                required: {
                  value: true,
                  message: 'Write your phone number',
                },
              })}
              placeholder="Enter your phone number"
            />
            {errors.phone?.type === 'required' && (
              <span className="text-blue-600">{errors.phone.message}</span>
            )}
          </div>

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

          <div className="w-80 mx-auto my-2">
            <ReCAPTCHA
              sitekey="6LeMYVUhAAAAAOF5xjWDuskarMbIGqqvv7r2AGfs"
              onChange={handleReCAPTCHA}
            />
          </div>

          <input
            className="btn py-2 w-80 mx-auto block bg-blue-400 font-bold text-white rounded hover:bg-blue-600 transition"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
