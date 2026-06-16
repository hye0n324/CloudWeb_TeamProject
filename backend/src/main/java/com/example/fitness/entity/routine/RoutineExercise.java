package com.example.fitness.entity.routine;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoutineExercise {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int sequence;
    private String name;
    private String targetPart;
    private int sets;
    private int reps;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @Builder
    public RoutineExercise(int sequence, String name, String targetPart, int sets, int reps) {
        this.sequence = sequence;
        this.name = name;
        this.targetPart = targetPart;
        this.sets = sets;
        this.reps = reps;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }
}
