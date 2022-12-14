package com.example.Api.application.domain.member.service;

import com.example.Api.application.domain.member.repository.MemberRepository;
import com.example.Api.application.global.exception.BusinessLogicException;
import com.example.Api.application.global.exception.ExceptionCode;
import com.example.Api.infra.oauth.PrincipalDetails;
import com.example.Api.application.entity.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
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
        verifyExistInfo(member.getUsername(),member.getNickName(),"all");
        return memberRepository.save(member);
    }

    public void verifyExistInfo(String userName, String nickName, String checkValue) {

        if (checkValue.equals("nickName")) {
            Optional<Member> optionalMember = memberRepository.findByNickName(nickName);
            if (optionalMember.isPresent()) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_INFORMATION_EXISTS);
            }
        } else if (checkValue.equals("all")) {
            Optional<Member> optionalMember = memberRepository.findByUsername(userName);
            Optional<Member> optionalMember2 = memberRepository.findByNickName(nickName);
            if ((optionalMember.isPresent()) || (optionalMember2.isPresent())) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_INFORMATION_EXISTS);
            }

        }
    }

    /*public Member findMember(long id) {

        Member member = new Member(id,"kcd@gmail.com","?????????","asd");
        return member;
    }*/
    /*public void imgUpdate(Member member,String photo){
        member.setProfile(photo);
        memberRepository.save(member);
    }*/

    public Member getLoginMember(){ //???????????? ????????? ????????? ??? ???????????? ?????? ?????????
        return findMember(getUserByToken());
    }
    public Member getUserByToken(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;

        return principalDetails.getMember();
    }


    private Member findMember(Member member){// ?????? getUserByToken ?????????
        return findVerifiedMemberId(member.getMemberId());
    }

    public void deleteMember(long id){
        memberRepository.delete(findVerifiedMemberId(id));
    }


    public Member findVerifiedMemberId(long memberid){
        Optional<Member> optionalCategoryr = memberRepository.findById(memberid);
        Member findMember =
                optionalCategoryr.orElseThrow(()->
                        new RuntimeException("???????????? ?????? ?????? "));
        return findMember;
    }

    public Member findVerifiedUsername(String username){
        Optional<Member> optionaluser = memberRepository.findByUsername(username);
        Member findMember =
                optionaluser.orElseThrow(()->
                        new RuntimeException("???????????? ?????? ?????? "));
        return findMember;
    }

    /*public Member findVerifiedUsernameAndPassword(String username, String password){
        Optional<Member> optionaluser = memberRepository.findByUsernameAndPassword(username,password);
        Member findMember =
                optionaluser.orElseThrow(()->
                        new RuntimeException("???????????? ?????? ?????? "));
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

        // ***** ??????????????? ?????? ?????? ****
        if(!bCryptPasswordEncoder.matches(password, member.getPassword())){
            throw new RuntimeException("Wrong Password");
        }
        return member;
    }

    public String endcodePassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }

    public Boolean memberCheck(HttpServletRequest request){
//        if(request.getHeader("Authorization") == null) return true;
//         String token =  request.getHeader("Authorization");
//         if( token == null) return true;
     //   if(request.getHeader("Authorization") == "") return true;

        //?????? ?????? ??????????????? ?????? ?????? ???????????? false ??????
     //   else return false;
        if(request.getHeader("Authorization").contains("Bearer")) return false;
        else return true;
    }
    public void imgUpdate(Member member,String photo){
        member.setProfile(photo);
        memberRepository.save(member);
    }


    public boolean checkAdminPassword(String inputPassword, String adminRegisterPassword){
        if(!inputPassword.equals(adminRegisterPassword)){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
        return true;
    }
    public Member registerAdmin(List<Member> adminList){

        String adminPassword = bCryptPasswordEncoder.encode("ab12#$%^");
        Member newAdmin = new Member();

        if(adminList.isEmpty()){
            newAdmin.setProfile("https://pre-project2.s3.ap-northeast-2.amazonaws.com/userprofile.png");
            newAdmin.setUsername("a@gmail.com");
            newAdmin.setNickName("?????????1");
            newAdmin.setPassword(adminPassword);
        }
        else {
            Member lastAdmin = adminList.get(adminList.size()-1);
            String lastUsername = lastAdmin.getUsername();
            String lastNickName = lastAdmin.getNickName();
            int a = lastUsername.charAt(0)+1;
            String nextUsername = (char)a + "@gmail.com";  // ????????? -> ?????? ?????????
            int b = Character.getNumericValue(lastNickName.charAt(lastNickName.length()-1))+1;
            String nextNickName = "?????????" + b;  // ????????? ????????? ?????? -> ?????? ?????? ??????
            newAdmin.setProfile("https://pre-project2.s3.ap-northeast-2.amazonaws.com/userprofile.png");
            newAdmin.setUsername(nextUsername);
            newAdmin.setNickName(nextNickName);
            newAdmin.setPassword(adminPassword);
        }

        newAdmin.setRoles("ROLE_ADMIN");
        return memberRepository.save(newAdmin);
    }

    public List<Member> findAdmins(String roles){
        return  memberRepository.findAllByRoles(roles);
    }
}
