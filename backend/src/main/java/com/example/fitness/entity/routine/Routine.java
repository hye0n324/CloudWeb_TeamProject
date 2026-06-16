package com.example.fitness.entity.routine;

import com.example.fitness.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Routine {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "routine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoutineExercise> exercises = new ArrayList<>();

    @Builder
    public Routine(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public void addExercise(RoutineExercise exercise) {
        this.exercises.add(exercise);
        exercise.setRoutine(this);
    }

    public void update(String name, List<RoutineExercise> newExercises) {
        this.name = name;
        this.exercises.clear();
        for (RoutineExercise ex : newExercises) {
            this.addExercise(ex);
        }
    }
}
