import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Data } from './Data';
import Navbar from './Navbar';

const Faq = () => {
  const [faq, setFaq] = useState(false);
  const toggle = (index) => {
    if (faq === index) {
      return setFaq(null);
    }
    setFaq(index);
  };

  return (
    <>
      <Navbar />
      <main className=" bg-gray-100">
        <br />
        <br /> <br /> <br />
        <h1 className="font-bold text-2xl text-blue-500 text-center">
          Frequently Asked Questions
        </h1>
        <div className="flex items-center justify-center ">
          <article className="shadow-lg md:w-3/4 p-6 ">
            {Data.map((item) => (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                className=" w-full cursor-pointer border border-blue-500 my-4 p-3"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-gray-600 text-xl">
                    {item.title}
                  </h2>
                  <span>
                    {faq === item.id ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )}
                  </span>
                </div>

                {faq === item.id ? (
                  <p className="py-3 text-justify">{item.desc}</p>
                ) : null}
              </div>
            ))}
          </article>
        </div>
        <br />
      </main>
    </>
  );
};

export default Faq;
