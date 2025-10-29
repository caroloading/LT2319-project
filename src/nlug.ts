import { Move } from "./types";
import { objectsEqual, WHQ } from "./utils";

interface NLUMapping {
  [index: string]: Move[];
}
type NLGMapping = [Move, string][];

const nluMapping: NLUMapping = {
  "what is the weather?": [{
    type: "ask",
    content: WHQ("look_up_weather"),
  }],
  "i want to know the weather": [{
    type: "ask",
    content: WHQ("look_up_weather"),
  }],
  "i'd like to know about the weather": [{
    type: "ask",
    content: WHQ("look_up_weather"),
  }],
  "weather please": [{
    type: "ask",
    content: WHQ("look_up_weather"),
  }],
  "here": [{
    type: "answer",
    content: "gothenburg"
  }],
  "gothenburg": [{
    type: "answer",
    content: "gothenburg"
  }],
  "varberg": [{
    type: "answer",
    content: "varberg"
  }],
  "halmstad": [{
    type: "answer",
    content: "halmstad"
  }],
  "marstrand": [{
    type: "answer",
    content: "marstrand"
  }],
  "*no_input*": [{
    type: "no_input",
    content: null,
  }]
};
const nlgMapping: NLGMapping = [  
  [{ type: "ask", content: WHQ("location") }, "Where do you want to know the weather?"], 
  [{ type: "greet", content: null }, "Hello! Welcome to SeaMetrics. How can I help you?"],
  [{ type: "ask_repeat", content: null }, "I didn't hear anything from you."],  
  //[
  //  {
  //    type: "answer",
  //    content: { predicate: "booking_room", argument: "J440" },
  //  },
  //  "The lecture is in J440.",
  //],
  [
    {
      type: "answer",
      content: { predicate: "look_up_weather", argument: "hot dry" },
    },
    "The weather is hot and dry. It is suitable for a boat ride.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_weather", argument: "cold dry" },
    },
    "The weather is cold and dry. Bring a warm hat with you!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_weather", argument: "hot wet" },
    },
    "The weather is hot and wet. The atmosphere seems heavy!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_weather", argument: "cold wet" },
    },
    "The weather is cold and wet. Bring a hat & raincoat, or stay inside!",
  ],
];

export function nlg(moves: Move[]): string {
  console.log("generating moves", moves);
  function generateMove(move: Move): string {
    const mapping = nlgMapping.find((x) => objectsEqual(x[0], move));
    if (mapping) {
      return mapping[1];
    }
    throw new Error(`Failed to generate move ${JSON.stringify(move)}`);
  }
  const utterance = moves.map(generateMove).join(" ");
  console.log("generated utterance:", utterance);
  return utterance;
}

/** NLU mapping function can be replaced by statistical NLU
 */
export function nlu(utterance: string): Move[] {
  return nluMapping[utterance.toLowerCase()] || [];
}
