import { LEVELS } from "../../utils/constant";

import LevelCard from "./LevelCard";

const LevelList = () => {
  return <div>
    <h1 className="title">শব্দৰ কোলাহল</h1>
    <div className="flex flex-column">
      {
        LEVELS.map((level) => <LevelCard key={level.id} level={level} />)
      }
    </div>
  </div>
}

export default LevelList;
