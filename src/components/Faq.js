import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Data } from './Data';

const Faq = () => {
  const [faq, setFaq] = useState(false);
  const toggle = (index) => {
    if (faq === index) {
      return setFaq(null);
    }
    setFaq(index);
  };

  return (
    <main>
      <h1 className="font-bold text-2xl text-blue-500 text-center my-6 block">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col items-center justify-center relative min-h-screen bg-gray-100">
        <article className="absolute top-1/4 shadow-lg w-[700px] p-6 ">
          {Data.map((item) => (
            <>
              <div
                onClick={() => toggle(item.id)}
                className="flex justify-between items-center w-full cursor-pointer border border-blue-500 my-4"
              >
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
              {faq === item.id ? <p className='py-3 text-justify'>{item.desc}</p> : null}
            </>
          ))}
        </article>
      </div>
    </main>
  );
};

export default Faq;
