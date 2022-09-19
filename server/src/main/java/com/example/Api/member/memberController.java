package com.example.Api.member;


import com.example.Api.category.CategoryService;
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
    private final CategoryService categoryService;




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

    return new ResponseEntity<>(mapper.memberToMemberResponseDto(response) , HttpStatus.OK);
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

     @PatchMapping("/all/{method-id}")
     @ApiOperation(value = "회원 정보 수정", notes = "✅ memthod-id가 1이면 닉네임 수정, 2면 패스워드 수정")
     public ResponseEntity getProductByProductName(@PathVariable("method-id")@Positive int methodId, Principal principal,@RequestBody String patch){
     Member member = memberRepository.findByUsername(principal.getName());

      if(methodId == 1) member.setNickName(patch);
       else member.setPassword(patch);
    return new ResponseEntity<>(member,HttpStatus.OK);

}
    @GetMapping("/mypage")
    @ApiOperation(value = "마이 페이지")// 유저 상세 페이지
    public ResponseEntity memberPage(Principal principal){

    Member findmember = memberRepository.findByUsername(principal.getName());
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(findmember),HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")// 유저 상세 페이지
    public ResponseEntity deletMember(Principal principal){
       memberService.deleteMember(memberRepository.findByUsername(principal.getName()).getId());


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
        pbitMember.setCategory(categoryService.findVerifiedCategoryId(id));
    memberRepository.save(pbitMember);
    return new ResponseEntity<>("등록 완료", HttpStatus.OK);
    }
//    @PostMapping("/profile/{member-id}")
//    @ApiOperation(value = "프로필 사진 추가")
//    public ResponseEntity profile(@PathVariable("member-id") @Positive long memberId,@RequestPart("file")MultipartFile mfile) throws IOException {
////이미지 저장 url 추가
//
//        Member member = new Member();
//        try {
//            if (member.getProfile() != null) { // 이미 프로필 사진이 있을경우
//                File file = new File(urlPath + member.getProfile()); // 경로 + 유저 프로필사진 이름을 가져와서
//                file.delete(); // 원래파일 삭제
//            }
//            mfile.transferTo(new File(urlPath + mfile.getOriginalFilename()));  // 경로에 업로드
//        } catch (IllegalStateException | IOException e) {
//            e.printStackTrace();
//        }
//        memberService.imgUpdate(memberId,mfile.getOriginalFilename());
//return new ResponseEntity<>("등록 완료",HttpStatus.OK);
//    }

}
