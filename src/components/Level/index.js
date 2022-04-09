import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { LEVELS, NUMBER_OF_CELL, WORDS } from '../../utils/constant';
import sound from '../../common/audios/kela.mp3';

import Cell from "../Cell";
import KeyBoard from "../KeyBoard";
import Header from "./Header";
import Loader from "../Common/Loader";

const Level = () => {
  const { id } = useParams();
  const audio = new Audio(sound);
  const defaultUserAnswer = WORDS.map(word => ({ ...word, isAnswered: false, answer: []}))
  const [userAnswers, setUserAnswers] = useState(defaultUserAnswer);
  const [selectedWord, setSelectedWord] = useState(defaultUserAnswer[0]);
  const [selectedIndex, setSelectedIndex] = useState(defaultUserAnswer[0]?.positions[0]);
  const [selectedIndexValue, setSelectedIndexValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(true);
  const [level, setLevel] = useState(null);

  const fetchLevel = () => {
    const value = LEVELS.find(value => value.id === id);
    setLevel(value);
  }

  useEffect(() => {
    fetchLevel();
  }, [])
  

  const nonAnsweredWords = userAnswers.filter(v => !v.isAnswered);
  const answeredIndices = userAnswers.filter(v => v.isAnswered).reduce(
    (acc, cv) => [...acc, ...cv.positions], []
  );
  
  const selectedWordNonAnsweredIndices = selectedWord?.positions.filter(v => !answeredIndices.includes(v));

  const handleChange = async (value, index = selectedIndex) => {
    const userAnswersClone = [...userAnswers];

    for (let wordInAnswer of matchingWords(index)) {
      let idx = wordInAnswer.positions.indexOf(index);
      wordInAnswer.answer[idx] = value;
      checkIfGuessed(wordInAnswer.word, userAnswersClone);
    }
    setSelectedIndexValue(value);
    value && goToNextCell(index);
    setUserAnswers(userAnswersClone);
  };

  const matchingWords = (index) => userAnswers.filter((ans) =>
    ans.positions.includes(index)
  );

  const goToNextCell = (index) => {
    if (selectedWord.isAnswered) return;

    const nextIndex = selectedWordNonAnsweredIndices[findIndexOf(index, selectedWordNonAnsweredIndices) + 1];
    nextIndex !== undefined && setSelectedIndex(nextIndex);
  }

  const checkIfGuessed = (word, userAnswers) => {
    let userAnswer = userAnswers.find((ans) => ans.word === word);
    if (userAnswer.answer.join("").toLowerCase() === userAnswer.word) {
      userAnswer.isAnswered = true;
    }
  };

  const findIndexOf = (index, indices = selectedWord.positions) => indices.indexOf(index);

  const goToPrevCell = (index = selectedIndex) => {
    if (selectedWord.isAnswered) return;
    if (selectedIndexValue) return handleChange("", index);

    const prevIndex = selectedWordNonAnsweredIndices[findIndexOf(index, selectedWordNonAnsweredIndices) - 1];
    prevIndex !== undefined && handleChange("", prevIndex).then(() => setSelectedIndex(prevIndex));
  }

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

  if (!level) {
    return <Loader />
  }

  return (
    <div className={`container ${isKeyBoardOpen ? "min-height-120" : "min-height-100"}`}>
      <Header level={level} />
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <TransformComponent>
              <div className="flex justify-center full-w-h">
                <div className="relative">
                  <div className="flex game">
                    {
                      Array(NUMBER_OF_CELL).fill("").map((_, i) => (
                        <Cell
                          key={i}
                          index={i}
                          userAnswers={userAnswers}
                          findIndexOf={findIndexOf}
                          selectedWord={selectedWord}
                          selectedIndex={selectedIndex}
                          matchingWords={matchingWords}
                          setSelectedWord={setSelectedWord}
                          setSelectedIndex={setSelectedIndex}
                          setIsKeyBoardOpen={setIsKeyBoardOpen}
                          selectedIndexValue={selectedIndexValue}
                          setSelectedIndexValue={setSelectedIndexValue}
                        />
                      ))
                    }
                  </div>
                </div>
                
                {isComplete && <div className="flex modal-div">
                  <div className="modal">
                    <p>You have won the game 🥳</p>
                    <button className="btn" onClick={() => window.location.reload()}>Reset</button>
                  </div>
                </div>}
              </div>
            </TransformComponent>
            <div className="fixed-wrapper">
              <div className="flex zoom-btns">
                <i className="ri-zoom-out-line" onClick={() => zoomOut()}></i>
                <i className="ri-zoom-in-line" onClick={() => zoomIn()}></i>
              </div>
              {isKeyBoardOpen && <KeyBoard hint={selectedWord?.hint} isKeyBoardOpen={isKeyBoardOpen} setIsKeyBoardOpen={setIsKeyBoardOpen} onKeyPressed={handleChange} onBackSpace={goToPrevCell} />} 
            </div>
          </>)}
      </TransformWrapper>
    </div>
  );
}

export default Level;
