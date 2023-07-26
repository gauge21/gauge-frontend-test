import "./Graph.css";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Button } from "@fluentui/react-components";
import { Design } from "./Design";
import { PersonCardFluentUI } from "./PersonCardFluentUI";
import { PersonCardGraphToolkit } from "./PersonCardGraphToolkit";
import { useContext } from "react";
import { TeamsFxContext } from "../Context";


export function Graph() {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, error, data, reload } = useGraphWithCredential(
    async (graph, teamsUserCredential, scope) => {
      // Call graph api directly to get user profile information
      const profile = await graph.api("/me").get();

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsUserCredential, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = "";
      try {
        const photo = await graph.api("/me/photo/$value").get();
        photoUrl = URL.createObjectURL(photo);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl };
    },
    { scope: ["User.Read"], credential: teamsUserCredential }
  );

  return (
    <div>
      <div className="section-margin">
        <Button appearance="primary" disabled={loading} onClick={reload}>
          Click Here to Login
        </Button>
        <PersonCardFluentUI loading={loading} data={data} error={error} />
      </div>
    </div>
  );
}
