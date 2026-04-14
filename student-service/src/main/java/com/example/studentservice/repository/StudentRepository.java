package com.example.studentservice.repository;

import com.example.studentservice.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findByEmailAndPassword(String email, String password);
}
