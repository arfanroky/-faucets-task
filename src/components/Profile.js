import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set, useForm } from 'react-hook-form';
import auth from '../firebase.init';
import Navbar from './Navbar';

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(
        `https://intense-chamber-34587.herokuapp.com/user/${user?.email}`
      );
      setUserInfo(data);
    };

    fetchUserData();
  }, [user]);

  const onSubmit = async (e) => {
    const newUserInfo = {
      name: e.name,
      email: userInfo.email,
      education: e.education,
      age: e.age,
      phone: e.phone,
      city: e.city,
    };

    const { data } = await axios.patch(
      `https://intense-chamber-34587.herokuapp.com/user/profile/${user.email}`,
      newUserInfo
    );

    console.log(data);
  };

  return (
   <>
   <Navbar/>
    <div className="md:w-[600px] mx-auto flex justify-center items-center min-h-screen">
      <form className="flex-1 border p-12" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-bold text-3xl text-blue-600">
          Profile
        </h1>

        <div className="md:flex gap-8">
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="name"
              className="block font-bold text-gray-600 text-sm"
            >
              Name
            </label>
            <input
              defaultValue={userInfo.name}
              className="block w-full outline-none border-b border-black focus:border-gray-600 pt-1 pb-2"
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Write your first name',
                },
              })}
              placeholder="Enter your first name"
            />
            {errors.name?.type === 'required' && (
              <span className="text-blue-600">{errors.name.message}</span>
            )}
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="age"
              className="block font-bold text-gray-600 text-sm"
            >
              Age
            </label>
            <input
              defaultValue={userInfo.age}
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="text"
              {...register('age', {
                required: {
                  value: true,
                  message: 'Write your age',
                },
              })}
              placeholder="Enter your age"
            />
            {errors.age?.type === 'required' && (
              <span className="text-blue-600">{errors.age.message}</span>
            )}
          </div>
        </div>

        <div className="md:flex gap-8">
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="email"
              className="block font-bold text-gray-600 text-sm"
            >
              Email
            </label>
            <input
              defaultValue={userInfo.email}
              readOnly
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
              htmlFor="phone"
              className="block font-bold text-gray-600 text-sm"
            >
              Phone
            </label>
            <input
              defaultValue={userInfo.phone}
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
        </div>

        <div className="md:flex gap-8">
          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="education"
              className="block font-bold text-gray-600 text-sm"
            >
              Education
            </label>
            <input
              defaultValue={userInfo.education}
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="text"
              {...register('education', {
                required: {
                  value: true,
                  message: 'Write your education',
                },
              })}
              placeholder="Enter your education"
            />
            {errors.education?.type === 'required' && (
              <span className="text-blue-600">{errors.education.message}</span>
            )}
          </div>

          <div className=" my-3 w-80 mx-auto">
            <label
              htmlFor="city"
              className="block font-bold text-gray-600 text-sm"
            >
              City
            </label>
            <input
              defaultValue={userInfo.city}
              className="block outline-none border-b border-black w-full focus:border-gray-600 pt-1 pb-2"
              type="text"
              {...register('city', {
                required: {
                  value: true,
                  message: 'Write your city',
                },
              })}
              placeholder="Enter your city"
            />
            {errors.city?.type === 'required' && (
              <span className="text-blue-600">{errors.city.message}</span>
            )}
          </div>
        </div>

        <input
          className="btn mt-5 py-2 w-80 mx-auto block bg-blue-400 font-bold text-white rounded hover:bg-blue-600 transition"
          type="submit"
          value="Update Profile"
        />
      </form>
    </div>
   </>
  );
};

export default Profile;
