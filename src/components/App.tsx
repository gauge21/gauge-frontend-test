import { useState, useRef } from "react";
import "./App.css"
//issue with importing image
// import * as actualdial from 'src\components\DialLarge.png'


//render code from gauge 2021 without packages
function App() {

  return (
    <>
    <div className="content" >

      <h1>Daily Status</h1>

      <form action="" >

        <div className="nameinput">
          <p> Hello </p>
          <input type="text" id="Name" placeholder="What is your name?" />
          <p>! This is your personal tab! How are you feeling?</p>
        </div>

        <div className="gauge" id="gaugeId">
          <div className="gauge__body" >
            <div className="gauge__fill" > </div>
            <div className="gauge__cover"> </div>
          </div>
        </div>

        <div className="form">
          <button className="submitbutton" type="submit">Submit</button>
        </div>

      </form>
    
    </div>
    <div>

      <h2> My Logbook </h2>
      {/* <Line
        data={this.state.graph_data}
      /> */}

      <h2> Daily Average </h2>
      {/* <Line
        data={this.state.average_graph_data}
      /> */}

      <h2> Highest Average Emotion Over Past Month </h2>
      {/* <Bar
      data={this.state.highest_average_graph}
      /> */}

    </div>
  </>
  )

}

export default App
