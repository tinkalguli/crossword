import { Route, Routes } from "react-router-dom";

import Level from "./Level";
import LevelList from "./LevelList";

const App = () => {
  return <Routes>
    <Route exact path="/" element={<LevelList />} />
    <Route exact path="/:id" element={<Level />} />
    {/* <Route exact path="*" element={LevelList} /> */}
  </Routes>
}

export default App;
