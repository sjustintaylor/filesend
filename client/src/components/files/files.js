import React from "react";
import Panel from "components/atoms/panel";
import useHooks from "./hooks";
import "./files.css";

export const Files = () => {
  // const {} = useHooks();
  return (
    <div className="files">
      <Panel className="files--panel files--downloads">
        <h4 className="files--heading">Your active links</h4>
      </Panel>
      <Panel className="files--panel files--upload">
        <h4 className="files--heading">Upload a new file</h4>
      </Panel>
    </div>
  );
};
