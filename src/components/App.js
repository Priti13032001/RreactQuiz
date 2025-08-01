// import { useEffect, useReducer } from "react";
// import Header from "./Header";
// import Main from "./Main";
// import Loader from "./Loader";
// import Error from "./Error";
// import StartScreen from "./StartScreen";
// import Question from "./Question";
// import NextButton from "./NextButton";
// import Progress from "./Progress";
// import FinishScreen from "./FinishScreen";

// const initialState = {
//   questions: [],
//   // loading | error | ready | active | finished
//   status: "loading",
//   index: 0,
//   answer: null,
//   points: 0,
//   highscore: 0,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return {
//         ...state,
//         questions: action.payload, // store data in state
//         status: "ready",
//       };
//     case "dataFailed":
//       return {
//         ...state,
//         status: "error",
//       };

//     case "start":
//       return {
//         ...state,
//         status: "active",
//       };

//     case "newAnswer":
//       const question = state.questions.at(state.index);
//       return {
//         ...state,
//         answer: action.payload,
//         points:
//           action.payload === question.correctOption
//             ? state.points + question.points
//             : state.points,
//       };

//     case "nextQuestion":
//       return {
//         ...state,
//         index: state.index + 1,
//         answer: null,
//       };

//     case "finish":
//       return {
//         ...state,
//         status: "finished",
//         highscore:
//           state.points > state.highscore ? state.points : state.highscore,
//       };

//     // case "restart":
//     //   return {
//     //     ...initialState,
//     //     questions: state.questions,
//     //     status: "ready",
//     //   };

//     case "restart":
//       return {
//         ...state,
//         status: "active",
//         index: 0,
//         answer: null,
//         points: 0,
//       };

//     // return {
//     //   ...state,
//     //   points: 0,
//     //   highscore: 0,
//     //   index: 0,
//     //   answer: null,
//     //   status: "ready",
//     // };

//     default:
//       throw new Error("Action unknown");
//   }
// }

// export default function App() {
//   const [{ questions, status, index, answer, points, highscore }, dispatch] =
//     useReducer(reducer, initialState);
//   const numQuestions = questions.length;

//   const maxPossiblePoints = questions.reduce(
//     (prev, cur) => prev + cur.points,
//     0
//   );

//   useEffect(function () {
//     fetch("http://localhost:9000/questions")
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: "dataReceived", payload: data })) // ✅ pass data
//       .catch((err) => {
//         console.error("Error", err);
//         dispatch({ type: "dataFailed" }); // optional: handle error
//       });
//   }, []);

//   return (
//     <div className="app">
//       <Header />
//       <Main className="main">
//         {" "}
//         {status === "loading" && <Loader />} {status === "error" && <Error />}{" "}
//         {
//           status === "ready" && (
//             <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
//           )
//           // && (
//           //   <>
//           //     <p>1/{questions.length}</p>
//           //     <p>{questions[0]?.question || "No question found"}</p>
//           //   </>
//           // )
//         }
//         {status === "active" && (
//           <>
//             <Progress
//               index={index}
//               numQuestions={numQuestions}
//               points={points}
//               maxPossiblePoints={maxPossiblePoints}
//               answer={answer}
//             />
//             <Question
//               question={questions[index]}
//               dispatch={dispatch}
//               answer={answer}
//             />

//             <NextButton
//               dispatch={dispatch}
//               answer={answer}
//               numQuestions={numQuestions}
//               index={index}
//             />
//           </>
//         )}{" "}
//         {status === "finished" && (
//           <FinishScreen
//             points={points}
//             maxPossiblePoints={maxPossiblePoints}
//             highscore={highscore}
//             dispatch={dispatch}
//           />
//         )}
//       </Main>{" "}
//     </div>
//   );
// }
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // loading | error | ready | active | finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  if (!action?.type) {
    console.error("❌ Invalid action dispatched:", action);
    throw new Error("Dispatched action is missing a 'type' property.");
  }

  //console.log("✅ ACTION DISPATCHED:", action);

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,

        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  const maxPossiblePoints = questions?.length
    ? questions.reduce((prev, cur) => prev + cur.points, 0)
    : 0;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        console.error("Fetch error:", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
