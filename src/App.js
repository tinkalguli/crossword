import { useState } from "react";
import { DEFAULT_USER_ANSWERS, NUMBER_OF_CELL } from './constant';
import Cell from "./Cell";

const App = () => {
  const [userAnswers, setUserAnswers] = useState(DEFAULT_USER_ANSWERS);

  return (
    <div className="container">
      <div className="sudoku">
        {
          Array(NUMBER_OF_CELL).fill("").map((_, i) => (
            <Cell
              key={i}
              index={i}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
