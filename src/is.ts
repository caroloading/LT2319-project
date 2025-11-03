import { InformationState } from "./types";
import {
  objectsEqual,
  WHQ,
  findout,
  consultDB,
  getFactArgument,
} from "./utils";
import { mapWeather } from "./weather_api.ts";
// import { getSafetyMessages } from "./aisstream_api.ts";

export const initialIS = (): InformationState => {
  const predicates: { [index: string]: string } = {
    // Mapping from predicate to sort
    
    location: "location",
  };
  const individuals: { [index: string]: string } = {
    // Mapping from individual to sort

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
          content: WHQ("look_up_weather"), //for all aspects of the weather.
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_weather")),
          ],
        },
        {
          type: "issue",
          content: WHQ("look_up_temp"),
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_temp")),
          ],
        },
        {
          type: "issue",
          content: WHQ("look_up_prec"),
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_prec")),
          ],
        },
        {
          type: "issue",
          content: WHQ("look_up_vis"),
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_vis")),
          ],
        },
        {
          type: "issue",
          content: WHQ("look_up_wind"),
          plan: [                        
            findout(WHQ("location")),
            consultDB(WHQ("look_up_wind")),
          ],
        },
        //{
        //  type: "issue",
        //  content: WHQ("look_up_traffic"),
        //  plan: [                        
        //    findout(WHQ("location")),
        //    consultDB(WHQ("look_up_traffic")),
        //  ],
        //},
      ],
    },
    database: {
      consultDB: (question, facts) => {
        var ans = null
        if (objectsEqual(question, WHQ("look_up_weather"))) {
          const location = getFactArgument(facts, "location");
          const answer = mapWeather(location!, 'all') 
          ans = { predicate: "look_up_weather", argument: answer }
        } else if (objectsEqual(question, WHQ("look_up_temp"))) {
          const location = getFactArgument(facts, "location");
          const answer = mapWeather(location!, 'temperature') 
          ans = { predicate: "look_up_temp", argument: answer }
        } else if (objectsEqual(question, WHQ("look_up_vis"))) {
          const location = getFactArgument(facts, "location");
          const answer = mapWeather(location!, 'visibility') 
          ans = { predicate: "look_up_vis", argument: answer }
        } else if (objectsEqual(question, WHQ("look_up_wind"))) {
          const location = getFactArgument(facts, "location");
          const answer = mapWeather(location!, 'wind') 
          ans = { predicate: "look_up_wind", argument: answer }
        } else if (objectsEqual(question, WHQ("look_up_prec"))) {
          const location = getFactArgument(facts, "location");
          const answer = mapWeather(location!, 'precipitation') 
          ans = { predicate: "look_up_prec", argument: answer }
        } 
        //else if (objectsEqual(question, WHQ("look_up_traffic"))) {
        //  const location = getFactArgument(facts, "location");
        //  const answer = 
        //  ans = { predicate: "look_up_traffic", argument: answer }
        //}

        return ans;
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
      bel: [],
    },
    shared: { lu: undefined, qud: [], com: [] },
  };
};
