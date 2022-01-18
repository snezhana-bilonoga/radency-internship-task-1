export default class NotesTable {
    constructor(root, { onNoteSelect, onNoteArchive, onNoteDelete} = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteArchive = onNoteArchive;
        this.onNoteDelete = onNoteDelete;

        this.innerHTML = `
        <table class="notes">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Category</th>
                    <th>Content</th>
                    <th>Dates</th>
                    <th></th>
                    <th><i class="fa fa-download" aria-hidden="true"></i></th>
                    <th><i class="fa fa-trash" aria-hidden="true"></i></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `;
        this.root.insertAdjacentHTML('beforeend', this.innerHTML);
    }

    _createRowHTML(id, name, created, category, content, dates) {
        return `
        <tr noteid=${id}>
        <td>${name}</td>
        <td>${new Date(created).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</td>
        <td>${category}</td>
        <td>${content}</td>
        <td>${dates}</td>
        <td class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></td>
        <td class="archive"><i class="fa fa-download" aria-hidden="true"></i></td>
        <td class="delete"><i class="fa fa-trash" aria-hidden="true"></i></td>
        </tr>
       `;
    }

    updateNoteTable(notes) {
        const notesContainer = this.root.querySelector(".notes tbody");
        notesContainer.innerHTML = "";

        for (const note of notes) {
            if (!note.isArchived) {
                const html = this._createRowHTML(note.id, note.name, note.created, note.category, note.content, note.dates);

                notesContainer.insertAdjacentHTML("beforeend", html);
            }
        }

        notesContainer.querySelectorAll("tr[noteid]").forEach(noteItem => {
            const noteId = +noteItem.getAttribute('noteid');

            noteItem.querySelector(".edit").addEventListener("click", () => {
                this.onNoteSelect(noteId);
            });

            noteItem.querySelector(".archive").addEventListener("click", () => {
                this.onNoteArchive(noteId);
            });

            noteItem.querySelector(".delete").addEventListener("click", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");
                if (doDelete) {
                    this.onNoteDelete(noteId);
                }
            });
        });
    }
}