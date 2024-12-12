"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import Scorecard from '../components/ScoreCard';
import { io } from 'socket.io-client'

export default function CricketControlPanel() {

  const [socket, setSocket] = useState(null);
  const [run, setRun] = useState(0);

  const handleClick = (runValue) => { 
    setRun(runValue);
  }

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("run", run);
      setRun(0);
    } else {
      console.error("Socket is not initialized");
    }
  }

  useEffect(() => {
    const socketConnection = io("http://localhost:3001");

    // Setting the socket connection
    setSocket(socketConnection);

    // Clean up the socket on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className='flex gap-60'>
      <div className="ml-2 w-1/2 border border-gray-500 rounded p-1 mt-3">
        {/* Dropdown Controls */}
        <div className="ml-5 mt-2 mb-4 flex space-x-2">
          {/* Left Section */}
          <div className="flex space-x-1">
            <div className='flex flex-col'>
              <label className="text-sm font-medium flex text-start">Batsman (Striker)</label>
              <select className="w-100 mt-1 p-2 px-7 border border-gray-300">
                <option>Tanzim Hasan Sakib</option>
                <option>Player 2</option>
                <option>Player 3</option>
              </select>
            </div>
            <div className="flex">
              <button className="text-red-500 mt-4">&#x21c4;</button>
            </div>
            <div>
              <label className="block text-sm font-medium">Batsman (Non-Striker)</label>
              <select className="w-full mt-1 p-2 px-14 border border-gray-300">
                <option>Towhid Hridoy</option>
                <option>Player 2</option>
                <option>Player 3</option>
              </select>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex flex-col">
            <div>
              <label className="block text-sm font-medium">Bowler</label>
              <select className="w-full mt-1 p-2 px-10 border border-gray-300">
                <option>Nitish Kumar Reddy</option>
                <option>Bowler 2</option>
                <option>Bowler 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="ml-5 flex flex-col mb-5">
          {/* Top Row: Score and Mute */}
          <div className="flex items-center gap-60">
            <div className="flex items-center font-bold">
              <div>Score:</div>
            </div>
            <div className="flex flex-col items-center border border-gray-500 ml-80 p-1 rounded">
              {/* Toggle Button */}
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              {/* Text Below Toggle */}
              <span className="text-sm ">Mute & Text Off</span>
            </div>
          </div>

          {/* Extra Section Below Score */}
          <div className="flex items-center">
            <div className='font-bold'>Extra:</div>
          </div>
        </div>

        <div className="ml-5 flex gap-1">
          {/* Left Side Buttons */}
          <div className="flex flex-col gap-1">
            <button className="w-36 h-20 text-white font-bold bg-green-700 rounded">Ball Start</button>
            <button className="w-36 h-20 text-white font-bold bg-stone-500 rounded">Wide</button>
            <button className="w-36 h-20 text-white font-bold bg-slate-900 rounded">No Ball</button>
          </div>

          {/* Right Side Buttons */}
          <div className="flex flex-col gap-1.5">
            {/* First Row */}
            <div className="flex gap-1">
              <button onClick={() => handleClick(0)}  className="w-48 h-32 text-white font-bold bg-blue-500 rounded">0</button>
              <button onClick={() => handleClick(1)}  className="w-48 h-32 text-white font-bold bg-stone-700 rounded">1</button>
              <button className="w-48 h-32 text-white text-sm font-bold bg-red-600 rounded">Wicket</button>
            </div>
            {/* Second Row */}
            <div className="flex gap-1">
              <button onClick={() => handleClick(2)} className="w-48 h-28 text-white font-bold bg-teal-700 rounded">2</button>
              <button onClick={() => handleClick(4)} className="w-48 h-28.5 text-white font-bold bg-teal-300 rounded">4</button>
              <button onClick={() => handleClick(6)} className="w-48 h-28.5  text-white  font-bold bg-stone-400 rounded">6</button>
            </div>
          </div>
        </div>

        {/* Below Buttons */}
        <div className='ml-5 mt-1 flex gap-1'>
          {/* left side */}
          <div className="flex flex-col gap-1">
            <button className="w-36 h-14 text-white font-bold bg-purple-600">Bowler Stop</button>
            <button className="w-36 h-14 text-white font-bold bg-cyan-900">Others</button>
          </div>
          {/* right side */}
          <div className="flex flex-col gap-1">
            {/* First Row */}
            <div className="flex gap-2">
              <button className="w-28 h-14 text-white font-bold bg-blue-500">1 or 2</button>
              <button className="w-40 h-14 text-white font-bold bg-purple-600">2 or 4</button>
              <button className="w-36 h-14 text-white font-bold bg-stone-700">4 or 6</button>
              <button className="w-36 h-14 text-white font-bold bg-purple-600">Ball in Air</button>
            </div>
            {/* Second Row */}
            <div className="flex gap-2">
              <button onClick={() => handleClick(3)}  className="w-28 h-14 text-white font-bold bg-purple-600">3</button>
              <button className="w-40 h-14 text-white font-bold bg-cyan-900">Boundary Check</button>
              <button className="w-36 h-14 text-white font-bold bg-gray-500">Appeal</button>
              <button className="w-36 h-14 text-white font-bold bg-cyan-900">Catch Drop</button>
            </div>
          </div>
        </div>

        <div className="mt-1 ml-5 flex flex-col gap-1">
          {/* First Row */}
          <div className="flex gap-1">
            <button className="w-44 h-14 text-white font-bold bg-cyan-500">Leg Bye</button>
            <button className="w-44 h-14 text-white font-bold bg-green-500">Bye</button>
            <button className="w-44 h-14 text-white font-bold bg-gray-500">Third Umpire</button>
            <button className="w-48 h-14  text-white font-bold bg-red-600">Review</button>
          </div>
          <div className="flex gap-1">
            <button onClick={handleSendMessage} className="w-44 h-14 text-white font-bold bg-lime-900">Done</button>
            <button className="w-44 h-14 text-white font-bold bg-cyan-900">Misfield</button>
            <button className="w-44 h-14  text-white font-bold bg-indigo-700">Overthrow</button>
            <button className="w-48 h-14 text-white  font-bold bg-red-600">Wicket Confirm</button>
          </div>
        </div>
      </div>

      <Scorecard />
    </div>
  );
}
