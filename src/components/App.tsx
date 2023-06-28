import React from 'react'
import "./App.css"
import Chart, { CategoryScale } from 'chart.js/auto'
import actualDial from './images/DialLarge.png'
import * as $ from "jquery"
import { Line, Bar } from "react-chartjs-2"
import './style.css'


//issue with scss 
// import './GaugeApp.module.scss'



Chart.register(CategoryScale)
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

interface IGaugeAppProps {
  description: string;
}

class App extends React.Component<IGaugeAppProps, MyState> {

  private myRef:any;

  constructor(props:any) {
    super(props);
    this.state = {
      name: "",
      namelength: 18, emotion: 0, hover: false, x: 0, y: 0, graph_data: {
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      },
      average_graph_data: {
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      }, highest_average_graph: {
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      },
    };
    this.changeRotation = this.changeRotation.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHoverTrue = this.changeHoverTrue.bind(this);
    this.changeHoverFalse = this.changeHoverFalse.bind(this);
    this.myRef = React.createRef();
  }

  private changeRotation(event:any) {
    if (this.state.hover == true) {
      let pos = (this.myRef.current.getBoundingClientRect());
      let centerY = pos['y'] + pos['height'];
      let centerX = pos['x'] + pos['width'] / 2;
      let deltaX = this.state.x - centerX;
      let deltaY = centerY - this.state.y;
      let percent = 100 - Math.atan2(deltaY, deltaX) / Math.PI * 100;
      if (percent > this.state.emotion) {
        this.setState({ emotion: Math.round(percent) });
      } else if (percent < this.state.emotion) {
        this.setState({ emotion: Math.round(percent) });
      }
    }
  }

  private changeHoverTrue(event:any) {
    // using one function to flip the state of hover breaks sometimes 
    this.setState({ hover: true });
  }

  private changeHoverFalse(event:any) {
    this.setState({ hover: false });
  }

  private changeName(event:any) {
    this.setState({ name: event.target.value });
    this.setState({ namelength: event.target.value.length });
  }

  private handleSubmit(event:any) {
    event.preventDefault();
    //idk if this data sending still works
    var formData = { Name: this.state.name, Emotion: Math.round(this.state.emotion) };
    $.ajax({
      contentType: 'application/json',
      type: "POST",
      url: "https://prod-25.canadacentral.logic.azure.com:443/workflows/c1b6486985c94f5784820815397ee551/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sBPca7dSN_oK626edJuaAQBvPtRAKCvlg12vmcBDvBs",
      data: JSON.stringify(formData),
    });
    alert("Done! Received: " + Math.round(this.state.emotion));
  }

   //requires the dataverse package
  private async handleSubmit2(event:any) {

    // event.preventDefault();
    // var formData = { Name: this.state.name, Emotion: Math.round(this.state.emotion).toString() };
    // var auth = createAuth();
    // const createResponse = await createRecord<Result>("result", formData)
    // alert("Done! Received: " + Math.round(this.state.emotion));
    // return createResponse;
  }

