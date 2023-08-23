import { useContext, useEffect, useState } from "react";
import actualDial from './lib/images/DialLarge.png';
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";
import { addUserData } from "../../server/api-clients";

export default function Gauge() {

    const [hover, setHover] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [emotion, setEmotion] = useState(0);
    
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
      if (teamsUserCredential) {
        const userInfo = await teamsUserCredential.getUserInfo();
        return userInfo;
      }
    });
    const userName = loading || error ? "" : data!.displayName;

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
        const userInfo = {
          "ID": 1, 
          "Name": userName,
          "Emotion": emotion
        }
        addUserData(userInfo)
      };

    return(
        <div className="content" onMouseMove={_onMouseMove}>
        <h1>Daily Status</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="nameinput">
            <p>This is your personal tab! How are you feeling?</p>
          </div>
          <div className="gauge" id="gaugeId">
            <div
              className="gauge__body"
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