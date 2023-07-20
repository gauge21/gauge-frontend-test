import React, { useState, useEffect, useRef, useContext } from 'react';
import "./App.css";
import Chart, { CategoryScale } from 'chart.js/auto';
import actualDial from './images/DialLarge.png';
import * as $ from "jquery";
import { Line, Bar } from "react-chartjs-2";
import './style.css';
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";

Chart.register(CategoryScale);

const App = (props: { showFunction?: boolean; environment?: string }) => {

    const { showFunction, environment } = {
        showFunction: true,
        environment: window.location.hostname === "localhost" ? "local" : "azure",
        ...props,
      };
      const friendlyEnvironmentName =
        {
          local: "local environment",
          azure: "Azure environment",
        }[environment] || "local environment";
    
      const [selectedValue, setSelectedValue] = useState<TabValue>("local");
    
      const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
      };
      const { teamsUserCredential } = useContext(TeamsFxContext);
      const { loading, data, error } = useData(async () => {
        if (teamsUserCredential) {
          const userInfo = await teamsUserCredential.getUserInfo();
          return userInfo;
        }
      });
      const userName = loading || error ? "" : data;
      const hubName = useData(async () => {
        await app.initialize();
        const context = await app.getContext();
        return context.app.host.name;
      })?.data;


  const [name, setName] = useState('');
  const [namelength, setNameLength] = useState(18);
  const [emotion, setEmotion] = useState(0);
  const [hover, setHover] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Emotion',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [averageGraphData, setAverageGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Emotion',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [highestAverageGraph, setHighestAverageGraph] = useState({
    labels: [],
    datasets: [
      {
        label: 'Emotion',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  const myRef = useRef($.event);

  useEffect(() => {
    // componentDidMount equivalent
    // Fetch data and set the state for graphData, averageGraphData, and highestAverageGraph
    // ...

    // Add event listener to handle mouse move
    document.addEventListener('mousemove', _onMouseMove);

    // componentWillUnmount equivalent
    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener('mousemove', _onMouseMove);
    };
  }, []);

  const changeRotation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hover === true) {
      let pos = (event.currentTarget as HTMLDivElement).getBoundingClientRect(); // Use optional chaining to handle cases when myRef.current is null
      if (pos) {
        let centerY = pos['y'] + pos['height'];
        let centerX = pos['x'] + pos['width'] / 2;
        let deltaX = x - centerX;
        let deltaY = centerY - y;
        let percent = 100 - (Math.atan2(deltaY, deltaX) / Math.PI) * 100;
        if (percent > emotion) {
          setEmotion(Math.round(percent));
        } else if (percent < emotion) {
          setEmotion(Math.round(percent));
        }
      }
    }
  };

  const changeHoverTrue = (event:any) => {
    setHover(true);
  };

  const changeHoverFalse = (event:any) => {
    setHover(false);
  };

  const changeName = (event:any) => {
    setName(event.target.value);
    setNameLength(event.target.value.length);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    var user = name;
    var settings = {
      url: 'https://prod-20.canadacentral.logic.azure.com:443/workflows/21f3a6fbb57c42edb9afd96facc392d7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zIYk3io9aUYNMoD6xwG7q5j42zmht7HhwbAGEDM28O0',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        "Daniel's Table": [
          {
            name: user,
          },
        ],
      }),
    };

  };

  const _onMouseMove = (e:any) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  return (
    <body>
      <div className="content" onMouseMove={_onMouseMove}>
        <h1>Daily Status</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="nameinput">
            <p> Hello {userName ? ", " + userName : ""}</p>
            {/* <input
              type="text"
              id="Name"
              placeholder="What is your name?"
              value={name}
              onChange={changeName}
              style={{ width: namelength + 'ch' }}
              required
            /> */}
            <p>! This is your personal tab! How are you feeling?</p>
          </div>
          <div className="gauge" id="gaugeId">
            <div
              className="gauge__body"
            //   ref={myRef}
              onMouseDown={changeHoverTrue}
              onMouseUp={changeHoverFalse}
              onMouseLeave={changeHoverFalse}
              onMouseMove={changeRotation}
            >
              <div className="gauge__fill" style={{ transform: `rotate(${emotion / 200}turn)` }}> </div>
              <div className="gauge__cover"> <img src={actualDial} className="gauge__dial" style={{ transform: `rotate(${(emotion / 200) - 0.25}turn)` }} /></div>
            </div>
          </div>
          <div className="form">
            <button className="submitbutton" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <h2> My Logbook </h2>
        <Line data={graphData} />
        <h2> Daily Average </h2>
        <Line data={averageGraphData} />
        <h2> Highest Average Emotion Over Past Month </h2>
        <Bar data={highestAverageGraph} />
      </div>
    </body>
  );
};

export default App;
