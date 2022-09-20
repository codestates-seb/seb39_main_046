package com.example.Api.review;

import com.example.Api.member.MemberService;
import com.example.Api.product.ProductService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/review")
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final ProductService productService;
    private final MemberService memberService;

    public ReviewController(ReviewService reviewService, ProductService productService, MemberService memberService) {
        this.reviewService = reviewService;
        this.productService = productService;
        this.memberService = memberService;
    }

    /*
    # POST("/{member-id}"), Request Parmeters : long productId
:  리뷰 댓글 작성
*/
    @ApiOperation(value = "리뷰 등록",
            notes = "✅ 상품에 대한 리뷰를 등록합니다.\n - \n " )
    @PostMapping("/{product-id}")
    public ResponseEntity postReview(@PathVariable("member-id") @Positive long productId,
                                     @RequestParam long memberId){
        return new ResponseEntity<>("", HttpStatus.CREATED);
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

/*
# POST("/{member-id}"), Request Parmeters : long reviewId
: 일반 사용자가 리뷰 댓글 좋아요 등록 / 취소
- 현재 회원이 해당 댓글에 좋아요를 누르지 않았다면 -> 새로운 commentHeart 등록, comment 테이블의 hearts +1
- 현재 회원이 해당 댓글에 이미 좋아요를 눌렀다면 -> 해당하는 commentHeartId의 값 DB에서 삭제, comment 테이블의 hearts -1
*/

/*
# PATCH("/{member-id}"), Request Parmeters : long reviewId
: 리뷰 댓글 수정
*/
    @ApiOperation(value = "리뷰 수정",
             notes = "✅ 리뷰를 수정합니다.\n - \n " )
    @PostMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("reivew-id") @Positive long reviewId,
                                     @RequestParam long memberId){
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    /*
# DELETE("/{member-id}"), Request Parmeters : long reviewId
: 리뷰 댓글 삭제
     */
    @ApiOperation(value = "리뷰 삭제",
            notes = "✅ 리뷰를 삭제합니다.\n - \n " )
    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("reivew-id") @Positive long reviewId,
                                        @RequestParam long memberId){
        return new ResponseEntity<>("", HttpStatus.OK);
    }

}
