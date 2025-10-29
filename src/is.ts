import { InformationState } from "./types";
import {
  objectsEqual,
  WHQ,
  findout,
  consultDB,
  getFactArgument,
} from "./utils";
import { mapWeather } from "./weather_api.ts";

export const initialIS = (): InformationState => {
  const predicates: { [index: string]: string } = {
    // Mapping from predicate to sort
    
    // TO DO: FIGURE OUT PREDICATES
    favorite_food: "food",
    location: "location",
  };
  const individuals: { [index: string]: string } = {
    // Mapping from individual to sort

    // TODO: FIGURE OUT INDIVIDUALS
    pizza: "food",
    gothenburg: "location",
    varberg: "location",
    halmstad: "location",
    marstrand: "location"

  };
  return {
    domain: {
      predicates: predicates,
      individuals: individuals,
      plans: [
        {
          type: "issue",
          content: WHQ("look_up_weather"),
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_weather")),
          ],
        },
      ],
    },
    database: {
      consultDB: (question, facts) => {
        if (objectsEqual(question, WHQ("look_up_weather"))) {
          const location = getFactArgument(facts, "location");
                    

          const answer = mapWeather(location!) // API CALL - then WEATHER MAPPING TO CATEGORIES
          
          return { predicate: "look_up_weather", argument: answer }
        }
        return null;
      },
    },
    next_moves: [],
    private: {
      plan: [],
      agenda: [
        {
          type: "greet",
          content: null,
        },
      ],
      bel: [/*{ predicate: "favorite_food", argument: "pizza" }*/],
    },
    shared: { lu: undefined, qud: [], com: [] },
  };
};
