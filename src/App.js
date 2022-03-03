import { useState } from "react";
import { NUMBER_OF_CELL, WORDS } from './constant';
import Cell from "./Cell";

const App = () => {
  const defaultUserAnswer = WORDS.map(word => ({ ...word, isAnswered: false, answer: []}))
  const [userAnswers, setUserAnswers] = useState(defaultUserAnswer);
  const [selectedWord, setSelectedWord] = useState(WORDS[0]);

  return (
    <div className="container">
      <div>
        <div className="game">
          {
            Array(NUMBER_OF_CELL).fill("").map((_, i) => (
              <Cell
                key={i}
                index={i}
                userAnswers={userAnswers}
                selectedWord={selectedWord}
                setUserAnswers={setUserAnswers}
                setSelectedWord={setSelectedWord}
              />
            ))
          }
        </div>
        <p className="hint">{selectedWord.hint}</p>
      </div>
    </div>
  );
}

export default App;
