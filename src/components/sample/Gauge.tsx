import { useEffect, useState } from "react";
import actualDial from './lib/images/DialLarge.png';
import * as $ from "jquery";

export default function Gauge() {
    const [name, setName] = useState('');
    const [namelength, setNameLength] = useState(18);
    const [hover, setHover] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [emotion, setEmotion] = useState(0);
    

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

      const _onMouseMove = (e:any) => {
        setX(e.clientX);
        setY(e.clientY);
      };

      const handleSubmit = async (event:any) => {
        event.preventDefault();
        var user = name;
        var numValue = emotion;
        var settings1 = {
          "url": "https://prod-20.canadacentral.logic.azure.com/workflows/21f3a6fbb57c42edb9afd96facc392d7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zIYk3io9aUYNMoD6xwG7q5j42zmht7HhwbAGEDM28O0",
          "method": "POST",
          "timeout": 0,
          "headers": {
          "Content-Type": "application/json"
          },
          "data": JSON.stringify({
            "Daniel's Table": [
              {
                "name": user,
                "numb value": numValue
              }
            ]
          }),
        };
        $.ajax(settings1).done(function (response) {
          console.log(response);
        });

        //Bruce this is ur get data glhf :))
        var settings2 = {
          "url": "https://org97ae3df4.api.crm3.dynamics.com/api/data/v9.2/cr3b4_danielstables?$top=10",
          "method": "GET",
          "timeout": 0,
          "headers": {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL29yZzk3YWUzZGY0LmFwaS5jcm0zLmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ5ODBhN2Y0LWJmM2ItNDUzZC05MWQ4LTE5MDIyNzRkMDg2MC8iLCJpYXQiOjE2OTA2NjI3ODIsIm5iZiI6MTY5MDY2Mjc4MiwiZXhwIjoxNjkwNjY3MDc2LCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFVBQUFBaDlST1ZpOGhDVVFQdGNYbGgySUcvbDlhMGFGMWsxWDdxeXNZaHJyVUZrMFRuMVR1cjJQSTA3bW1Tb0ZHL2s5bFdZNnI5QU1iMm0yTUJxQW1YRTE0Ky81RjlKdWFUUDBTV2pDNFkvZUxMckk9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTGkiLCJnaXZlbl9uYW1lIjoiWXVwZW5nIiwiaXBhZGRyIjoiMjYwNzpmZWE4OjRjMjA6OTY1MDo2NDg3OjJkMWE6NGEzZDpjMDU2IiwibmFtZSI6Ill1cGVuZyBMaSIsIm9pZCI6IjNmNmExYWQ3LTg1MjktNGRkMC1hYjJhLTM1N2EwNmI1ZjkyYyIsInB1aWQiOiIxMDAzMjAwMjlDNTc1RTc2IiwicmgiOiIwLkFYMEE5S2VBU1R1X1BVV1IyQmtDSjAwSVlBY0FBQUFBQUFBQXdBQUFBQUFBQUFCOUFQUS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJfanJxcEhOOU9uR0hEd19jZVoxN29xQlc4eHo2Slp0dnRDVFptVnRxdlJFIiwidGlkIjoiNDk4MGE3ZjQtYmYzYi00NTNkLTkxZDgtMTkwMjI3NGQwODYwIiwidW5pcXVlX25hbWUiOiJZdXBlbmcuTGlAZ2xvY2tlbnNwaWVscHJvamVjdC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJZdXBlbmcuTGlAZ2xvY2tlbnNwaWVscHJvamVjdC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJfeVlQN01JTE9rbTJwNWMtMV85TkFBIiwidmVyIjoiMS4wIiwieG1zX2NhZSI6IjEifQ.SF2nRzK6Sfx4ok-oGNHXkL6i-I4QFyDib-jzsQbYda0z5ZoEatpPDzGRdT9eVrmImgqj1R1cenpBrYUtOAAC_loNN84LQxSWL5OxF6McTYJrSvCs1JXEgh7ixTRA9NCq6pePm8W4sQHNWY6ayKJiP9AvNvcUcGsnRzbJXpK5zn6kgd0ljAZxhild7EEBzbsObZcnH79HfmLPke2mESCkD01JSKhV7PnrZemuGSVCXqp8706DEDogujxPbcM5Jx5K2TrLuIws6fy8cav0CSvxvuKjB_rUdo__5M-_1MOCs4zCj7YFAs1DoLCSfbQin7YMOkmuVcrwnGsqNxcUZ7Wy4A",
            "Cookie": "ARRAffinity=89110369efe658c702b70d8d765fed5f1f010737f681eebcf3db2a1fa6a86e1f15134d20c556b0b34b9b6ae43ec3f5dcdad61788de889ffc592af7aca85fc1c508DB9077BF8328BD1992382773; ReqClientId=758b101b-657c-46ca-9cb5-c313a390dc0f; orgId=d84bb74e-4efb-ed11-a66d-000d3a0a02f1"
          },
        };
        $.ajax(settings2).done(function (response) {
          //Bruce u need to save the response somehow
          var responseString = JSON.stringify(response);
          console.log(responseString);
          //// if u want to use array?
          // var dataArray = response.value;
          // console.log(dataArray);
        });
      };


      const changeName = (event:any) => {
        setName(event.target.value);
        setNameLength(event.target.value.length);
      };

    return(
        <div className="content" onMouseMove={_onMouseMove}>
        <h1>Daily Status</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="nameinput">
            {/* <p> Hello {userName ? ", " + userName : ""}</p> */}
            {/* <input
              type="text"
              id="Name"
              placeholder="What is your name?"
              value={name}
              onChange={changeName}
              style={{ width: namelength + 'ch' }}
              required
            /> */}
            <p>This is your personal tab! How are you feeling?</p>
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
              <div className="gauge__fill" style={{transform: `rotate(${emotion / 200}turn)`}}> </div>
              <div className="gauge__cover"> <img src={actualDial} className="gauge__dial" style={{ transform: `rotate(${(emotion / 200) - 0.25}turn)` }} /></div>
            </div>
          </div>
          <div className="form">
            <button className="submitbutton" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
}