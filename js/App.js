import NotesAPI from "./NotesAPI.js"
import NoteUpdater from "./NotesUpdater.js";
import NotesTable from "./NotesTable.js";
import CategoriesTable from "./CategoriesTable.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.notesTable = new NotesTable(root, this._handlers());
        this.noteUpdater = new NoteUpdater(root, this._handlers());
        this.categoriesTable = new CategoriesTable(root);
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this._setNotes(notes);
    }

    _setNotes(notes) {
        this.notes = notes;
        this.notesTable.updateNoteTable(notes);
        this.categoriesTable.updateCategoriesTable(notes);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.noteUpdater.editNote(note);
    }

    _handlers() {
        return {
            onNoteAdd: (note) => {
                NotesAPI.saveNote(note);
                this._refreshNotes();
            },
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find(note => note.id === noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteArchive: (noteId) => {
                const note = this.notes.find(note => note.id === noteId);
                NotesAPI.saveNote({
                    ...note,
                    isArchived: true
                });
                this._refreshNotes();
            },
            onNoteEdit: (note) => {
                NotesAPI.saveNote({
                    ...note,
                    id: this.activeNote.id
                });
                this._refreshNotes();
            },
            onNoteDelete: (noteId) => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            }
        }
    }
}    