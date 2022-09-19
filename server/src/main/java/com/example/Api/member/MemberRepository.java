package com.example.Api.member;

import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member,Long> {
    public Member findByUsername(String member);
}
