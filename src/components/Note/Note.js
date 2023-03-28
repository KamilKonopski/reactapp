import React, { useState } from "react";

import classes from "./Note.module.css";

function Note(props) {
	const [showDesc, setShowDesc] = useState(false);

	function toggleDesc() {
		setShowDesc(!showDesc);
	}

	function editHandler() {
		props.onEdit({
			title: props.title,
			body: props.body,
			_id: props.id,
		});
	}

	return (
		<div onClick={toggleDesc} className={classes.note}>
			<h2>{props.title}</h2>
			{showDesc && <p className="description">{props.body}</p>}
			<button onClick={editHandler}>Edytuj</button>
			<button
				className={classes.delete}
				onClick={() => props.onDelete(props.id)}
			>
				Usuń
			</button>
		</div>
	);
}

export default Note;
