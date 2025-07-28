import { useState } from "react";
import TreeSearch from './tree-search/index';
import "./index.scss";

function InfomationStatistics() {
  const [state, setstate] = useState(0);

  return (
    <div className="infomation-statistics">
      <TreeSearch />
      <div className="right-content"></div>
    </div>
  );
}

export default InfomationStatistics;
