import { WORDS } from "./constant"

const Box = ({ index, userAnswers, setUserAnswers }) => {
  const indices = WORDS.reduce((acc, cv) => {
    let currentValPositions = cv.positions;
    acc = [...acc, ...currentValPositions];
    return acc;
  }, []);

  const handleChange = (e, word, index) => {
    let wordsInAnswers = userAnswers.filter((ans) =>
      ans.positions.includes(index)
    );
    for (let wordInAnswer of wordsInAnswers) {
      let idx = wordInAnswer.positions.indexOf(index);
      wordInAnswer.positions[idx] = e.target.value;
    }
    checkIfGuessed(word);
    const userAnswersClone = [...userAnswers];
    setUserAnswers(userAnswersClone);
  };

  const checkIfGuessed = (word) => {
    let userAnswer = userAnswers.find((ans) => ans.word == word);
    if (userAnswer.positions.join("") === userAnswer.word) {
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

  const findWord = (index) => {
    let wordAtIndex = WORDS.find((word) => word.positions.includes(index));
    return wordAtIndex?.word;
  };

  return (
    <input
      maxLength={1}
      readOnly={!isActive(index) || isCellAnswered(index)}
      className={`cell ${isActive(index) ? "active" : null} ${
        isCellAnswered(index) ? "answered" : null
      }`}
      onChange={(e) => handleChange(e, findWord(index), index)}
    />
  );
};

export default Box;