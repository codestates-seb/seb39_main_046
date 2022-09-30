package com.example.Api.member;

import com.example.Api.oauth.PrincipalDetails;
import com.example.Api.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;
import java.util.Optional;

@Transactional
@Service

public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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
    /*public void imgUpdate(Member member,String photo){
        member.setProfile(photo);
        memberRepository.save(member);
    }*/

    public Member getLoginMember(){ //로그인된 유저가 옳바른 지 확인하고 정보 가져옴
        return findMember(getUserByToken());
    }
    public Member getUserByToken(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;

        return principalDetails.getMember();
    }


    private Member findMember(Member member){// 아래 getUserByToken 쓸거임
        return findVerifiedMemberId(member.getMemberId());
    }

    public void deleteMember(long id){
        memberRepository.delete(findVerifiedMemberId(id));
    }


    public Member findVerifiedMemberId(long memberid){
        Optional<Member> optionalCategoryr = memberRepository.findById(memberid);
        Member findMember =
                optionalCategoryr.orElseThrow(()->
                        new RuntimeException("등록되지 않은 회원 "));
        return findMember;
    }

    public Member findVerifiedUsername(String username){
        Optional<Member> optionaluser = memberRepository.findByUsername(username);
        Member findMember =
                optionaluser.orElseThrow(()->
                        new RuntimeException("등록되지 않은 회원 "));
        return findMember;
    }

    /*public Member findVerifiedUsernameAndPassword(String username, String password){
        Optional<Member> optionaluser = memberRepository.findByUsernameAndPassword(username,password);
        Member findMember =
                optionaluser.orElseThrow(()->
                        new RuntimeException("등록되지 않은 회원 "));
        return findMember;
    }*/





    public Page<Member> findAllMember(int page, int size){
        return memberRepository.findAll(PageRequest.of(page,size));
    }

    public Member updateMember(Member member, Member patchMember){

        Optional.ofNullable(patchMember.getUsername())
                .ifPresent(username -> member.setUsername(username));
        Optional.ofNullable(patchMember.getPassword())
                .ifPresent(password -> member.setPassword(password));
        Optional.ofNullable(patchMember.getNickName())
                .ifPresent(nickName -> member.setNickName(nickName));
        Optional.ofNullable(patchMember.getCategory())
                .ifPresent(category -> member.setCategory(category));
        Optional.ofNullable(patchMember.getProfile())
                .ifPresent(profile -> member.setProfile(profile));
        Optional.ofNullable(patchMember.getRoles())
                .ifPresent(roles -> member.setRoles(roles));
        Optional.ofNullable(patchMember.getReviewList())
                .ifPresent(reviewList -> member.setReviewList(reviewList));
        Optional.ofNullable(patchMember.getProductHearts())
                .ifPresent(productHearts -> member.setProductHearts(productHearts));

        return memberRepository.save(member);
    }

    public Member authenticate(String username, String password){
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(()->new RuntimeException("Email Not Found"));

        // ***** 패스워드값 확인 부분 ****
        if(!bCryptPasswordEncoder.matches(password, member.getPassword())){
            throw new RuntimeException("Wrong Password");
        }
        return member;
    }

    public String endcodePassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }

    public Boolean memberCheck(HttpServletRequest request){
        if(request.getHeader("Authorization") == null) return true;
     //   if(request.getHeader("Authorization") == "") return true;
        if(request.getHeader("Authorization").equals(null)) return true;

        //현재 상태 비회원이면 트루 출력 회원일시 false 반환
        else return false;
    }
    public void imgUpdate(Member member,String photo){
        member.setProfile(photo);
        memberRepository.save(member);
    }

    public void registerAdmin(){
        String password = bCryptPasswordEncoder.encode("1234");
        Member member1 = new Member(1L,"a@gmail.com","관리자1",password);
        member1.setRoles("ROLE_ADMIN");
        memberRepository.save(member1);
        Member member2 = new Member(2L,"b@gmail.com","관리자2",password);
        member2.setRoles("ROLE_ADMIN");
        memberRepository.save(member2);
        Member member3 = new Member(3L,"d@gmail.com","관리자3",password);
        member3.setRoles("ROLE_ADMIN");
        memberRepository.save(member3);
        Member member4 = new Member(4L,"c@gmail.com","관리자4",password);
        member4.setRoles("ROLE_ADMIN");
        memberRepository.save(member4);
    }
}
