// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgHno6g6MjVisThflhcD_Qna5LQEU8lyA",
  authDomain: "resource-collection-react.firebaseapp.com",
  projectId: "resource-collection-react",
  storageBucket: "resource-collection-react.appspot.com",
  messagingSenderId: "505523083844",
  appId: "1:505523083844:web:2cadc272434a82d1da7a11",
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
