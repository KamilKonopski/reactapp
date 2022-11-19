import React, { useState } from 'react';

function Note(props) {

    const [showDesc, setShowDesc] = useState(false);

    function toggleDesc() {
        setShowDesc(!showDesc);
    }

    function editHandler() {
        props.onEdit({
            title: props.title,
            body: props.body,
            id: props.id,
        });
    }

    return (
        <div className="note">
            <h2 onClick={toggleDesc}>{props.title}</h2>
            {showDesc && (
                <p className="description">{props.body}</p>
            )}
            <button onClick={editHandler}>Edytuj</button>
            <button
                className="delete"
                onClick={() => props.onDelete(props.id)}>Usuń</button>
        </div>
    );
};

export default Note;
