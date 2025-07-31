// function Progress({ index, numQuestions, points, maxPossiblePoints }) {
//     return (
//        <header className = "progress" >
//         <progress max = { numQuestions } > value = { index + 1(answer !== null) }/>
//           <p> { " " }
//         Questions < strong > { index + 1 } </strong> / { numQuestions } { " " }
//         </p>{" "}

//        <p> { " " }
//         <strong > { points } </strong>/ { maxPossiblePoints } { " " }
//         </p>{" "}

//         </header >
//     );
// }
// export default Progress;

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={answer !== null ? index + 1 : index}
      />

      <p>
        Questions <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
