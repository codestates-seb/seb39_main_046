package com.example.Api.review;

import com.example.Api.category.Category;
import com.example.Api.member.Member;
import com.example.Api.member.MemberService;
import com.example.Api.product.Product;
import com.example.Api.product.ProductService;
import com.example.Api.response.MultiResponseDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/review")
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final ProductService productService;
    private final MemberService memberService;

    private int size = 0;

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
    public ResponseEntity postReview(@PathVariable("product-id") @Positive long productId,
                                     @Validated @RequestBody ReviewPostDto reviewPostDto){
        Member writter = memberService.getLoginMember();
        Member  verifiedMember = memberService.findVerifiedMemberId(writter.getId());
        Product product = productService.findVerifiedProductId(productId);
        long calculatedReviews = product.addReviews();
        Product addedReviews = productService.updateReviews(product,calculatedReviews);

        Review review = new Review();
        review.setContent(reviewPostDto.getContent());
        review.setImageURL(reviewPostDto.getImageURL());
        review.setMember(writter);
        review.setProduct(addedReviews);
        Review savedReview = reviewService.createReview(review);

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
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
    //수정 기능 확인 필요
    @ApiOperation(value = "리뷰 수정",
             notes = "✅ 리뷰를 수정합니다.\n - \n " )
    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive long reviewId,
                                      @Validated @RequestBody ReviewPatchDto reviewPatchDto){
        Review selectedReview = reviewService.findVerifiedReviewId(reviewId);
        Member editor = memberService.getLoginMember();
        Product product = productService.findVerifiedProductId(selectedReview.getProduct().getProductId());

        selectedReview.setContent(reviewPatchDto.getContent());
        selectedReview.setImageURL(reviewPatchDto.getImageURL());
        reviewService.updateReview(selectedReview, editor);


        return new ResponseEntity<>(selectedReview, HttpStatus.OK);
    }

    /*
# DELETE("/{member-id}"), Request Parmeters : long reviewId
: 리뷰 삭제
     */
    @ApiOperation(value = "리뷰 삭제",
            notes = "✅ 리뷰를 삭제합니다.\n - \n " )
    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") @Positive long reviewId){
        Member member = memberService.getLoginMember();
        Review findReview = reviewService.findVerifiedReviewId(reviewId);

        Product product = productService.findVerifiedProductId(findReview.getProduct().getProductId());
        long calculatedReviews = product.withdrawReviews();
        Product withdrawnReviews = productService.updateReviews(product,calculatedReviews);
        /*findReview.setProduct(withdrawnReviews);*/
        reviewService.deleteReview(findReview,member);


        return new ResponseEntity<>("리뷰 삭제 완료", HttpStatus.OK);
    }

    //베스트 리뷰 보기
    @ApiOperation(value = " 베스트 리뷰 조회",
            notes = "✅ TOP 5 리뷰를 조회합니다.\n - \n " )
    @GetMapping("/bestReview")
    public ResponseEntity getBestReviews(){
        List<Review> bestReviews = new ArrayList<>();
        List<Review> reviewList = reviewService.findAllReviews(Sort.by(Sort.Direction.DESC, "hearts"));

        //최소 좋아요수 (10) 이하인 상품들은 제거
        long minHearts = 10;
        for(int i =0 ;i<reviewList.size();i++){
            if(reviewList.get(i).getHearts()<minHearts){
                reviewList.remove(i);
            }
        }
        int maxCount = 0;
        if(reviewList.size()>=5){
            maxCount = 5;
        }
        else{
            maxCount = reviewList.size();
        }

        for(int i = 0 ; i<maxCount; i++){
            Review review = reviewList.get(i);
            bestReviews.add(review);
        }
        return new ResponseEntity<>(bestReviews, HttpStatus.OK);
    }


    //전체 리뷰 보기 (베스트리뷰에서 전체 보기 눌렀을 때 )
    @GetMapping("/all/{method-id}")
    @ApiOperation(value = "전체 리뷰 조회")
    public ResponseEntity getReviews(@PathVariable("method-id") @Positive int methodId,
                                        @Positive @RequestParam int page) {
        size = 20;
        Page<Review> pageReviews = reviewService.findAllReviewByMethod(page-1,size,methodId);
        List<Review> reviews = pageReviews.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(reviews, pageReviews),
                HttpStatus.OK);
    }
    //내가 쓴 리뷰 보기
    @ApiOperation(value = "내 리뷰 조회",
            notes = "✅ 본인이 작성한 리뷰들을 조회합니다.\n - \n " )
    @GetMapping("/myReviews/{method-id}")
    public ResponseEntity getMyReviews(@PathVariable("method-id") @Positive int methodId,
                                       @Positive @RequestParam int page){
        size = 20;
        Member member = memberService.getLoginMember();
        Page<Review> pageReviews = reviewService.findAllByMemberAndMethod(page-1,size,member,methodId);
        List<Review> reviewList = pageReviews.getContent();


        return new ResponseEntity<>(
                new MultiResponseDto<>(reviewList, pageReviews),
                HttpStatus.OK);

    }

    //내가 좋아요한 리뷰 보기<< 좋아요 구현 먼저
    // 우선 좋아요 수 랜덤 세팅으로
    @ApiOperation(value = "리뷰의 좋아요수 랜덤 세팅",
            notes = "✅ 리뷰의 좋아요수를 랜덤으로 세팅합니다.\",.\n - \n " )
    @PostMapping("/random")
    public ResponseEntity setRandomhearts(){
        List<Review> reviewList = reviewService.findAllReviews(Sort.by(Sort.Direction.DESC, "createdAt"));
        for(int i = 0 ; i<reviewList.size();i++){
            long randomHearts = (long)(Math.random()*100);
            reviewList.get(i).setHearts(randomHearts);
            reviewService.setRandomHearts(reviewList.get(i));
        }
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }



}
