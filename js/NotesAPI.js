export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        return notes.sort((a, b) => {
            return new Date(a.created) > new Date(b.created) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id === noteToSave.id);

        // Edit/update
        if (existing) {
            existing.name = noteToSave.name;
            existing.category = noteToSave.category;
            existing.content = noteToSave.content;
            existing.dates = noteToSave.dates;
            existing.isArchived = noteToSave.isArchived;
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.created = new Date();
            noteToSave.isArchived = false;
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id !== id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}
