import { useState } from "react";
import { DEFAULT_USER_ANSWERS, NUMBER_OF_BOX } from './constant';
import Box from "./Box";

const App = () => {
  const [userAnswers, setUserAnswers] = useState(DEFAULT_USER_ANSWERS);

  return (
    <div className="App">
      <div className="sudoku">
        {
          Array(NUMBER_OF_BOX).fill("").map((_, i) => (
            <Box
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
