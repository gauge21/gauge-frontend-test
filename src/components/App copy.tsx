// https://fluentsite.z22.web.core.windows.net/quick-start
import { useState, useRef } from "react";
import "./App.css"



/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  
  
  var formInput = useRef()


  // here is where the backend portion to dataverse would go
  // 
  function sendToDataverse() {

    return (
      alert('This is where we would say data submitted successfully')
    );
  }

  return (
    <div>
      <h1>Form for name and grades</h1>
      <div className='data-submission'>
        <form ref={formInput.current} onSubmit={sendToDataverse}>
          <ul>
            <li className='half'>
              <input type='text' name="name" placeholder='type your name' required/>
            </li>
            <li className='half'>
              <input type='text' name="grade" placeholder='type your grade' required/>
            </li>
            <li>
              <input type='submit' className='submit-button' value='SEND'/>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )

}
