package com.Backend.Springboot.Repositories;

import com.Backend.Springboot.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    @Override
    void deleteById(Long id);

    List<Task> findByUserId(Long userId);

}
