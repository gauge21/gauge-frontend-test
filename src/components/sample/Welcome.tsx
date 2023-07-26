import { useContext, useState } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { app } from "@microsoft/teams-js";
import { AzureFunctions } from "./AzureFunctions";
import { Graph } from "./Graph";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";
import Gauge from "./Gauge";

export function Welcome(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };

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
  const userName = loading || error ? "" : data!.displayName;


  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1 className="center">Welcome{userName ? ", " + userName : ""}!</h1>
        <div>
          {selectedValue === "local" && (
            <div>
              <Graph />
              {showFunction && <AzureFunctions />}
            </div>
          )}
          {/* {selectedValue === "azure" && (
            <div>
              <Deploy />
            </div>
          )}
          {selectedValue === "publish" && (
            <div>
              <Publish />
            </div>
          )} */}
        </div>
          <Gauge></Gauge>
      </div>
    </div>
  );
}
