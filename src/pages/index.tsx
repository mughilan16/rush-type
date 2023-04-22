import { type NextPage } from "next";
import Head from "next/head";
import { Dispatch, useState } from "react"

import { api } from "~/utils/api";

type THightlight = "correct" | "wrong" | "current" | "normal";

interface WordPropsType {
  word: string
  highlight: THightlight
}

function checkHighlights(words: Array<string>, answer: string, hightlights: Array<THightlight>, setHighlights: Dispatch<THightlight[]>) {
  const answerWords = answer.split(" ")
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
  let background: string;
  if (props.highlight === "correct")
    background = "#31C48D"
  else if (props.highlight === "wrong")
    background = "#F98080"
  else if (props.highlight === "current")
    background = "#FCE96A"
  else
    background = "transparent"

  const spanStyle = {
    backgroundColor: background
  }
  return <>
    <span style={spanStyle}>{props.word + " "}</span>
  </>
}


const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  let sentence: string = "A bird in the hand is worth two in the bush.";
  const words = sentence.split(" ");
  const tempHighlight: Array<THightlight> = words.map((_, index) => {
    if (index === 0)
      return "current"
    return "normal"
  })
  const [highlights, setHighlights] = useState(tempHighlight);
  const [answer, setAnswer] = useState("");
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value)
  }
  function spaceDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " ") {
      checkHighlights(words, answer, highlights, setHighlights);
    }
    console.log(answer.split(" ").length, words.length)
    if (answer.split(" ").length === words.length) {
      alert("Finished")
    }
  }
  function resetAnswer() {
    setAnswer("")
    // const input: React.ReactElement<HTMLInputElement> = document.getElementById("answerInput")
    // if (input !== null) {
    //   input.
    // }
  }
  return (
    <>
      <Head>
        <title>Rush Type</title>
      </Head>
      <div className="flex flex-col max-w-md p-4 gap-3">
        <div className="flex">
          <div className="grow mx-2">
            {words.map((word, index) => {
              const highlight = highlights[index];
              if (highlight === undefined)
                return <span>Error</span>
              return <Word word={word} key={index} highlight={highlight} />
            })}
          </div>
        </div>
        <div className="flex border-b-slate-200 border-2 rounded-md">
          <input id="answerInput" onChange={changeHandler} onKeyDown={spaceDownHandler} value={answer
          } type="text" className="grow mx-2 outline-none" />
        </div>
        <div className="flex align-middle">
          <button className="border-2 px-5 py-1 text-center rounded-full mx-auto" onChange={resetAnswer}>reset</button>
        </div>
      </div>
    </>

  )
};

export default Home;
