import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, useState } from "react"

type THightlight = "correct" | "wrong" | "current" | "normal";

interface WordPropsType {
  word: string
  highlight: THightlight
} function checkHighlights(
  words: Array<string>,
  answer: string,
  hightlights: Array<THightlight>,
  setHighlights: Dispatch<THightlight[]>
) {
  const answerWords = answer.split("")
  const s = answerWords.length
  const tempHighlight = hightlights;
  for (let i = 0; i < s; i++) {
    if (answerWords[i] === words[i])
      tempHighlight[i] = "correct";
    else
      tempHighlight[i] = "wrong"
  }
  tempHighlight[s] = "current"
  setHighlights(tempHighlight);
}

function Word(props: WordPropsType) {
  let style: any
  if (props.highlight === "correct")
    style = {
      color: "gray",
      border: "1px solid transparent"
    }
  else if (props.highlight === "wrong")
    style = {
      color: "red",
      border: "1px solid transparent"
    }
  else if (props.highlight === "current")
    style = {
      textDecoration: "underline",
      border: "1px solid black"
    }
  else
    style = {
      color: "black",
      border: "1px solid transparent"
    }

  const spanStyle = { ...style, border: "1px" };
  return <>
    <span style={spanStyle}>{props.word}</span>
  </>
}

export default function App() {
  let sentence: string = `One morning a carpenter was sawing a log of wood under a tree. He was wearing a bright blue shirt. The carpenter wanted to cut the log into two parts.`;
  const letters = sentence.split("");
  const router = useRouter();
  const tempHighlight: Array<THightlight> = letters.map((_, index) => {
    if (index === 0) return "current"
    return "normal"
  })
  const [highlights, setHighlights] = useState(tempHighlight);
  const [answer, setAnswer] = useState("");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    console.log(answer);
    checkHighlights(letters, answer, highlights, setHighlights);
  }
  function spaceDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " ") {
      if (letters.length === answer.split("").length) {
        router.push("/result")
      }
    }
  }
  const resetInputField = () => {
    setAnswer("");
  };

  // function resetAnswer() {
  // setAnswer("")
  // }
  return (
    <>
      <Head>
        <title>Rush Type</title>
      </Head>
      <div className="flex flex-col max-w-5xl p-4 gap-3">
        <div className="flex">
          <div className="grow mx-2">
            {letters.map((word, index) => {
              return <Word word={word} key={index} highlight={highlights[index]} />
            })}
          </div>
        </div>
        <div className="flex border-b-slate-200 border-2 rounded-md">
          <input id="answerInput" onChange={changeHandler} onKeyDown={spaceDownHandler} value={answer} type="text" className="grow mx-2 outline-none break-words" />
        </div>
        <div className="flex align-middle">
          <button className="border-2 px-5 py-1 text-center rounded-full mx-auto" onChange={resetInputField}>reset</button>
        </div>
      </div>
    </>
  )
} 
