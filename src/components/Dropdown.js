import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dropdown = ({ setValue }) => {
  const [authority, setAuthority] = useState([]);
  const [selectsValue, setSelectsValue] = useState('Ethereum Kovan');

  const sendValue = async () => {
    await setValue(selectsValue);
  };

  sendValue();

  useEffect(() => {
    const fetchAuthority = async () => {
      const { data } = await axios.get('http://localhost:8000/authority');
      setAuthority(data);
    };
    fetchAuthority();
  }, [selectsValue]);

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="w-[160px] border m-1 inline-block text-center py-1 rounded font-bold"
      >
        {selectsValue}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {authority?.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={item.img} className="w-5 h-5" alt="" />
            <li className="my-1" onClick={() => setSelectsValue(item.name)}>
              {item.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
