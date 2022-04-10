import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LEVELS } from "../utils/constant";

import Level from "./Level";
import LevelList from "./LevelList";

const App = () => {
  const localStorageData = JSON.parse(localStorage.getItem("axom_crossword_data"));
  console.log(localStorageData);
  const defaultUserAnswer = LEVELS.map(level => {
    const words = level.words.map(word => ({ ...word, isAnswered: false, answer: []}));
    return { ...level, words: words };
  });
  const [userAnswers, setUserAnswers] = useState(!localStorageData || localStorageData == "null" ? defaultUserAnswer : localStorageData);

  useEffect(() => {
    return () => {
      localStorage.setItem("axom_crossword_data", JSON.stringify(userAnswers));
    }
  });

  return <Routes>
    <Route exact path="/" element={<LevelList userAnswers={userAnswers} />} />
    <Route exact path="/:id" element={<Level userAnswers={userAnswers} setUserAnswers={setUserAnswers} />} />
    <Route exact path="*" element={<LevelList userAnswers={userAnswers} />} />
  </Routes>
}

export default App;
