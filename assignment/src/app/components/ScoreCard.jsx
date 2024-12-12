'use client'; // This enables the client-side code for React

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'

export default function Scorecard({message}) {
  const [totalScore, setTotalScore] = useState(0);
  const [overCount, setOverCount] = useState(0);
  const [ballsCount, setBallsCount] = useState(0);
  const [commentary, setCommentary] = useState([]);

  // state for batsman 1 
  const [batsman1run, setBatsman1Run] = useState(0);
  const [batsman1balls, setBatsman1Balls] = useState(0);
  const [batsman1boundary, setBatsman1Boundary] = useState(0);

  // state for batsman 2
  const [batsman2run, setBatsman2Run] = useState(0);
  const [batsman2balls, setBatsman2Balls] = useState(0);
  const [batsman2boundary, setBatsman2Boundary] = useState(0);

  const [currentBatsman, setCurrentBatsman] = useState(1);

  // state for bowler 1
  const [bowler1Over, setBowler1Over] = useState(0);
  const [bowler1Balls, setBowler1Balls] = useState(0);
  const [bowler1Maiden, setBowler1Maiden] = useState(0);
  const [bowler1Wicket, setBowler1Wicket] = useState(1);
  const [bowler1Run, setBowler1Run] = useState(0);

  // state for bowler 2
  const [bowler2Over, setBowler2Over] = useState(0);
  const [bowler2Balls, setBowler2Balls] = useState(0);  
  const [bowler2Maiden, setBowler2Maiden] = useState(0);
  const [bowler2Wicket, setBowler2Wicket] = useState(2);
  const [bowler2Run, setBowler2Run] = useState(0);

  const [currentBowler, setCurrentBowler] = useState(1);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on('run', (data) => {
      setTotalScore((prevScore) => prevScore + data);
      setBallsCount((prevCount) => {
        const newBallCount = prevCount + 1;
        if(newBallCount === 6) {
          setOverCount((prevOver) => prevOver + 1);
          setBallsCount(0);
          
          setCurrentBowler((prevBowler) => (prevBowler === 1? 2 : 1));
          setCurrentBatsman((prevBatsman) => (prevBatsman === 1 ? 2 : 1));  
        }
        return newBallCount;
      });

      const batsmanName = currentBatsman === 1 ? "Tanzim Hasan Sakib" : "Towhid Hridoy";
      const bowlerName = currentBowler === 1 ? "Nitish Kumar Reddy" : "Mayank Yadav";

      // adding commentary
      
      const newComment =
        data === 0
          ? `${bowlerName} to ${batsmanName}: Dot ball.`
          : `${bowlerName} to ${batsmanName}: ${data} run${data > 1 ? 's' : ''}.`;
      setCommentary((prevComments) => {
        if (prevComments.length >= 3) {
          return [newComment, ...prevComments.slice(0, 2)];
        } else {
          return [newComment, ...prevComments];
        }
      });
      // setting batsman data
      if(currentBatsman === 1) {
        setBatsman1Run((prevRun) => prevRun + data);
        setBatsman1Balls((prevBalls) => prevBalls + 1);
        setBatsman1Boundary((prevBoundary) => {
          if(data === 4) {
            return prevBoundary + 1;
          }
          return prevBoundary;
        });
      } else {
        setBatsman2Run((prevRun) => prevRun + data);
        setBatsman2Balls((prevBalls) => prevBalls + 1);
        setBatsman2Boundary((prevBoundary) => {
          if(data === 4) {
            return prevBoundary + 1;
          }
          return prevBoundary;
        });
      }

      // setting bowler data
    if(currentBowler === 1) {
      setBowler1Run((prevRun) => prevRun + data);
      setBowler1Balls((prevBalls) => {
        const newBall = prevBalls + 1;
        if(newBall === 6) {
          setBowler1Over((prevOver) => prevOver + 1);
          setBowler1Balls(0);
        }
        if(newBall === 6 && bowler1Run === 0) {
          setBowler1Maiden((prevMaiden) => prevMaiden + 1);        }
        return newBall;
      });
    }
    else {
      setBowler2Run((prevRun) => prevRun + data);
      setBowler2Balls((prevBalls) => {
        const newBall = prevBalls + 1;
        if(newBall === 6) {
          setBowler2Over((prevOver) => prevOver + 1);
          setBowler2Balls(0);
        }
        if(newBall === 6 && bowler1Run === 0) {
          setBowler2Maiden((prevMaiden) => prevMaiden + 1);        }
        return newBall;
      });
    }
    })
    

    // Clean up the socket on component unmount
    return () => {
      socket.disconnect();
    }
  }, [currentBatsman]);

  return (
    <div className="p-2 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gray-200 p-3 rounded-md">
        <h3 className="font-bold text-lg">Scorecard</h3>
        <button className="text-blue-500 font-medium">View Full Score Card</button>
      </div>

      {/* Match Summary */}
      <div className="bg-white shadow-md rounded-md p-2 mt-4">
        <div className="flex justify-between items-center">
          {/* Team Scores */}
          <div className="text-center">
            <h4 className="font-bold">IND</h4>
            <p className="text-gray-700">297 / 6</p>
            <p className="text-gray-500">Over 20.0</p>
          </div>
          <div className="text-center text-gray-700 font-bold">vs</div>
          <div className="text-center">
            <h4 className="font-bold">BAN</h4>
            <p className="text-gray-700">{totalScore} / 7</p>
            <p className="text-gray-500">Over {overCount}.{ballsCount}</p>
          </div>
        </div>
        <div className="text-center font-bold text-green-600 mt-4">
          India won by 133 runs
        </div>
      </div>

      {/* Player Details */}
      <div className="bg-white shadow-md rounded-md mt-4">
        {/* Batsmen Details */}
        <div className="p-1">
          <h4 className="font-bold mb-2">Batsman</h4>
          <table className="w-full text-sm text-left border-t">
            <thead>
              <tr>
                <th className="py-1">Name</th>
                <th className="py-1">R</th>
                <th className="py-1">B</th>
                <th className="py-1">4s</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentBatsman === 1 ? "Tanzim Hasan Sakib*" : "Tanzim Hasan Sakib"}</td>
                <td>{batsman1run}</td>
                <td>{batsman1balls}</td>
                <td>{batsman1boundary}</td>
              </tr>
              <tr>
                <td>{currentBatsman === 2 ? "Towhid Hridoy*" : "Towhid Hridoy"}</td>
                <td>{batsman2run}</td>
                <td>{batsman2balls}</td>
                <td>{batsman2boundary}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bowler Details */}
        <div className="p-1">
          <h4 className="font-bold mb-2">Bowler</h4>
          <table className="w-full text-sm text-left border-t">
            <thead>
              <tr>
                <th className="py-1">Name</th>
                <th className="py-1">O</th>
                <th className="py-1">M</th>
                <th className="py-1">R</th>
                <th className="py-1">W</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentBowler === 1 ? "Nitish Kumar Reddy*" : "Nitish Kumar Reddy"}</td>
                <td>{bowler1Over}.{bowler1Balls}</td>
                <td>{bowler1Maiden}</td>
                <td>{bowler1Run}</td>
                <td>{bowler1Wicket}</td>
              </tr>
              <tr>
                <td>{currentBowler === 2 ? "Mayank Yadav*" : "Mayank Yadav"}</td>
                <td>{bowler2Over}.{bowler2Balls}</td>
                <td>{bowler2Maiden}</td>
                <td>{bowler2Run}</td>
                <td>{bowler2Wicket}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Extra Section */}
        <div className="p-1 border-t">
          <div className="flex justify-between items-center">
            <span className="font-bold">Extra:</span>
            <span className="text-gray-600">11 (b 0, lb 4, wd 6, nb 1, p 0)</span>
          </div>
        </div>

        
      </div>

      {/* Dropdown Controls */}
      <div className="mt-4">
        <select className="w-full p-2 border border-gray-300 rounded-md">
          <option>Bangladesh</option>
          <option>India</option>
        </select>
      </div>

      {/* Event Log */}
      <div className="mt-4 bg-white shadow-md rounded-md p-1">
  <h4 className="font-bold mb-2">Commentary</h4>
  {commentary.length > 0 ? (
    <ul className="text-sm text-gray-700">
      {commentary.map((comment, index) => (
        <li key={index} className="flex items-start space-x-2 mb-1">
          {/* <span className="text-green-500 font-bold flex-shrink-0">
            {overCount}.{ballsCount}
          </span> */}
          <span className="p-3 rounded-full bg-gray-200 text-center text-sm">{comment}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="px-16 py-3 rounded-full bg-gray-200 text-center text-sm">No commentary available yet.</p>
  )}
</div>
    </div>

    
  );
}



