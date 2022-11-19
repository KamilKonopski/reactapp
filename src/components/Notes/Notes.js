import React from 'react';

import EditNote from '../EditNote/EditNote';
import Modal from 'react-modal';
import NewNote from '../NewNote/NewNote';
import Note from '../Note/Note';

import './Notes.css';

class Notes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [
                {
                    id: '1',
                    title: 'Wykąpać psa',
                    body: 'Wykąpać specjalnym szamponem',
                },
                {
                    id: '2',
                    title: 'Zrobić zakupy',
                    body: 'kupić mleko, chleb, jajka',
                },
            ],
            showEditModal: false,
            editNote: {}
        };
    }

    deleteNote(id) {
        const notes = [...this.state.notes].filter(note => note.id !== id);
        this.setState({ notes })
    }

    addNote(note) {
        const notes = [...this.state.notes];
        notes.push(note);
        this.setState({ notes });
    }

    editNote(note) {
        const notes = [...this.state.notes];
        const index = notes.findIndex(el => el.id === note.id);
        if (index >= 0) {
            notes[index] = note
            this.setState({ notes });
            this.toggleModal();
        }
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal })
    }

    editNoteHandler(note) {
        this.toggleModal();
        this.setState({ editNote: note })
    }

    render() {



        return (
            <div>
                <h1>Moje notatki:</h1>
                <NewNote
                    onAdd={(note) => this.addNote(note)}
                />

                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatkę">
                    <EditNote
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        id={this.state.editNote.id}
                        onEdit={note => this.editNote(note)} />
                    <button className="note" onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>

                {this.state.notes.map(note => (
                    <Note
                        key={note.id}
                        title={note.title}
                        body={note.body}
                        id={note.id}
                        onEdit={(note) => this.editNoteHandler(note)}
                        onDelete={(id) => this.deleteNote(id)}
                    />
                ))}
            </div>
        );
    };
};



export default Notes;
