// Code based on AIS Stream API's example code for typescript
// https://github.com/aisstream/example/blob/main/typescript/client.ts

import WebSocket from "ws";
import { API_KEY } from "./aisstream.ts";

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream")

socket.onopen = function (_) {
    let subscriptionMessage = {
        Apikey: API_KEY,
        BoundingBoxes: [[[54, 9], [60, 20]]], //Maybe do location by city?
		FilterMessageTypes: ["PositionReport", "SafetyBroadcastMessage"]
    }
    socket.send(JSON.stringify(subscriptionMessage));
    console.log("connection done")
};

var safetyMessages: string[] = [];

socket.onmessage = function (event) {
    let data = JSON.parse(event.data as string)
    if (data["MessageType"] == "SafetyBroadcastMessage"){
        const message = data["Message"]["SafetyBroadcastMessage"]
        const warning = message.Text
        safetyMessages.push(warning)
    }
};

export function getSafetyMessages() {
    return safetyMessages
}


