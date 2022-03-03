import { WORDS } from "./constant"

const Cell = ({ index, userAnswers, setUserAnswers, setSelectedWord, selectedWord }) => {
  const indices = WORDS.reduce((acc, cv) => {
    let currentValPositions = cv.positions;
    acc = [...acc, ...currentValPositions];
    return acc;
  }, []);

  const matchingWords = (index) => userAnswers.filter((ans) =>
    ans.positions.includes(index)
  );

  const handleChange = (e, index) => {
    for (let wordInAnswer of matchingWords(index)) {
      let idx = wordInAnswer.positions.indexOf(index);
      wordInAnswer.answer[idx] = e.target.value;
      checkIfGuessed(wordInAnswer.word);
    }
    const userAnswersClone = [...userAnswers];
    setUserAnswers(userAnswersClone);
  };

  const onWordChange = (index) => {
    const words = matchingWords(index);
    setSelectedWord(selectedWord => {
      if(words.length > 1) {
        const similarWord = words.find(v => v.word == selectedWord.word);
        const unSelctedWord = words.find(v => v.word != similarWord?.word);
        return similarWord ? unSelctedWord : words[0];
      }

      return words[0];
    });
  }

  const checkIfGuessed = (word) => {
    let userAnswer = userAnswers.find((ans) => ans.word == word);
    if (userAnswer.answer.join("") === userAnswer.word) {
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
      maxLength={1}
      className={`cell ${isActive(index) ? "active" : ""}
      ${isCellAnswered(index) ? "answered" : ""} ${
        isSelectedByWord(index) ? "selected-word" : ""
      }`}
      disabled={!isActive(index) || isCellAnswered(index)}
      onChange={(e) => handleChange(e, index)}
      onClick={() => onWordChange(index)}
      oninput="this.value = this.value.toUpperCase()"
    />
  );
};

export default Cell;