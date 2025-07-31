//import Options from "./Options";

// function Question({ question, dispatch, answer }) {
//   return (
//     <div>
//       <h4>{question.question}</h4>
//       <Options question={question} dispatch={dispatch} answer={answer} />
//     </div>
//   );
// }

// export default Question;

import Options from "./Options";

function Question({ question, dispatch, answer }) {
  if (!question) return null;

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
