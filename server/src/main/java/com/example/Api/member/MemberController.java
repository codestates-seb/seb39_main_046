package com.example.Api.member;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Api.category.CategoryService;
import com.example.Api.product.Product;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/member")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final MemberMapper mapper;
    private final CategoryService categoryService;
    private final ReviewService reviewService;


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
public ResponseEntity signUp(@Validated @RequestBody MemberPostDto memberPostDto) {
    Member member = mapper.memberPostDtoToMember(memberPostDto);
    member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
    member.setRoles("ROLE_USER");
    Member response = memberService.createMember(member);

    return new ResponseEntity<>(mapper.memberToMemberResponseDto(response) , HttpStatus.OK);
}

     @PatchMapping("/{method-id}")
     @ApiOperation(value = "회원 정보 수정", notes = "✅ memthod-id가 1이면 닉네임 수정, 2면 패스워드 수정")
     public ResponseEntity memberPatch(@PathVariable("method-id")@Positive int patchId,@RequestBody String patch){

    Member member = memberService.getLoginMember();
    Member updatedMember = member;

    if(patchId == 1) {
          updatedMember.setNickName(patch);
    }
    else {
          String password = memberService.endcodePassword(patch);
          updatedMember.setPassword(password);
    }

    return new ResponseEntity<>(memberService.updateMember(member,updatedMember),HttpStatus.OK);

}

    @GetMapping("/mypage")
    @ApiOperation(value = "마이 페이지")// 유저 상세 페이지
    public ResponseEntity memberPage(){
        Member member =  memberService.getLoginMember();
        // 마이페이지 +나의 리뷰+ 찜꽁 상품 + 찜꽁 리뷰
        int size = 5;
        int page = 1;
        Page<Review> pageReviews = reviewService.findAllByMemberAndMethod(page-1,size,member,4);
        List<Review> reviewList = pageReviews.getContent();

       /* //찜꽁 상품
        List<Product> jjimkkong = */
        //찜꽁 리뷰

        //new SingleResponseDto<>(mapper.memberToMemberResponseDto(member))
        return new ResponseEntity<>(
                new MyPageResponseDto<>(member,new MultiResponseDto<>(reviewList,pageReviews)),
                HttpStatus.OK);

    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")// 회원 탈퇴
    public ResponseEntity deletMember(){
       Member member = memberService.getLoginMember();

       memberService.deleteMember(member.getMemberId());

        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }

    @PostMapping("/pbti/{category-id}")
    @ApiOperation(value = "멤버에 편비티아이 추가")
    public ResponseEntity pbti(@PathVariable("category-id") @Positive long id){

        Member member = memberService.getLoginMember();
        Member updatedMember = member;
        updatedMember.setCategory(categoryService.findVerifiedCategoryId(id));
        memberService.updateMember(member,updatedMember);

    return new ResponseEntity<>("등록 완료", HttpStatus.OK);
    }


    @PostMapping("/profile")
    @ApiOperation(value = "프로필 사진 추가")
    public ResponseEntity profile(@RequestPart("file") MultipartFile mfile) throws IOException {
//이미지 저장 url 추가

        Member member = memberService.getLoginMember();
        Member updatedMember = member;
        try {
            String savePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\";
            mfile.transferTo(new File(savePath + mfile.getOriginalFilename()));  // 경로에 업로드
            System.out.println(savePath);
            updatedMember.setProfile(mfile.getOriginalFilename());
            memberService.updateMember(member,updatedMember);

            /*memberService.imgUpdate(member, mfile.getOriginalFilename());*/
            return new ResponseEntity<>("등록 완료", HttpStatus.OK);

        }catch(Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("등록 완료",HttpStatus.OK);
    }

    @ApiOperation(value = "전체 멤버조회", notes = "관리자 전용 기능")
    @GetMapping("/all")
    public ResponseEntity getProductByProductName(@Positive @RequestParam int page) {

        Page<Member> allMember = memberService.findAllMember(page-1,10);
        List<Member> membertList = allMember.getContent();

        return new ResponseEntity<>(membertList,
                HttpStatus.OK);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인 테스트 -> 토큰 반환(유효기간 하루)")
    public ResponseEntity login (@Validated @RequestBody MemberLoginDto memberLoginDto){

        Member loginMember = memberService.authenticate(memberLoginDto.getUserName(), memberLoginDto.getPassword());

        //Member member1 = memberService.findVerifiedMemberId(1L);

        if(loginMember != null){  // 입력한 email과 비밀번호 정보를 가진 회원이 있을 경우
            String jwtToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60*24)))   // 60000 -> 60초 / 10 -> 분
                    /*.withClaim("id", member1.getId())
                    .withClaim("username", member1.getUsername())*/
                    .withClaim("id",loginMember.getMemberId())
                    .withClaim("username", loginMember.getUsername())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));

            return new ResponseEntity<>("Bearer " + jwtToken, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("등록되지 않은 회원입니다.", HttpStatus.NOT_FOUND);
    }



}
