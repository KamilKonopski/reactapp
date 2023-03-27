const Note = require("../db/models/note");

class NotesActions {
	async getAllNotes(req, res) {
		try {
			const notes = await Note.find();
			res.send(notes);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async addNewNote(req, res) {
		const title = req.body.title;
		const body = req.body.body;

		try {
			const newNote = new Note({
				title,
				body,
			});

			await newNote.save();
			res.status(201).json(newNote);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async editNote(req, res) {
		const id = req.params.id;
		const title = req.body.title;
		const body = req.body.body;

		try {
			const editNote = await Note.findOne({ _id: id });
			editNote.title = title;
			editNote.body = body;
			await editNote.save();
			res.status(201).json(editNote);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async deleteNote(req, res) {
		const id = req.params.id;

		try {
			const notes = await Note.deleteOne({ _id: id });
			res.send(notes);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = new NotesActions();
