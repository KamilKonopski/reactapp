import React, { useState } from 'react';

function EditNote(props) {

    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.body);

    function changeTitleHandler(event) {
        const value = event.target.value;
        setTitle(value);
    }

    function changeDescHandler(event) {
        const value = event.target.value;
        setDesc(value);
    }

    function editNote() {
        const note = {
            title: title,
            body: desc,
            id: props.id,
        };
        props.onEdit(note);
    }

    return (
        <div className="note">
            <label>Tytuł:</label>
            <input type="text"
                value={title}
                onChange={changeTitleHandler} />

            <label>Opis:</label>
            <input type="text"
                value={desc}
                onChange={changeDescHandler} />

            <button onClick={() => editNote()}>Zapisz notatkę</button>
        </div>
    );
};

export default EditNote;