  public componentDidMount() {
    var person = "John";
  let url = "https://glockenspielproject.sharepoint.com/sites/glockenspielproject/_api/web/lists/getbytitle(%27Main%20Database%20List%27)/items?$filter=Title%20eq%20%27" + person + "%27&$select=Created,Emotion&$orderby=Created%20desc&$top10"
    let auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZ2xvY2tlbnNwaWVscHJvamVjdC5zaGFyZXBvaW50LmNvbUA0OTgwYTdmNC1iZjNiLTQ1M2QtOTFkOC0xOTAyMjc0ZDA4NjAiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBANDk4MGE3ZjQtYmYzYi00NTNkLTkxZDgtMTkwMjI3NGQwODYwIiwiaWF0IjoxNjMxMTIyMTUwLCJuYmYiOjE2MzExMjIxNTAsImV4cCI6MTYzMTIwODg1MCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA0OTgwYTdmNC1iZjNiLTQ1M2QtOTFkOC0xOTAyMjc0ZDA4NjAiLCJuYW1laWQiOiI2ZGQ4MzFhYi0xMWY5LTQxNDMtYTFiNy0yZDk3MzkxNjk0MDdANDk4MGE3ZjQtYmYzYi00NTNkLTkxZDgtMTkwMjI3NGQwODYwIiwib2lkIjoiNGRjZWFiZDgtZDgwYS00YWM3LWJiZWUtM2NlZDIzZjRmYzJhIiwic3ViIjoiNGRjZWFiZDgtZDgwYS00YWM3LWJiZWUtM2NlZDIzZjRmYzJhIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.nQ7-S98o4FWVzUunWizIDT0uq894etJ-PpEso9Bimhz2cm83h4tV17yiShobBmtI1Oncbuy5UuKc7BcqfOpRRGd6IEUBqJf0zBnu13m9SeAfvFRqjP37e3Xd6_F7p635SrUxr6NUdUymqdeVjXqrHYgNHNAzhFiXIgF2NXFARcxIE0SalO8T2o7fhEg44y-NjKRjtQhq9G0wdMtWSI1so01dGzCwD-If1ryGBTkcH5_fjQEuCXOWXnZO_ztmOu3VgqNs5aPYRxtQRvoioyh5oAaCXvMUPZ_lBUGOP-TsHImYq6TNcaN4lOxgr_ybF5jENjf3ZVlSfrYi1BbQ-Jz6VA"
    $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      type: "GET",
      url: url,
      headers: {
        Accept: "application/json; odata=verbose",
        Authorization: auth,
      },
      success: (data:any) => {
        data.d.results.forEach((entry:any) => {
          var result_data = entry;
          var response_date = result_data["Created"].substring(0, 10);
          var emotion_level = result_data["Emotion"];
          var current_data = this.state.graph_data;
          current_data.labels.unshift(response_date);
          current_data.datasets[0].data.unshift(emotion_level);
          this.setState({ graph_data: {} });
          this.setState({ graph_data: current_data });
        });
      }
    });

    // query average of all users 

    const days_back = 10;
    var d = new Date();
    d.setDate(d.getDate() - days_back);
    d.setHours(0, 0, 0, 0);
    var end_time = new Date(); 
    end_time.setDate(end_time.getDate() - 1); 
    end_time.setHours(0, 0, 0, 0);

    let average_url = "https://glockenspielproject.sharepoint.com/sites/glockenspielproject/_api/web/lists/getbytitle(%27Main%20Database%20List%27)/items?$filter=(Created ge datetime'" + d.toISOString() + "') and (Created lt datetime'" + end_time.toISOString() + "')&$select=Created,Emotion";
    $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      type: "GET",
      url: average_url,
      headers: {
        Accept: "application/json; odata=verbose",
        Authorization: auth,
      },
      success: (data:any) => {
        var average_info :any= {}

        for (var i = 0; i < 10; i++) {
          var a = new Date();
          a.setDate(a.getDate() - days_back + i);
          a.setHours(0, 0, 0, 0);
          var current_data = this.state.average_graph_data;
          current_data.labels.push(a.toISOString().substring(0, 10));
          this.setState({ average_graph_data: {} });
          this.setState({ average_graph_data: current_data });
          average_info[a.toISOString().substring(0, 10)] = { "sum": 0, "users": 0 };
        }

        data.d.results.forEach((entry:any) => {
          var result_data:any = entry;
          var date_created = result_data["Created"].substring(0, 10);
          var curr_sum = average_info[date_created]["sum"];
          var num_users = average_info[date_created]["users"];
          average_info[date_created] = { "sum": curr_sum + result_data["Emotion"], "users": num_users + 1 };
        });

        var current_data = this.state.average_graph_data;
        Object.keys(average_info).forEach(key => {
          if (average_info[key]["users"] == 0) {
            current_data.datasets[0].data.push(0);
          } else {
            current_data.datasets[0].data.push(average_info[key]["sum"] / average_info[key]["users"]);
          }
        });
        this.setState({ average_graph_data: {} });
        this.setState({ average_graph_data: current_data });
      }
    });


    // graph the top 5 averages for the past 30 days 

    var d = new Date();
    d.setDate(d.getDate() - 30);
    d.setHours(0, 0, 0, 0);

    let month_query_url = "https://glockenspielproject.sharepoint.com/sites/glockenspielproject/_api/web/lists/getbytitle(%27Main%20Database%20List%27)/items?$filter=Created ge datetime'" + d.toISOString() + "'&$select=Title,Emotion";
    $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      type: "GET",
      url: month_query_url,
      headers: {
        Accept: "application/json; odata=verbose",
        Authorization: auth,
      },
      success: (data:any) => {
        var emotion_data:any = {};
        data.d.results.forEach((entry:any) => {
          var result_data = entry;
          var name = entry["Title"];
          if (!(name in emotion_data)) {
            emotion_data[name] = { "sum": 0, "entries": 0 };
          }
          var curr_sum = emotion_data[name]["sum"];
          var num_entries = emotion_data[name]["entries"];
          emotion_data[name] = { "sum": curr_sum + entry["Emotion"], "entries": num_entries + 1 };
        });
        var results:any = [];
        Object.keys(emotion_data).forEach(key => {
          results.push({ "name": key, "average": emotion_data[key]["sum"] / emotion_data[key]["entries"] });
        });

        results.sort(function (a:any, b:any) {
          return a.average > b.average ? -1 : 1;
        });

        for(var i=0; i<Math.min(results.length, 5); i++) {
          var current_data = this.state.highest_average_graph; 
          current_data.labels.push(results[i]['name']); 
          current_data.datasets[0].data.push(results[i]['average']); 
          this.setState({ highest_average_graph : {} });
          this.setState({ highest_average_graph: current_data });
        }

      }
    });

  }

  //requires dataverse packages
  // private async _getAllData() {
  //   var auth = createAuth();
  //   var maxPageSize = 100;
  //   const records = await retrieveMultipleRecords<Result>(
  //     "Result",
  //     "?$select=emotion,name",
  //     maxPageSize);
  //   records.forEach((entry:any) => {
  //         var result_data = entry;
  //         //var response_date = result_data["Created"].substring(0, 10);
  //         var response_date = Date.now();
  //         var emotion_level = result_data["Emotion"];
  //         var current_data = this.state.graph_data;
  //         current_data.labels.unshift(response_date);
  //         current_data.datasets[0].data.unshift(emotion_level);
  //         this.setState({ graph_data: {} });
  //         this.setState({ graph_data: current_data });
  //   });


  //   const days_back = 10;
  //   var d = new Date();
  //   d.setDate(d.getDate() - days_back);
  //   d.setHours(0, 0, 0, 0);
  //   var end_time = new Date(); 
  //   end_time.setDate(end_time.getDate() - 1); 
  //   end_time.setHours(0, 0, 0, 0);

  //   var average_info:any = {}

  //   for (var i = 0; i < 10; i++) {
  //     var a = new Date();
  //     a.setDate(a.getDate() - days_back + i);
  //     a.setHours(0, 0, 0, 0);
  //     var current_data = this.state.average_graph_data;
  //     current_data.labels.push(a.toISOString().substring(0, 10));
  //     this.setState({ average_graph_data: {} });
  //     this.setState({ average_graph_data: current_data });
  //     average_info[a.toISOString().substring(0, 10)] = { "sum": 0, "users": 0 };
  //   }

  //   records.forEach((entry:any) => {
  //     var result_data = entry;
  //     var date_created = Date.now();
  //     var response_date = Date.now();
  //     var curr_sum = average_info[date_created]["sum"];
  //     var num_users = average_info[date_created]["users"];
  //     average_info[date_created] = { "sum": curr_sum + result_data["Emotion"], "users": num_users + 1 };
  //   });

  //   var current_data = this.state.average_graph_data;
  //   Object.keys(average_info).forEach(key => {
  //     if (average_info[key]["users"] == 0) {
  //       current_data.datasets[0].data.push(0);
  //     } else {
  //       current_data.datasets[0].data.push(average_info[key]["sum"] / average_info[key]["users"]);
  //     }
  //   });
  //   this.setState({ average_graph_data: {} });
  //   this.setState({ average_graph_data: current_data });
  //   // graph the top 5 averages for the past 30 days 

  //   var d = new Date();
  //   d.setDate(d.getDate() - 30);
  //   d.setHours(0, 0, 0, 0);

  //   var emotion_data:any = {};
  //   var results:any = [];
  //   results.forEach((entry:any) => {
  //     var result_data = entry;
  //     var name = entry["Title"];
  //     if (!(name in emotion_data)) {
  //       emotion_data[name] = { "sum": 0, "entries": 0 };
  //     }
  //     var curr_sum = emotion_data[name]["sum"];
  //     var num_entries = emotion_data[name]["entries"];
  //     emotion_data[name] = { "sum": curr_sum + entry["Emotion"], "entries": num_entries + 1 };
  //   });
  //   var results:any = [];
  //   Object.keys(emotion_data).forEach(key => {
  //     results.push({ "name": key, "average": emotion_data[key]["sum"] / emotion_data[key]["entries"] });
  //   });

  //   results.sort(function (a:any, b:any) {
  //     return a.average > b.average ? -1 : 1;
  //   });

  //   for(var i=0; i<Math.min(results.length, 5); i++) {
  //     var current_data = this.state.highest_average_graph; 
  //     current_data.labels.push(results[i]['name']); 
  //     current_data.datasets[0].data.push(results[i]['average']); 
  //     this.setState({ highest_average_graph : {} });
  //     this.setState({ highest_average_graph: current_data });
  //   }
  // }

  private _onMouseMove(e:any) {
    this.setState({ x: e.clientX, y: e.clientY });
  }

  //missing certain components but works 
  //and is able to render the inputs from gauge 2021
  public render(): React.ReactElement{
    return (
      <>
      <div className="content" >
  
        <h1>Daily Status</h1>
  
        <form action="" onSubmit={this.handleSubmit}>
  
          <div className="nameinput">
            <p> Hello </p>
            <input type="text" id="Name" placeholder="What is your name?" value={this.state.name} onChange={this.changeName} style={{ width: this.state.namelength + "ch" }} required />
            <p>! This is your personal tab! How are you feeling?</p>
          </div>
  
          <div className="gauge" id="gaugeId">
            <div className="gauge__body" ref={this.myRef} onMouseDown={this.changeHoverTrue} onMouseUp={this.changeHoverFalse} onMouseLeave={this.changeHoverFalse} onMouseMove={this.changeRotation}>
              <div className="gauge__fill" style={{ transform: "rotate(" + (this.state.emotion / 200) + "turn)" }}> </div>
              <div className="gauge__cover"> <img src = {actualDial} className = "gauge__dial" style={{ transform: "rotate(" + ((this.state.emotion / 200) - 0.25)  + "turn)" }}/></div>
            </div>
          </div>
  
          <div className="form">
            <button className="submitbutton" type="submit">Submit</button>
          </div>
  
        </form>
      
      </div>
      <div>
  
        <h2> My Logbook </h2>
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
        />
  
      </div>
    </>
    )
  }
}



export default App
