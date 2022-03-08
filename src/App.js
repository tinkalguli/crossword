import { useEffect, useState } from "react";
import { NUMBER_OF_CELL, WORDS } from './constant';
import Cell from "./Cell";

const App = () => {
  const defaultUserAnswer = WORDS.map(word => ({ ...word, isAnswered: false, answer: []}))
  const [userAnswers, setUserAnswers] = useState(defaultUserAnswer);
  const [selectedWord, setSelectedWord] = useState(WORDS[0]);
  const [selectedIndex, setSelectedIndex] = useState(WORDS[0]?.positions[0]);

  const nonAnsweredWords = userAnswers.filter(v => !v.isAnswered);
  const answeredIndices = userAnswers.filter(v => v.isAnswered).reduce(
    (acc, cv) => [...acc, ...cv.positions], []
  );
  
  const selectedWordNonAnsweredIndices = selectedWord.positions.filter(v => !answeredIndices.includes(v));

  useEffect(() => {
    if (selectedWord && nonAnsweredWords?.length === 0) alert("You have won the game");

    if(selectedWord.isAnswered) setSelectedWord(nonAnsweredWords[0]);
  }, [userAnswers]);

  useEffect(() => {
    if (answeredIndices.includes(selectedIndex) && !selectedWord.isAnswered) {
      setSelectedIndex(selectedWordNonAnsweredIndices[0]);
    } 
  }, [selectedWord])

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
                selectedIndex={selectedIndex}
                setUserAnswers={setUserAnswers}
                setSelectedWord={setSelectedWord}
                setSelectedIndex={setSelectedIndex}
                selectedWordNonAnsweredIndices={selectedWordNonAnsweredIndices}
              />
            ))
          }
        </div>
        <p className="hint">{selectedWord?.hint}</p>
      </div>
    </div>
  );
}

export default App;
