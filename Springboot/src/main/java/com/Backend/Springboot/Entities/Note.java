package com.Backend.Springboot.Entities;

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
@Table(name = "notes")
public class Note {

    //    {
//        id: 1,
//        title: "Get groceries",
//        desc: "10 am hurry up",
//        creationDate: "2025-02-01T09:00:00",
//        color: "melon",
//    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,name = "title")
    private String title;

    @Column(name = "description")
    private String desc;

    @Column(nullable = false,name = "creation_date")
    private String creationDate;

    @Column(nullable = false,name = "color")
    private String color;

    @Column(nullable = false,name ="user_id" )
    private Long userId;



}



