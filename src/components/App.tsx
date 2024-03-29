import React, { useState, useEffect, useRef, useContext } from 'react';
import "./App.css";
import Chart, { CategoryScale } from 'chart.js/auto';
import * as $ from "jquery";
import './style.css';
import Charts from './sample/Charts'

// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";



Chart.register(CategoryScale);

const App = (props: { showFunction?: boolean; environment?: string }) => {
  
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });
  useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        app.notifySuccess();
      });
  }, [loading]);

  const myRef = useRef($.event);

  return (
    <body>
      <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {!loading && (
            <Routes>
              {/* <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} /> */}
              <Route path="/tab" element={<Tab />} />
              {/* <Route path="/config" element={<TabConfig />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route> */}
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
    <Charts ></Charts>
    </body>
  );
};

export default App;
