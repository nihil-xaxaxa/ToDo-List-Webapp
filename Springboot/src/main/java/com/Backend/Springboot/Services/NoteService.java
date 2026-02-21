package com.Backend.Springboot.Services;

import com.Backend.Springboot.Entities.Note;
import com.Backend.Springboot.Repositories.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    final private NoteRepository noteRepository;


    private Long getUserId()
    {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.valueOf(authentication.getName());
    }


    public List<Note> getAllNotes()
    {
        var id = getUserId();
        return noteRepository.findByUserId(id);
    }

    public Note addNote( Note note)
    {
        var id = getUserId();
        note.setUserId(id);
       return noteRepository.save(note);

    }

    public void deleteNoteById(Long id) {
        var userId = getUserId();
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new AccessDeniedException("Note does not belong to user");
        }

         noteRepository.delete(note);

    }

    public Note updateNote(Note note)
    {

        var id = getUserId();



        var ogNote= noteRepository.findById(note.getId()).orElseThrow(()->new EntityNotFoundException("There is no such note to modify "));

        if (!ogNote.getUserId().equals(id))
            throw new AccessDeniedException("The note is not owned by the caller");


        return noteRepository.save(note);

    }

    public Note getNote(Long id) {
        Long userId = getUserId();
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new AccessDeniedException("Note does not belong to user");
        }

        return note;
    }




}
