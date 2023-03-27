import React, { useState } from "react";

import clasess from "./NewNote.module.css";

function NewNote(props) {
	const [showForm, setShowForm] = useState(false);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	function changeTitleHandler(event) {
		const value = event.target.value;
		setTitle(value);
	}

	function changeDescHandler(event) {
		const value = event.target.value;
		setDesc(value);
	}

	function addNote() {
		const note = {
			title: title,
			body: desc,
		};
		props.onAdd(note);

		setTitle("");
		setDesc("");
		setShowForm(false);
	}

	return showForm ? (
		<div className={clasess["new-note"]}>
			<label>Tytuł:</label>
			<input type="text" value={title} onChange={changeTitleHandler} />

			<label>Opis:</label>
			<input type="text" value={desc} onChange={changeDescHandler} />

			<button onClick={() => addNote()}>Dodaj notatkę</button>
		</div>
	) : (
		<button onClick={() => setShowForm(true)}>Nowa notatka</button>
	);
}

export default NewNote;
