package com.Backend.Springboot.Services;

import com.Backend.Springboot.Entities.Task;
import com.Backend.Springboot.Repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TaskService {

    final private TaskRepository taskRepository;



    private Long getUserId()
    {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.valueOf(authentication.getName());
    }


    public List<Task> getAllTasks()
    {
        var id = getUserId();
        return taskRepository.findByUserId(id);
    }

    public Task addTask( Task task)
    {
        var id = getUserId();
        task.setUserId(id);
        return taskRepository.save(task);

    }

    public void deleteTaskById(Long id) {
        var userId = getUserId();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (!task.getUserId().equals(userId)) {
            throw new AccessDeniedException("Task does not belong to user");
        }

        taskRepository.delete(task);

    }

    public Task updateTask(Task task)
    {

        var id = getUserId();



        var ogTask= taskRepository.findById(task.getId()).orElseThrow(()->new EntityNotFoundException("There is no such task to modify "));

        if (!ogTask.getUserId().equals(id))
            throw new AccessDeniedException("The task is not owned by the caller");


        return taskRepository.save(task);

    }

    public Task getTask(Long id) {
        Long userId = getUserId();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (!task.getUserId().equals(userId)) {
            throw new AccessDeniedException("Task does not belong to user");
        }

        return task;
    }







}

