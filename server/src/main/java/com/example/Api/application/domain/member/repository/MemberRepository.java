package com.example.Api.application.domain.member.repository;

import com.example.Api.application.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByUsername(String username);
    Optional<Member> findByNickName(String nickName);
    Optional<Member> findByUsernameAndNickName(String username, String nickName);
    List<Member> findAllByRoles(String roles);
    /*Optional<Member> findByUsernameAndPassword(String username, String password);*/
}
