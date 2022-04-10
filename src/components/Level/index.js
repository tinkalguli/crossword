import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { NUMBER_OF_CELL } from '../../utils/constant';
import sound from '../../common/audios/kela.mp3';

import Cell from "../Cell";
import KeyBoard from "../KeyBoard";
import Header from "./Header";
import Loader from "../Common/Loader";
import ResultModal from "./ResultModal";

const Level = ({ userAnswers, setUserAnswers }) => {
  const { id } = useParams();
  const audio = new Audio(sound);
  const [answers, setAnswers] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndexValue, setSelectedIndexValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(true);

  const setInitialData = () => {
    const value = userAnswers.find(value => value.id === id);
    const words = value.words;
    const final = words[0];
    console.log(userAnswers, value, words);

    setAnswers(value);
    setSelectedWord(final);
    setSelectedIndex(words[0]?.positions[0]);
  };

  useEffect(() => {
    userAnswers && setInitialData();
  }, [id]);
  
  useEffect(() => {
    if (!answers) return;

    let userAnswersClone = [...userAnswers];
    let selectedAnswers = userAnswersClone.find(value => value.id === answers.id);
    selectedAnswers.words = answers.words;
    selectedAnswers.isAnswered = answers.isAnswered;

    setUserAnswers(userAnswersClone);
  }, [answers]);

  const nonAnsweredWords = answers?.words?.filter(v => !v.isAnswered);
  const answeredIndices = answers?.words?.filter(v => v.isAnswered).reduce(
    (acc, cv) => [...acc, ...cv.positions], []
  );
  
  const selectedWordNonAnsweredIndices = selectedWord?.positions.filter(v => !answeredIndices.includes(v));

  const handleChange = async (value, index = selectedIndex) => {
    const answersClone = { ...answers };

    for (let wordInAnswer of matchingWords(index)) {
      let idx = wordInAnswer.positions.indexOf(index);
      wordInAnswer.answer[idx] = value;
      checkIfGuessed(wordInAnswer.word, answersClone);
    }
    const isLevelAnswered = answersClone.words.every(value => value.isAnswered);

    setIsComplete(isLevelAnswered);
    setSelectedIndexValue(value);
    value && goToNextCell(index);
    setAnswers({...answersClone, isAnswered: isLevelAnswered});
  };

  const matchingWords = (index) => {
    return answers.words.filter((ans) =>
      ans.positions.includes(index)
    )
  };

  const goToNextCell = (index) => {
    if (selectedWord.isAnswered) return;

    const nextIndex = selectedWordNonAnsweredIndices[findIndexOf(index, selectedWordNonAnsweredIndices) + 1];
    nextIndex !== undefined && setSelectedIndex(nextIndex);
  }

  const checkIfGuessed = (word, answers) => {
    let userAnswer = answers.words.find((ans) => ans.word === word);
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
    if (!answers || !selectedWord) return;
    console.log(answers)
    console.log(answers.isAnswered)

    if (isComplete) {
      audio.play();
    } else if(selectedWord.isAnswered && !answers.isAnswered) {
      setSelectedWord(nonAnsweredWords[0]);
    }
  }, [answers]);

  useEffect(() => {
    if (!selectedWord) return;

    if (answeredIndices.includes(selectedIndex) && !selectedWord.isAnswered) {
      setSelectedIndex(selectedWordNonAnsweredIndices[0]);
    } 
  }, [selectedWord]);

  if (!answers) {
    return <Loader />
  }

  return (
    <div className={`container ${isKeyBoardOpen ? "min-height-120" : "min-height-100"}`}>
      <Header answers={answers} setAnswers={setAnswers} selectedIndex={selectedIndex} selectedWord={selectedWord} />
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
                          answers={answers}
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
              </div>
            </TransformComponent>
            <div className="fixed-wrapper">
              <div className="flex zoom-btns">
                <i className="ri-zoom-out-line" onClick={() => zoomOut()}></i>
                <i className="ri-zoom-in-line" onClick={() => zoomIn()}></i>
              </div>
              {isKeyBoardOpen && <KeyBoard hint={selectedWord?.hint} isKeyBoardOpen={isKeyBoardOpen} setIsKeyBoardOpen={setIsKeyBoardOpen} onKeyPressed={handleChange} onBackSpace={goToPrevCell} />} 
            </div>
            {isComplete && <ResultModal id={id} setIsOpen={setIsComplete} />}
          </>)}
      </TransformWrapper>
    </div>
  );
}

export default Level;
