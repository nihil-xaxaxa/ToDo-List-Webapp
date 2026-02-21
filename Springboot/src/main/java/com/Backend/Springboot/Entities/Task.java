package com.Backend.Springboot.Entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

//
//    {
//        id: 2,
//                task: "Wedding",
//            desc: "Prepare for your friend's wedding, don't be late!!",
//            dueDate: "2025-08-20T18:45:00",
//            creationDate: "2025-08-13T10:42:00",
//            isFinished: false,
//            importance: "moderate",
//            mode: "todo",
//            completionDate: null
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,name = "task")
    private String task;

    @Column(name = "description")
    private String desc;

    @Column(name = "due_date")
    private String dueDate;

    @Column(nullable = false,name = "creation_date")
    private String creationDate;

    @Column(name = "completion_date")
    private String completionDate;

    @Column(name = "importance")
    private String importance;

    @Column(nullable = false,name = "mode")
    private String mode;

    @Column(nullable = false,name = "is_finished")
    @JsonProperty("isFinished")
    private boolean isFinished;


    @Column(nullable = false,name ="user_id" )
    private Long userId;


}
