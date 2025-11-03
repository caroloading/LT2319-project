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
  "what is the temperature?": [{
    type: "ask",
    content: WHQ("look_up_temp"),
  }],
  "what is the visibility?": [{
    type: "ask",
    content: WHQ("look_up_vis"),
  }],
  "what is the visibility like?": [{
    type: "ask",
    content: WHQ("look_up_vis"),
  }],
  "will the visibility be okay?": [{
    type: "ask",
    content: WHQ("look_up_vis"),
  }],
  "what is the rain going to be like?": [{
    type: "ask",
    content: WHQ("look_up_prec"),
  }],
  "what is the precipitation?": [{
    type: "ask",
    content: WHQ("look_up_prec"),
  }],
  "is there rain?": [{
    type: "ask",
    content: WHQ("look_up_prec"),
  }],
  "will there be rain?": [{
    type: "ask",
    content: WHQ("look_up_prec"),
  }],
  "will it rain?": [{
    type: "ask",
    content: WHQ("look_up_prec"),
  }],
  "how is the wind?": [{
    type: "ask",
    content: WHQ("look_up_wind"),
  }],
  "tell me about the wind.": [{
    type: "ask",
    content: WHQ("look_up_wind"),
  }],
  "how cold is it?": [{
    type: "ask",
    content: WHQ("look_up_temp"),
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
  }],
  "goodbye": [{
    type: "goodbye",
    content: null,
  }],
  "thank you. goodbye": [{
    type: "goodbye",
    content: null,
  }],
  "thanks": [{
    type: "goodbye",
    content: null,
  }],
  "thank you": [{
    type: "goodbye",
    content: null,
  }],
  "that's all": [{
    type: "goodbye",
    content: null,
  }],
};
const nlgMapping: NLGMapping = [  
  [{ type: "ask", content: WHQ("location") }, "Where do you want to know that information for?"], 
  [{ type: "greet", content: null }, "Hello! Welcome to SeaMetrics. How can I help you?"],
  [{ type: "goodbye", content: null }, "Thank you for using SeaMetrics. Have a nice day!"],
  [{ type: "ask_repeat", content: null }, "I didn't hear anything from you."],  
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
  [
    {
      type: "answer",
      content: { predicate: "look_up_temp", argument: "cold" },
    },
    "The weather is very cold. Bring a hat and & hot drink!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_temp", argument: "hot" },
    },
    "The weather is warm. Perfect boat weather!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_vis", argument: "low" },
    },
    "The visibility is not great. Be careful out there!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_vis", argument: "good" },
    },
    "The visibility is good today. Look out to the horizon!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_prec", argument: "wet" },
    },
    "There is a lot of precipitation. Bring a raincoat!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_prec", argument: "dry" },
    },
    "No precipitation today! Coast is clear.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "light south" },
    },
    "There is a light wind from the south.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "light north" },
    },
    "There is a light wind from the north.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "light east" },
    },
    "There is a light wind from the east.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "light west" },
    },
    "There is a light wind from the west.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "strong south" },
    },
    "There is a strong wind from the south. Hold on!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "strong north" },
    },
    "There is a strong wind from the north. Hold on!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "strong east" },
    },
    "There is a strong wind from the east. Hold on!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind", argument: "strong west" },
    },
    "There is a strong wind from the west. Hold on!",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_weather", argument: "no info" },
    },
    "There seems to be an issue fetching this information.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_temp", argument: "no info" },
    },
    "There seems to be an issue fetching this information.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_prec", argument: "no info" },
    },
    "There seems to be an issue fetching this information.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_vis", argument: "no info" },
    },
    "There seems to be an issue fetching this information.",
  ],
  [
    {
      type: "answer",
      content: { predicate: "look_up_wind=", argument: "no info" },
    },
    "There seems to be an issue fetching this information.",
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
