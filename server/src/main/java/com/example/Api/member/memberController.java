package com.example.Api.member;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Api.category.CategoryService;
import com.example.Api.product.Product;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.response.SingleResponseDto;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewService;
import com.google.gson.Gson;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.xmlbeans.impl.jam.mutable.MElement;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Positive;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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

     @PatchMapping("/all/{method-id}")
     @ApiOperation(value = "회원 정보 수정", notes = "✅ memthod-id가 1이면 닉네임 수정, 2면 패스워드 수정")
     public ResponseEntity memberPatch(@PathVariable("method-id")@Positive int patchId,@RequestBody String patch){

    Member member = memberService.getLoginMember();

      if(patchId == 1) member.setNickName(patch);
       else member.setPassword(patch);

       memberRepository.save(member);
    return new ResponseEntity<>(member,HttpStatus.OK);

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

        //찜꽁 상품

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

       memberService.deleteMember(member.getId());

        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }
    @PostMapping("/pbti/{category-id}")
    @ApiOperation(value = "멤버에 편비티아이 추가")
    public ResponseEntity pbti(@PathVariable("category-id") @Positive long id){


        Member member = memberService.getLoginMember();
        member.setCategory(categoryService.findVerifiedCategoryId(id));
        memberRepository.save(member);
    return new ResponseEntity<>("등록 완료", HttpStatus.OK);
    }
    @PostMapping("/profile")
    @ApiOperation(value = "프로필 사진 추가")
    public ResponseEntity profile(@RequestPart("file") MultipartFile mfile) throws IOException {
//이미지 저장 url 추가

        Member member = memberService.getLoginMember();
        try {

            String savePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\";

            mfile.transferTo(new File(savePath + mfile.getOriginalFilename()));  // 경로에 업로드
            memberService.imgUpdate(member, mfile.getOriginalFilename());
            System.out.println(savePath);
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

    @PostMapping("/test")
    @ApiOperation(value = "테스트를 위한 계정 생성및 토큰 반환")
    public ResponseEntity login (){

        Member member1 = memberService.findVerifiedMemberId(1L);
        String jwtToken = JWT.create()
                .withSubject("cos jwt token")
                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60*24)))   // 60000 -> 60초 / 10 -> 분
                .withClaim("id", member1.getId())
                .withClaim("username", member1.getUsername())
                .sign(Algorithm.HMAC512("cos_jwt_token"));

        return new ResponseEntity<>("Bearer " + jwtToken, HttpStatus.OK);
    }



}
