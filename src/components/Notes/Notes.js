import React, { useEffect, useState } from "react";

import EditNote from "../EditNote/EditNote";
import Modal from "react-modal";
import NewNote from "../NewNote/NewNote";
import Note from "../Note/Note";

import classes from "./Notes.module.css";

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editedNote, setEditedNote] = useState({});

	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL)
			.then((res) => res.json())
			.then((data) => setNotes(data));
	}, []);

	const deleteNote = (id) => {
		const filteredNotes = notes.filter((note) => note._id !== id);
		setNotes(filteredNotes);

		fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
			method: "DELETE",
		});
	};

	const addNote = (note) => {
		fetch(process.env.REACT_APP_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: note.title,
				body: note.body,
			}),
		})
			.then((res) => res.json())
			.then((data) => setNotes([...notes, data]));
	};

	const editNote = (note) => {
		const index = notes.findIndex((el) => el.id === note.id);
		if (index >= 0) {
			notes[index] = note;
			setNotes(notes);
		}
		fetch(`${process.env.REACT_APP_API_URL}/${note._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: note.title,
				body: note.body,
			}),
		});

		toggleModal();
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
					id={editedNote._id}
					onEdit={(note) => editNote(note)}
				/>
				<button onClick={() => toggleModal()}>Anuluj</button>
			</Modal>

			{notes.map((note) => (
				<Note
					key={note._id}
					title={note.title}
					body={note.body}
					id={note._id}
					onEdit={(note) => editNoteHandler(note)}
					onDelete={(id) => deleteNote(id)}
				/>
			))}
		</div>
	);
};

export default Notes;
