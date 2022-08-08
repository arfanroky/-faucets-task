import React, { useState } from 'react';
import { UserCircleIcon, ArchiveIcon, ArrowDownIcon, WifiIcon, CollectionIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [userProfile, setUserProfile] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const name = user?.displayName;
  console.log(name);
  if(loading) return <p>Loading....</p>
  if(error) alert(error)
  

  return (
    
  <div className='fixed top-0 left-0 right-0 w-full z-50 bg-white'>
      <nav className='flex justify-between px-8 items-center h-14 my-2 relative'>
    <Link to='/'>
    <h3 className='text-2xl font-bold text-blue-500'>Faucets</h3></Link>
    <div className='flex items-center gap-6'>
    <select className=' outline-none border border-blue-400 p-2'>
        <option value="Ethereum Kovan">Ethereum Kovan</option>
        <option value="Avalanche Fuji">Avalanche Fuji</option>
        <option value="Arbitrum Rinkeby">Arbitrum Rinkeby</option>
        <option value="BNB Chain Testnet">BNB Chain Testnet</option>
        <option value="Fantom Testnet">Fantom Testnet</option>
        <option value="Harmony Testnet">Harmony Testnet</option>
        <option value="POA Network Sokol">POA Network Sokol</option>
        <option value="Polygon Mumbai">Polygon Mumbai</option>
      </select>
      <button onClick={() => setWallet(!wallet)} className='btn py-2 px-6 border-2 border-blue-500 text-blue-500 font-bold'>
       <ArchiveIcon className='w-4 h-4 text-blue-500 inline-block'/> <span className='md:inline hidden'>Connect Wallet</span>
      </button>
     {
      wallet &&  <div className='absolute top-32 left-0 right-0 bottom-0 w-full h-full '>
       
      <div className='w-[500px] mx-auto flex justify-center items-center h-[350px] gap-6 relative shadow-2xl z-40 bg-white'>
      <h2 className='absolute top-0 left-0 text-2xl font-bold p-2 mb-4'>Connect Your Wallet</h2>
      <p className='absolute top-2 right-5 text-2xl font-bold cursor-pointer' onClick={() => setWallet(!wallet)}>+</p>
        <button className='w-[200px] h-[200px] bg-gray-200 rounded'>
          <CollectionIcon className='w-28 mx-auto text-blue-500'/>
          <span className='font-bold text-lg'>Meta Mask</span>
        </button>
        <button className='bg-gray-200 rounded w-[200px] h-[200px]'>
          <WifiIcon className='w-28 mx-auto text-blue-500'/>
         <span className='font-bold text-lg'> WalletConnect</span>
        </button>
      </div>

    </div>
     }

      <button onClick={() => setUserProfile(!userProfile)} className='outline-none border-0 flex gap-1 items-center'>
        {user && <span className='inline-block font-bold text-gray-500'>{name}</span>}<UserCircleIcon className="h-10 w-10 
         text-blue-500 border border-blue-500 rounded-full"/>
      </button>
    {
      userProfile &&   <ul className={`absolute top-14 right-6 border w-[100px] text-center bg-blue-600 `}>
     <li className=' w-full text-white'>
          <Link to='/profile'>Profile</Link>
      </li>
     { user ?  <button onClick={() => signOut(auth)} className='btn bg-blue-600 text-white py-2 px-4'>
        Sign Out
        </button> :  <>
      <li className=' w-full text-white'>
        <Link to='/sign-up'>Sign Up</Link>
      </li>
      <li className=' w-full ext-white'>
        <Link to='/login'>Login</Link>
      </li>  </> }
    
      <li className=' w-full text-white'>
        <Link to='/faq'>Faq</Link>
      </li>
    </ul>
    }
    </div>
    </nav>
  </div>
  );
};

export default Navbar;
