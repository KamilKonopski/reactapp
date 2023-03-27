const express = require("express");

const notesActions = require("../actions/notes");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Server is running...");
});

router.get("/notes", notesActions.getAllNotes);
router.post("/notes", notesActions.addNewNote);
router.put("/notes/:id", notesActions.editNote);
router.delete("/notes/:id", notesActions.deleteNote);

module.exports = router;
