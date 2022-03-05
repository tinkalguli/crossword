import { useState, useRef, useEffect } from "react";
import { WORDS } from "./constant"

const Cell = ({
  index,
  userAnswers,
  setUserAnswers,
  setSelectedWord,
  selectedWord,
  selectedIndex,
  setSelectedIndex,
}) => {
  const currentPositionIndex = (index) => selectedWord.positions.indexOf(index);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  
  useEffect(() => {
    selectedIndex === index && inputRef.current.focus();
  }, [selectedIndex]);

  useEffect(() => {
    selectedIndex && setValue(selectedWord?.answer[currentPositionIndex(index)])
  }, [userAnswers]);
  
  const indices = WORDS.reduce((acc, cv) => {
    let currentValPositions = cv.positions;
    acc = [...acc, ...currentValPositions];
    return acc;
  }, []);
  
  const matchingWords = (index) => userAnswers.filter((ans) =>
    ans.positions.includes(index)
  );

  const handleChange = async (value, index) => {
    const inputValue = value.substr(value.length - 1);
    for (let wordInAnswer of matchingWords(index)) {
      let idx = wordInAnswer.positions.indexOf(index);
      wordInAnswer.answer[idx] = inputValue;
      checkIfGuessed(wordInAnswer.word);
    }
    const userAnswersClone = [...userAnswers];
    setValue(inputValue);
    value && goToNextCell(index);
    setUserAnswers(userAnswersClone);
  };

  const goToNextCell = (index) => {
    const nextIndex = selectedWord.positions[currentPositionIndex(index) + 1];
    nextIndex !== undefined && setSelectedIndex(nextIndex);
  }

  const goToPrevCell = (e, index) => {
    if (e.keyCode !== 8) return null;
    if (e.target.value) return handleChange("", index);

    const prevIndex = selectedWord.positions[currentPositionIndex(index) - 1];
    prevIndex !== undefined && handleChange("", prevIndex).then(() => setSelectedIndex(prevIndex));
  }

  const onWordChange = (index, canAlter=true) => {
    const words = matchingWords(index);
    if(words.length <= 1) return !canAlter && setSelectedWord(words[0]);

    setSelectedWord(selectedWord => {
      const similarWord = words.find(v => v.word === selectedWord.word);
      const unSelctedWord = words.find(v => v.word !== similarWord?.word);
      return (similarWord && canAlter) ? unSelctedWord : (similarWord || words[0]);
    });
  }

  const checkIfGuessed = (word) => {
    let userAnswer = userAnswers.find((ans) => ans.word === word);
    if (userAnswer.answer.join("").toLowerCase() === userAnswer.word) {
      userAnswer.isAnswered = true;
    }
  };

  const isCellAnswered = (index) => {
    let correctAnswers = userAnswers.filter((ans) => ans.isAnswered);
    for (let i = 0; i < correctAnswers.length; i++) {
      if (
        WORDS
          .filter((ans) => ans.word === correctAnswers[i].word)[0]
          .positions.includes(index)
      ) {
        return true;
      }
    }
  };
  
  const isActive = (i) => indices.includes(i);

  const isSelectedByWord = (i) => selectedWord?.positions?.includes(i);

  return (
    <input
      value={value}
      ref={inputRef}
      className={`cell ${isActive(index) ? "active" : ""} ${
        isCellAnswered(index) ? "answered" : "" } ${
        isSelectedByWord(index) ? "selected-word" : ""} ${
        index === selectedIndex ? "focus" : ""
      }`}
      disabled={!isActive(index) || isCellAnswered(index)}
      onChange={(e) => handleChange(e.target.value, index)}
      onClick={() => onWordChange(index)}
      onFocus={() => {
        setSelectedIndex(index)
        onWordChange(index, false)
      }}
      onKeyDown={(e) => goToPrevCell(e, index)}
    />
  );
};

export default Cell;