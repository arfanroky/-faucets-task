import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import auth from '../firebase.init';
import Navbar from './Navbar';
import { toast} from 'react-toastify';

const ethHistory = [
  { id: 1, time: '12:30 AM', amount: 487, hash: '4s8er5s5fe57rjmxnfuewrurks' },
  { id: 2, time: '10:30 AM', amount: 875, hash: 'sf7s7ers4e7r7wser' },
  { id: 3, time: '11:30 AM', amount: 797, hash: 'se4s7er7' },
];

const Home = () => {
  const [value, setValue] = useState();
  const [eth, setEth] = useState({});
  const [walletAddress, setWalletAddress] = useState('');
  const linkRef = useRef();
  const ethRef = useRef();
  const walletRef = useRef();
  const [user, loading] = useAuthState(auth);
  const [walletData, setWalletData] = useState([]);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchWalletData = async () => {
      const { data } = await axios.get('http://localhost:8000/wallet');

      setWalletData(data.reverse().slice(0, 3));
    };
    fetchWalletData();
  }, []);


  const outPut = async (items) => {
    items.map((item) => setEth(item));
  };

  const handleReCAPTCHA = (e) => {
    console.log(e);
  };


  
  if (loading) return <p>Loading...</p>;


  const handleWalletValue = async (e) => {
    const walletInfo = {
      wallet: walletAddress,
      link: linkRef.current.value,
      eth: ethRef.current.value,
      email: user.email,
    };

    const res = await axios.post(
      'http://localhost:8000/wallet',
      walletInfo
    ).catch(err => {
      console.log(err);
    })

    if(res.data.message){
      toast.success(res.data.message)
    }

    if(!res.data.errors){
      setError('')
    }
    else{
      setError(res.data.errors);
    }

  };

  return (
    <>
      <Navbar setValue={setValue} />
      <main className="-z-10 min-h-screen my-12">
        <p className="bg-blue-500 text-center py-6 font-semibold text-white">
          Notice Here
        </p>
        <div className="bg-gray-200 md:h-[700px] mb-12 border-b-8">
          <div className="w-3/4 mx-auto pt-12">
            <h1 className="text-4xl font-bold text-blue-500 ">
              Request testnet LINK
            </h1>
            <p className="py-2 w-[600px]">
              Get testnet LINK for an account on one of the supported blockchain
              testnets so you can create and test your own oracle and
              Chainlinked smart contract
            </p>
          </div>
          <div className="w-3/4 mx-auto bg-white border-2 h-auto p-6">
            <p>
              Your wallet is connected to{' '}
              <span className="font-bold">{value}</span>, so you are requesting{' '}
              <span className="font-bold">{value}</span> Link/ETH.
            </p>
            <div className=" my-3 ">
              <label
                className="block font-bold text-blue-500 text-sm mb-1"
                htmlFor="walletAddress"
              >
                Wallet Address
              </label>
              <input
                className="block outline-none border border-gray-500 w-full pl-2"
                type="text"
                name='wallet'
                placeholder="Wallet Address..."
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <span className='text-red-600'>{ error ? error?.wallet.msg : ''}</span>
            </div>

            <div className=" my-3 flex-1">
              <label
                className="block font-bold text-blue-500 text-sm mb-1"
                htmlFor="requestType"
              >
                Request Type
              </label>
              <div className="flex justify-between gap-4">
                <input
                  className="block outline-none border border-gray-500 w-full pl-2"
                  type="text"
                  value="20 Test Link"
                  disabled
                  ref={linkRef}
                />
                <input
                  className="block outline-none border border-gray-500 w-full pl-2"
                  type="text"
                  value="0.5 ETH"
                  disabled
                  ref={ethRef}
                />
              </div>
            </div>

            <ReCAPTCHA
              sitekey="6LeMYVUhAAAAAOF5xjWDuskarMbIGqqvv7r2AGfs"
              onChange={handleReCAPTCHA}
            />
            <button
              onClick={() => handleWalletValue()}
              className="btn bg-blue-500 py-2 px-6 font-semibold text-white hover:bg-blue-700 mt-4"
            >
              Send Request
            </button>

            <div>
              <h2 className="mt-4">Request History</h2>
              <div className="flex my-4 text-white gap-5">
                <button
                  onClick={() => outPut(ethHistory)}
                  className="btn py-2 px-6 bg-purple-500"
                >
                  ETH Transaction History
                </button>
                <button className="btn py-2 px-6 bg-gray-400">
                  TestLink Transaction History
                </button>
              </div>
              <table class="table-auto w-[600px] border">
                <thead>
                  <tr className="border">
                    <th>Sr</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Link</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {walletData?.map((data, index) => (
                    <>
                      <tr className="border">
                        <td>{index + 1}</td>
                        <td>{data.date.slice(0, 10)}</td>
                        <td>{data.eth}</td>
                        <td>{data.link}</td>
                        <td>{data.wallet}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
