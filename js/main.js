import App from "./App.js"
import NotesAPI from "./NotesAPI.js";

const root = document.getElementById("app");

// NotesAPI.saveNote({
//     name: 'kek3',
//     category: 'ololo',
//     content: "pppppp",
//     dates: ['3/5/2021', '5/5/2021'],
// });

const app = new App(root);