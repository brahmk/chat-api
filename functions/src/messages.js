import connectDb from "../connectDb.js";
import admin from "firebase-admin";

const imArray = [
  "wow",
  "cool",
  "hey",
  "what are you doing later?",
  "im bored",
  "g2g eat dinner",
  "wanna ride bikes?",
  "why is there nothing good on tv",
  "hold on my mom needs to use the phone",
  "brb",
  "sup",
  "lol",
  "did you do the math homework?",
];

function randomIm(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getMessages(req, res) {
  const db = connectDb();
  db.collection("messages")
    .orderBy("createdAt", "asc")
    .get()
    .then((snapshot) => {
      const messageArray = snapshot.docs.map((doc) => {
        let message = doc.data();
        message.id = doc.id;
        return message;
      });
      res.send(messageArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function postMessage(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  let { message } = req.body;
  let now = admin.firestore.FieldValue.serverTimestamp();
  let response = randomIm(imArray);

  let newMessage = {
    message,
    createdAt: now,
    response,
  };
  db.collection("messages")
    .add(newMessage)
    .then((doc) => {
      res.send("Sent!" + doc.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
