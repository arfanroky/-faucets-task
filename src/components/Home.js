import { async } from '@firebase/util';
import axios from 'axios';
import React, {useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Navbar from './Navbar';


const ethHistory = [
  { id: 1, time: '12:30 AM', amount: 487, hash: '4s8er5s5fe57rjmxnfuewrurks' },
  { id: 2, time: '10:30 AM', amount: 875, hash: 'sf7s7ers4e7r7wser' },
  { id: 3, time: '11:30 AM', amount: 797, hash: 'se4s7er7' },
];



const Home = () => {
  const [value, setValue] = useState();
  const [eth, setEth] = useState({});
const [walletAddress, setWalletAddress] = useState();
const linkRef = useRef();
const ethRef = useRef();
  const outPut = async (items) => {
    items.map((item) => setEth(item));
  };


  const handleReCAPTCHA = (e) => {
    console.log(e);
  };


  const handleWalletValue = async () => {
    const walletInfo = {
      walletAddress: walletAddress,
      link: linkRef.current.value,
      eth: ethRef.current.value
    }
    const {data} = await axios.post('http://localhost:8000/wallet', walletInfo)
 
      console.log(data);


  }

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
              <span className="font-bold">{value}</span>, so you are
              requesting <span className="font-bold">{value}</span>{' '}
              Link/ETH.
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
                placeholder="Wallet Address..."
                onChange={(e) => setWalletAddress(e.target.value)}
              />
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
            className="btn bg-blue-500 py-2 px-6 font-semibold text-white hover:bg-blue-700 mt-4">
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
                  <tr className='border'>
                    <th >Sr</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border'>
                    <td>1</td>
                    <td>12:30 AM</td>
                    <td>487</td>
                    <td>4s8er5s5fe57rjmxnfuewrurks</td>
                  </tr>
                  <tr className='border'>
                    <td>2</td>
                    <td>10:30 AM</td>
                    <td>875</td>
                    <td>sf7s7ers4e7r7wser</td>
                  </tr>
                  <tr className='border'>
                    <td>3</td>
                    <td>11:30 AM</td>
                    <td>797</td>
                    <td>se4s7er7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};


export default(Home);
