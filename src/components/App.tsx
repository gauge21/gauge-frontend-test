import { useContext, useState, useRef } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./Welcome.css";
import { app } from "@microsoft/teams-js";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import "./App.css"
import Chart, { CategoryScale } from 'chart.js/auto'
import actualDial from './images/DialLarge.png'
import * as $ from "jquery"
import { Line, Bar } from "react-chartjs-2"
import './style.css'


interface MyState {
    name: string;
    namelength: number;
    emotion: number;
    hover: boolean;
    x: number;
    y: number;
    graph_data: any;
    average_graph_data: any;
    highest_average_graph: any;
}

export function Welcome(props: { showFunction?: boolean; environment?: string }) {

    
//   const { showFunction, environment } = {
//     showFunction: true,
//     environment: window.location.hostname === "localhost" ? "local" : "azure",
//     ...props,
//   };
//   const friendlyEnvironmentName =
//     {
//       local: "local environment",
//       azure: "Azure environment",
//     }[environment] || "local environment";

//   const [selectedValue, setSelectedValue] = useState<TabValue>("local");

//   const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
//     setSelectedValue(data.value);
//   };
//   const { teamsUserCredential } = useContext(TeamsFxContext);
//   const { loading, data, error } = useData(async () => {
//     if (teamsUserCredential) {
//       const userInfo = await teamsUserCredential.getUserInfo();
//       return userInfo;
//     }
//   });
//   const userName = loading || error ? "" : data!.displayName;
//   const hubName = useData(async () => {
//     await app.initialize();
//     const context = await app.getContext();
//     return context.app.host.name;
//   })?.data;

  //code



  const [state, setState] = useState<MyState>({
    name: '',
    namelength: 0,
    emotion: 0,
    hover: false,
    x: 0,
    y: 0,
    graph_data: null,
    average_graph_data: null,
    highest_average_graph: null,
  });




  const [name, setName] = useState('');
  const [nameLength, setNameLength] = useState(0);

  const changeName = (event: any) => {
    const newName = event.target.value;
    setName(newName);
    setNameLength(newName.length);
  };



  const [hover, setHover] = useState(false);
  
  const changeHoverTrue = () => {
    setHover(true);
  };

  const changeHoverFalse = () => {
    setHover(false);
  };

  const myRef = useRef(null);

  const changeRotation = (event: any) => {
    // if (hover === true) {
    //   let pos = myRef.currentgetBoundingClientRect();
    //   let centerY = pos['y'] + pos['height'];
    //   let centerX = pos['x'] + pos['width'] / 2;
    //   let deltaX = state.x - centerX;
    //   let deltaY = centerY - state.y;
    //   let percent = 100 - Math.atan2(deltaY, deltaX) / Math.PI * 100;
    //   if (percent > state.emotion) {
    //     setState({ ...state, emotion: Math.round(percent) });
    //   } else if (percent < state.emotion) {
    //     setState({ ...state, emotion: Math.round(percent) });
    //   }
    // }
  };



  const handleSubmit = async (event: any) => {
    var user = useState(name); //need to fix name cuz its in a constructor
        var settings = {
        "url": "https://prod-20.canadacentral.logic.azure.com:443/workflows/21f3a6fbb57c42edb9afd96facc392d7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zIYk3io9aUYNMoD6xwG7q5j42zmht7HhwbAGEDM28O0",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "Daniel's Table": [
            {
                "name": user
            }]
        }),
    };
        
        $.ajax(settings).done(function (response) {
            alert(response);
        });
  }


  const _onMouseMove = (event: any) => {
    useState({ x: event.clientX, y: event.clientY });
  }

  return (
    <body>
        <div className="content" onMouseMove={_onMouseMove.bind(MouseEvent)}>
    
          <h1>Daily Status</h1>
    
          <form action="" onSubmit={handleSubmit}>
    
            <div className="nameinput">
              <p> Hello </p>
              <input type="text" id="Name" placeholder="What is your name?" value={state.name} onChange={changeName} style={{ width: state.namelength + "ch" }} required />
              <p>! This is your personal tab! How are you feeling?</p>
            </div>
    
            <div className="gauge" id="gaugeId">
              <div className="gauge__body" ref={myRef} onMouseDown={changeHoverTrue} onMouseUp={changeHoverFalse} onMouseLeave={changeHoverFalse} onMouseMove={changeRotation}>
                <div className="gauge__fill" style={{ transform: "rotate(" + (state.emotion / 200) + "turn)" }}> </div>
                <div className="gauge__cover"> <img src = {actualDial} className = "gauge__dial" style={{ transform: "rotate(" + ((state.emotion / 200) - 0.25)  + "turn)" }}/></div>
              </div>
            </div>
    
            <div className="form">
              <button className="submitbutton" type="submit">Submit</button>
            </div>
    
          </form>
        
        </div>
        <div>
    
          {/* <h2> My Logbook </h2>
          <Line
            data={this.state.graph_data}
          />
    
          <h2> Daily Average </h2>
          <Line
            data={this.state.average_graph_data}
          />
    
          <h2> Highest Average Emotion Over Past Month </h2>
          <Bar
          data={this.state.highest_average_graph}
          /> */}
    
        </div>
    </body>
    )
}
