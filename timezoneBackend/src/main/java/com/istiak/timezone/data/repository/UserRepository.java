package com.istiak.timezone.data.repository;

import com.istiak.timezone.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    long deleteByEmail(String email);
}
