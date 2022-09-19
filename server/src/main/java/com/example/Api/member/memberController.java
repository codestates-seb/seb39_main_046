package com.example.Api.member;


import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/member")
@Validated
@RequiredArgsConstructor
public class memberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;




/*
    // 5. 유저 삭제 (회원 탈퇴)



//    @GetMapping("/all") // 모든 유저 조회
//    public ResponseEntity memberall(@Positive @RequestParam int page){
//        Page<Member> page1 =
//        return new ResponseEntity<>(page1,HttpStatus.ACCEPTED);
//    }
*/
@PostMapping("/signup")
@ApiOperation(value = "회원가입")
public ResponseEntity signup(@Validated @RequestBody MemberPostDto memberPostDto) {
    Member member = mapper.memberPostDtoToMember(memberPostDto);
    member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
    member.setRoles("USER");
    Member response = memberService.createMember(member);

    return new ResponseEntity<>(response , HttpStatus.OK);
}
//@PatchMapping("/{member-id}")
//@ApiOperation(value = "회원 정보 수정")
//public ResponseEntity update(@Validated @RequestBody MemberPatchDto memberPatchDto){
//
//    Member member = mapper.memberPatchDtoToMember(memberPatchDto);
//    member.setUsername("바뀐이메일");
//    Member response = memberService.createMember(member);
//
//    return new ResponseEntity<>(response,HttpStatus.OK);
//}
    @PatchMapping("/password/{member-id}")//패스워드 수정
    @ApiOperation(value = "패스워드 변경")
    public ResponseEntity passwordUpdate(@PathVariable("member-id") @Positive long id,@RequestBody String password){
    //아이디 값을 통해 유저 찾음
        Member member = new Member(id,"테스트","테스트","123");
        member.setRoles("USER");
        member.setPassword(password);
        return new ResponseEntity<>(member,HttpStatus.OK);
    }
    @GetMapping("/{member-id}")
    @ApiOperation(value = "마이 페이지")// 유저 상세 페이지
    public ResponseEntity memberPage(@PathVariable("member-id") @Positive long id){

        String password = bCryptPasswordEncoder.encode("ssss");
    Member member = new Member(id,"이메일","닉네임",password);
    member.setRoles("USER");
//        Member response = memberService.findMember(id);
//        response.setRoles("USER");
        return new ResponseEntity<>(member,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{member-id}")
    @ApiOperation(value = "회원 탈퇴")// 유저 상세 페이지
    public ResponseEntity deletMember(@PathVariable("member-id") @Positive long id){


        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }
    @GetMapping("/test")
    @ApiOperation(value = "토큰으로 멤버 조회")
    public String getMyInfo(Principal principal){
        return principal.toString();
    }

    @PostMapping("/pbti/{category-id}")
    @ApiOperation(value = "멤버에 편비티아이 추가")
    public ResponseEntity pbti(Principal principal ,@PathVariable("category-id") @Positive long id){

    Member pbitMember = memberRepository.findByUsername(principal.getName());
        pbitMember.setCategoryId(id);
    memberRepository.save(pbitMember);
    return new ResponseEntity<>("등록 완료", HttpStatus.OK);
    }
    @PostMapping("/profile/{member-id}")
    @ApiOperation(value = "프로필 사진 추가")
    public ResponseEntity profile(@PathVariable("member-id") @Positive long memberId,@RequestPart("file")MultipartFile mfile) throws IOException {
String urlPath = "C:/Users/rjsgh/gi test/anothertest/jwtTest/src/main/resources/static/images";
       // String password = bCryptPasswordEncoder.encode("ssss");
     //   Member member = new Member(memberId,"이메일","닉네임",password);
        Member member = new Member();
        try {
            if (member.getProfile() != null) { // 이미 프로필 사진이 있을경우
                File file = new File(urlPath + member.getProfile()); // 경로 + 유저 프로필사진 이름을 가져와서
                file.delete(); // 원래파일 삭제
            }
            mfile.transferTo(new File(urlPath + mfile.getOriginalFilename()));  // 경로에 업로드
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        memberService.imgUpdate(memberId,mfile.getOriginalFilename());
return new ResponseEntity<>("등록 완료",HttpStatus.OK);
    }

}
