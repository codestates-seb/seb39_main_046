package com.example.Api.member;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Transactional
@Service

public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void init(){

        String password = bCryptPasswordEncoder.encode("asd");
        Member member1 = new Member(1L,"kcd1@gmail.com","관리자1",password);
        member1.setRoles("ADMIN");
        memberRepository.save(member1);
        Member member2 = new Member(2L,"kcd2@gmail.com","관리자2",password);
        member2.setRoles("ADMIN");
        memberRepository.save(member2);
        Member member3 = new Member(3L,"kcd3@gmail.com","관리자3",password);
        member3.setRoles("ADMIN");
        memberRepository.save(member3);
        Member member4 = new Member(4L,"kcd4@gmail.com","관리자4",password);
        member4.setRoles("ADMIN");
        memberRepository.save(member4);
        Member member5 = new Member(5L,"kcd5@gmail.com","관리자5",password);
        member5.setRoles("ADMIN");
        memberRepository.save(member5);
        }

    public MemberService(MemberRepository memberRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Member createMember(Member member){
        return memberRepository.save(member);
    }
    public Member findMember(long id) {

        Member member = new Member(id,"kcd@gmail.com","김코딩","asd");
        return member;
    }
    public void imgUpdate(long id , String photo){
        String password = bCryptPasswordEncoder.encode("ssss");
        Member member1 = new Member(id,"이메일","닉네임",password);
        member1.setRoles("USER");
member1.setProfile(photo);
memberRepository.save(member1);
    }
}
