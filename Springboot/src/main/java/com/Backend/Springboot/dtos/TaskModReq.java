package com.Backend.Springboot.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TaskModReq {


    private Long id;


    private String task;


    private String desc;


    private String dueDate;


    private String creationDate;


    private String completionDate;


    private String importance;


    private String mode;


    @JsonProperty("isFinished")
    private boolean isFinished;


}
