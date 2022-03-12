import { useEffect, useState } from "react";
import { NUMBER_OF_CELL, WORDS } from './constant';
import Cell from "./Cell";
import sound from './kela.mp3'

const App = () => {
  const audio = new Audio(sound);
  const defaultUserAnswer = WORDS.map(word => ({ ...word, isAnswered: false, answer: []}))
  const [userAnswers, setUserAnswers] = useState(defaultUserAnswer);
  const [selectedWord, setSelectedWord] = useState(defaultUserAnswer[0]);
  const [selectedIndex, setSelectedIndex] = useState(defaultUserAnswer[0]?.positions[0]);
  const [isComplete, setIsComplete] = useState(false);

  const nonAnsweredWords = userAnswers.filter(v => !v.isAnswered);
  const answeredIndices = userAnswers.filter(v => v.isAnswered).reduce(
    (acc, cv) => [...acc, ...cv.positions], []
  );
  
  const selectedWordNonAnsweredIndices = selectedWord?.positions.filter(v => !answeredIndices.includes(v));

  useEffect(() => {
    if (selectedWord.isAnswered && nonAnsweredWords?.length === 0) {
      audio.play();
      setIsComplete(true)
    } else if(selectedWord.isAnswered) {
      setSelectedWord(nonAnsweredWords[0])
    }
  }, [userAnswers]);

  useEffect(() => {
    if (answeredIndices.includes(selectedIndex) && !selectedWord.isAnswered) {
      setSelectedIndex(selectedWordNonAnsweredIndices[0]);
    } 
  }, [selectedWord]);

  return (
    <div className="container">
      <div className="relative">
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
      {isComplete && <div className="modal-div">
        <div className="modal">
          <p>You have won the game 🥳</p>
          <button className="btn" onClick={() => window.location.reload()}>Reset</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
