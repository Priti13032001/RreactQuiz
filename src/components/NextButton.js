// function NextButton({ dispatch, answer, index, numQuestions }) {
//   if (answer === null) return null;

//   if (index < numQuestions - 1)
//     return (
//       <button
//         className="btn btn-ui"
//         onClick={() => dispatch({ type: "nextQuestion" })}
//       >
//         Next{" "}
//       </button>
//     );

//   if (index === numQuestions - 1)
//     return (
//       <button
//         className="btn btn-ui"
//         onClick={() => dispatch({ type: "Finish" })}
//       >
//         Finish
//       </button>
//     );
// }

// export default NextButton;

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })} // ✅ fixed lowercase
      >
        Finish
      </button>
    );
}

export default NextButton;
