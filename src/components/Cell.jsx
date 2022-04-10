import { useState, useRef, useEffect } from "react";
import { WORDS } from "../utils/constant"

const Cell = ({
  index,
  answers,
  findIndexOf,
  selectedWord,
  matchingWords,
  selectedIndex,
  setSelectedWord,
  setSelectedIndex,
  selectedIndexValue,
  setSelectedIndexValue,
  setIsKeyBoardOpen,
}) => {
  const findValue = () => {
    const word = answers.words.filter(value => value.positions.includes(index))[0];
    if (!word) return "";
 
    return word.answer[findIndexOf(index, word.positions)];
  }
  const [value, setValue] = useState(findValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(findValue());
  }, [answers]);

  useEffect(() => {
    selectedIndex === index && inputRef.current.focus();
  }, [selectedIndex]);

  useEffect(() => {
    selectedIndex && setValue(selectedWord?.answer[findIndexOf(index)])
  }, [answers]);

  // useEffect(() => {
  //   selectedIndex === index && setValue(selectedIndexValue);
  // }, [selectedIndexValue]);

  const indices = WORDS.reduce((acc, cv) => {
    let currentValPositions = cv.positions;
    acc = [...acc, ...currentValPositions];
    return acc;
  }, []);

  const onWordChange = (index, canAlter=true) => {
    const words = matchingWords(index);
    if(words.length <= 1) return !canAlter && setSelectedWord(words[0]);

    setSelectedWord(selectedWord => {
      console.log("selectedWord", selectedWord);
      const similarWord = words.find(v => v.word === selectedWord.word);
      const unSelctedWord = words.find(v => v.word !== similarWord?.word);
      return (similarWord && canAlter) ? unSelctedWord : (similarWord || words[0]);
    });
  }

  const isCellAnswered = (index) => {
    let correctAnswers = answers.words.filter((ans) => ans.isAnswered);
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
      readOnly={true}
      className={`cell ${isActive(index) ? "active" : ""} ${
        isCellAnswered(index) ? "answered" : "" } ${
        isSelectedByWord(index) ? "selected-word" : ""} ${
        index === selectedIndex ? "focus" : ""
      }`}
      disabled={!isActive(index)}
      onClick={(e) => {
        setSelectedIndex(index)
        setIsKeyBoardOpen(true);
        setSelectedIndexValue(e.target.value)
        onWordChange(index)
      }}
      onFocus={(e) => {
        setSelectedIndex(index)
        setSelectedIndexValue(e.target.value)
        onWordChange(index, false)
      }}
    />
  );
};

export default Cell;