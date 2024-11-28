import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_CLIENT_EMAIL,
    projectId: FIREBASE_PROJECT_ID,
  }),
});

export default firebaseApp;
