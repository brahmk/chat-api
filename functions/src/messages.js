import connectDb from "../connectDb.js";
import admin from "firebase-admin";
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
  let newMessage = {
    message,
    createdAt: now,
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
