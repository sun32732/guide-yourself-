class NotesController {
    private notes: Note[] = [];

    createNote(note: Note): Note {
        this.notes.push(note);
        return note;
    }

    getNotes(): Note[] {
        return this.notes;
    }
}

export default NotesController;