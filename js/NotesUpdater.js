export default class NotesUpdater {
    constructor(root, { onNoteAdd, onNoteEdit }) {
        this.root = root;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
    
        this.innerHTML = `
        <div class="note-updater">
            <button type="button">Create Note</button>
            <div class="note-inputs" style="visibility: hidden">
                <input type="text" class="name" placeholder="Name"> 
                <select name="select" class="category">
                    <option value="" disabled selected>Select Category</option>
                    <option value="task">Task</option>
                    <option value="random">Random Thought</option>
                    <option value="idea">Idea</option>
                    <option value="quote">Quote</option>
                </select>
                <input type="text" class="content" placeholder="Content"> 
                <input type="text" class="dates" placeholder="Dates"> <br>
            </div>
        </div>
      `;
        this.root.insertAdjacentHTML('beforeend', this.innerHTML);

        this.root.querySelector('button').addEventListener('click', this._noteUpdaterHandler.bind(this));
    }

    editNote(note) {
        this.root.querySelector('button').innerText = 'Edit Note';
        this.root.querySelector('.note-inputs').style.visibility = 'visible';

        this.root.querySelector('input.name').value = note.name;
        this.root.querySelector('select.category').value = '';
        this.root.querySelector('input.content').value = note.content;
        this.root.querySelector('input.dates').value = note.dates;
    }

    _noteUpdaterHandler() {
        const button = this.root.querySelector('button');

        if (button.innerText === 'Create Note') {
            this.root.querySelector('button').innerText = 'Add Note';
            this.root.querySelector('.note-inputs').style.visibility = 'visible';
        } else if (button.innerText === 'Add Note') {
            const name = this.root.querySelector('input.name').value;
            const categorySelect = this.root.querySelector('select.category');
            const content = this.root.querySelector('input.content').value;
            const dates = this.root.querySelector('input.dates').value;

            this.onNoteAdd({
                name,
                category: categorySelect.options[categorySelect.selectedIndex].text,
                content,
                dates
            });

            this.root.querySelector('button').innerText = 'Create Note';
            this.root.querySelector('.note-inputs').style.visibility = 'hidden';
        } else if (button.innerText === 'Edit Note') {
            const name = this.root.querySelector('input.name').value;
            const categorySelect = this.root.querySelector('select.category');
            const content = this.root.querySelector('input.content').value;
            const dates = this.root.querySelector('input.dates').value;

            this.onNoteEdit({
                name,
                category: categorySelect.options[categorySelect.selectedIndex].text,
                content,
                dates
            });

            this.root.querySelector('button').innerText = 'Create Note';
            this.root.querySelector('.note-inputs').style.visibility = 'hidden';
        }
    }
}
