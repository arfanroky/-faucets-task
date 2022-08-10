import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import auth from '../firebase.init';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

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
  const [user, loading] = useAuthState(auth);
  const [walletData, setWalletData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWalletData = async () => {
      const { data } = await axios.get('http://localhost:5000/wallet');

      setWalletData(data.reverse().slice(0, 3));
    };
    fetchWalletData();
  }, []);

  const handleReCAPTCHA = (e) => {
    console.log(e);
  };

  if (loading) return <p>Loading...</p>;

  const handleWalletValue = async (e) => {
    const walletInfo = {
      wallet: walletAddress,
      link: linkRef.current.value,
      eth: ethRef.current.value,
    };

    const res = await axios
      .post('http://localhost:5000/wallet', walletInfo)
      .catch((err) => {
        console.log(err);
      });

    if (res.data.message) {
      toast.success(res.data.message);
    }

    if (!res.data.errors) {
      setError('');
    } else {
      setError(res.data.errors);
    }
  };

  return (
    <>
      <Navbar passFunc={setValue} />
      <main className=" my-12">
        <br />
        <p className="bg-blue-500 text-center py-6 font-semibold text-white mt-4">
          Notice Here
        </p>
        <div className="bg-gray-200  mb-12 border-b-8">
          <div className="w-3/4 mx-auto pt-12">
            <h1 className="text-4xl font-bold text-blue-500 ">
              Request testnet LINK
            </h1>
            <p className="py-2 md:w-[600px] text-justify">
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
                name="wallet"
                placeholder="Wallet Address..."
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <span className="text-red-600">
                {error ? error?.wallet.msg : ''}
              </span>
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
              className="btn btn-primary py-2 px-6 font-semibold text-white hover:bg-blue-700 mt-4"
            >
              Send Request
            </button>

            <div>
              <h2 className="mt-4 font-bold">Request History</h2>
              <div className="md:flex my-4 text-white gap-5">
                <button
                  onClick={() => setWalletData(walletData)}
                  className="btn btn-secondary md:mb-0 mb-4 "
                >
                  ETH Transaction History
                </button>
                <button
                  onClick={() => setWalletData(walletData)}
                  className="btn btn-success"
                >
                  TestLink Transaction History
                </button>
              </div>

              <div className="md:block hidden">
                <table className="table-auto w-[600px] border ">
                  <thead>
                    <tr className="border p-5">
                      <th>Sr</th>
                      <th>Time</th>
                      <th>Amount</th>
                      <th>Link</th>
                      <th>Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletData?.map((data, index) => (
                      <tr key={data._id} className="border ">
                        <td>{index + 1}</td>
                        <td>{data.date.slice(0, 10)}</td>
                        <td>{data.eth}</td>
                        <td>{data.link}</td>
                        <td>{data.wallet.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden block">
                {walletData.map((wallet) => (
                  <div
                    key={wallet._id}
                    className="shadow rounded my-4 border border-gray-300 p-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-bold">Time</span>
                      <p className="text-primary">{wallet.date.slice(0, 10)}</p>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-bold">Amount</span>
                      <p className="text-secondary">{wallet.eth}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Link</span>
                      <p className="text-secondary">{wallet.link}</p>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-bold">Hash</span>
                      <p className="text-green-600">
                        {wallet.wallet.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
