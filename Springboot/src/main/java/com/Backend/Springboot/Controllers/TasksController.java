package com.Backend.Springboot.Controllers;

import com.Backend.Springboot.Entities.Task;
import com.Backend.Springboot.Services.TaskService;
import com.Backend.Springboot.dtos.TaskModReq;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/api/tasks")
@RequiredArgsConstructor
public class TasksController {
    final private TaskService taskService ;





    @GetMapping
    public List<Task> print()
    {
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody @Valid Task task)
    {
        Task savedTask =taskService.addTask(task);
        return ResponseEntity.ok().body(savedTask);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id)
    {
       taskService.deleteTaskById(id);
       return  ResponseEntity.noContent().build() ;
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Task> updateNote(@PathVariable Long id , @RequestBody TaskModReq modifiedTask)
    {

        Task task = taskService.getTask(id);
        Task updatedTask=new Task(
                id,modifiedTask.getTask(),
                modifiedTask.getDesc(),
                modifiedTask.getDueDate(),
                modifiedTask.getCreationDate(),
                modifiedTask.getCompletionDate(),
                modifiedTask.getImportance(),
                modifiedTask.getMode(),
                modifiedTask.isFinished(),
                task.getUserId());
        Task savedTask =taskService.updateTask(updatedTask);
        return ResponseEntity.ok(savedTask);
    }
}
