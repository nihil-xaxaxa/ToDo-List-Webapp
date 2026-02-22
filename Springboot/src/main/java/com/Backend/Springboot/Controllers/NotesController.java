package com.Backend.Springboot.Controllers;

import com.Backend.Springboot.Entities.Note;
import com.Backend.Springboot.Services.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping(path = "/api/notes")
public class NotesController {

    final private NoteService noteService;

    public NotesController(NoteService noteService)
    {
        this.noteService =noteService;
    }


    @GetMapping
    public List<Note> print()
    {
        return noteService.getAllNotes();
    }

    @PostMapping
    public ResponseEntity<Note> saveNote(@RequestBody @Valid Note note)
    {
        Note savedNote =noteService.addNote(note);
        return ResponseEntity.ok().body(savedNote);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id)
    {
        noteService.deleteNoteById(id);
         return ResponseEntity.noContent().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id , @RequestBody Note modifiedNote)
    {
         Note note = noteService.getNote(id);

            modifiedNote.setId(id);
             Note savedNote =noteService.updateNote(modifiedNote);
            return ResponseEntity.ok(savedNote);
    }


}
