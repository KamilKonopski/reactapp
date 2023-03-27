import React, { useState } from "react";

import EditNote from "../EditNote/EditNote";
import Modal from "react-modal";
import NewNote from "../NewNote/NewNote";
import Note from "../Note/Note";

import classes from "./Notes.module.css";

const Notes = () => {
	const [notes, setNotes] = useState([
		{
			id: "1",
			title: "Wykąpać psa",
			body: "Wykąpać specjalnym szamponem",
		},
		{
			id: "2",
			title: "Zrobić zakupy",
			body: "kupić mleko, chleb, jajka",
		},
	]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editedNote, setEditedNote] = useState({});

	const deleteNote = (id) => {
		const filteredNotes = notes.filter((note) => note.id !== id);
		setNotes(filteredNotes);
	};

	const addNote = (note) => {
		setNotes([...notes, note]);
	};

	const editNote = (note) => {
		const index = notes.findIndex((el) => el.id === note.id);
		if (index >= 0) {
			notes[index] = note;
			setNotes(notes);
			toggleModal();
		}
	};

	const toggleModal = () => {
		setShowEditModal((prev) => !prev);
	};

	const editNoteHandler = (note) => {
		toggleModal();
		setEditedNote(note);
	};
	return (
		<div className={classes.notes}>
			<h1>Moje notatki:</h1>
			<NewNote onAdd={(note) => addNote(note)} />

			<Modal
				className={classes.modal}
				appElement={document.getElementById("modal")}
				isOpen={showEditModal}
				contentLabel="Edytuj notatkę"
			>
				<EditNote
					title={editedNote.title}
					body={editedNote.body}
					id={editedNote.id}
					onEdit={(note) => editNote(note)}
				/>
				<button onClick={() => toggleModal()}>Anuluj</button>
			</Modal>

			{notes.map((note) => (
				<Note
					key={note.id}
					title={note.title}
					body={note.body}
					id={note.id}
					onEdit={(note) => editNoteHandler(note)}
					onDelete={(id) => deleteNote(id)}
				/>
			))}
		</div>
	);
};

export default Notes;
