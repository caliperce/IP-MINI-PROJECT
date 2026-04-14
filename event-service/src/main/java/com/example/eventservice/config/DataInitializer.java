package com.example.eventservice.config;

import com.example.eventservice.model.Event;
import com.example.eventservice.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EventRepository eventRepository;

    public DataInitializer(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) {
        if (eventRepository.count() == 0) {
            eventRepository.save(new Event(null, "Aishwarya", "2021CS001",
                    "Tech Symposium 2026", "Main Auditorium, Block A",
                    "2026-05-15", "Annual technology symposium featuring workshops, hackathons, and tech talks by industry experts."));

            eventRepository.save(new Event(null, "Aishwarya", "2021CS001",
                    "Code Sprint Challenge", "Computer Lab 3, Block B",
                    "2026-06-10", "24-hour competitive coding marathon with prizes for top performers."));

            eventRepository.save(new Event(null, "Aishwarya", "2021CS001",
                    "AI Workshop", "Seminar Hall, Block C",
                    "2026-07-20", "Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals."));

            eventRepository.save(new Event(null, "Ravi Kumar", "2021CS002",
                    "Tech Symposium 2026", "Main Auditorium, Block A",
                    "2026-05-15", "Annual technology symposium featuring workshops, hackathons, and tech talks by industry experts."));

            eventRepository.save(new Event(null, "Ravi Kumar", "2021CS002",
                    "Web Development Bootcamp", "Lab 5, Block D",
                    "2026-08-05", "Intensive bootcamp on modern web development with React and Spring Boot."));

            System.out.println("Sample event data initialized successfully!");
        }
    }
}
