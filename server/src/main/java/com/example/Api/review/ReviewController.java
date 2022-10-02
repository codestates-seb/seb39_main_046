package com.example.Api.review;

import com.example.Api.S3Upload;
import com.example.Api.member.Member;
import com.example.Api.member.MemberService;
import com.example.Api.product.Product;
import com.example.Api.product.ProductService;
import com.example.Api.response.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
/*@RequestMapping("/review")*/
@Validated
@Tag(name = "Review", description = "Review API")
@Api(tags = "Review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ProductService productService;
    private final MemberService memberService;

    private final ReviewHeartService reviewHeartService;
    private ReviewMapper reviewMapper;
    private final S3Upload s3Upload;

    private int size = 0;

    public ReviewController(ReviewService reviewService, ProductService productService, MemberService memberService,
                            ReviewHeartService reviewHeartService, ReviewMapper reviewMapper, S3Upload s3Upload) {
        this.reviewService = reviewService;
        this.productService = productService;
        this.memberService = memberService;
        this.reviewHeartService = reviewHeartService;
        this.reviewMapper = reviewMapper;
        this.s3Upload = s3Upload;
    }


    @ApiOperation(value = "리뷰 등록",
            notes = "✅ 상품에 대한 리뷰를 등록합니다.\n - \n " )
    @PostMapping(value = "/review/{product-id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    // @RequestPart(value="file",required = false)
    public ResponseEntity postReview(@Positive @PathVariable("product-id") long productId,
                                     @Valid @RequestPart(value = "content",required = false) ReviewPostDto reviewPostDto, @RequestPart(value = "file",required = false) MultipartFile rfile,
                                     HttpServletRequest request) throws IOException {

        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus)
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);

        else {
            Member writter = memberService.getLoginMember();
            memberService.findVerifiedMemberId(writter.getMemberId());
            Product product = productService.findVerifiedProductId(productId);


            Review review = new Review();
            if (reviewPostDto == null) review.setContent(null);
            else review.setContent(reviewPostDto.getContent());
            if(rfile == null) review.setImageURL(null);
            else reviewService.imgUpdate(review, s3Upload.upload(rfile));

            review.setMember(writter);
            review.setProduct(product);

            reviewService.createReview(review);
            // 상품 리뷰 수 증가
            Product updatedProduct = product;
            updatedProduct.addReviews();
            productService.updateProduct(product,updatedProduct);


            return new ResponseEntity<>(review, HttpStatus.CREATED);
        }
    }


    @ApiOperation(value = "리뷰 수정",
            notes = "✅ 리뷰를 수정합니다.\n - \n " )
    @PatchMapping("/review/{review-id}")
    public ResponseEntity patchReview(@Positive @PathVariable("review-id") long reviewId,
                                      @Valid @RequestPart(value = "content",required = false) ReviewPatchDto reviewPatchDto,@RequestPart(value = "file",required = false) MultipartFile rfile,
                                      HttpServletRequest request) throws IOException{

        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else {
            Member editor = memberService.getLoginMember();
            memberService.findVerifiedMemberId(editor.getMemberId());
            //리뷰 원본
            Review selectedReview = reviewService.findVerifiedReviewId(reviewId);
            boolean auth = reviewService.checkAuth(selectedReview, editor.getMemberId());

            if(auth){ // 현재 로그인한 사용자와 리뷰 작성자 일치

                Product product = productService.findVerifiedProductId(selectedReview.getProduct().getProductId());
                Review updatedReview = reviewMapper.reviewPatchDtoToReview(selectedReview, reviewPatchDto);
                if(rfile== null)

                {
                    updatedReview.setContent(reviewPatchDto.getContent());
                }

                else {
                    updatedReview.setImageURL(s3Upload.upload(rfile));
                }
                Review result = reviewService.updateReview(selectedReview,updatedReview);
                checkReviewHeartFlag(editor,result);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("리뷰 수정 권한이 없습니다", HttpStatus.BAD_REQUEST);
            }
        }
    }



    @ApiOperation(value = "리뷰 삭제",
            notes = "✅ 리뷰를 삭제합니다.\n - \n " )
    @DeleteMapping("/review/{review-id}")
    public ResponseEntity deleteReview(@Positive @PathVariable("review-id") long reviewId,
                                       HttpServletRequest request){
        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else {
            Member member = memberService.getLoginMember();
            Review findReview = reviewService.findVerifiedReviewId(reviewId);
            Product product = productService.findVerifiedProductId(findReview.getProduct().getProductId());
            reviewService.deleteReview(findReview,member);

            // 리뷰 수 감소
            Product updatedProduct = product;
            updatedProduct.withdrawReviews();
            productService.updateProduct(product,updatedProduct);
            return new ResponseEntity<>("리뷰 삭제 완료", HttpStatus.OK);
        }
    }

    //베스트 리뷰 보기
    @ApiOperation(tags = {"Main Page"}, value = " 베스트 리뷰 조회", notes = "✅ TOP 5 리뷰를 조회합니다.\n - \n " )
    @GetMapping("/review/bestReview")
    public ResponseEntity getBestReviews(HttpServletRequest request){

        List<Review> bestReviews = reviewService.getTop5Reviews();

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            if(bestReviews!=null){
                checkReviewHeartFlagsNotLongin(bestReviews);
            }
        }
        else {
            if(bestReviews!=null){
                checkReviewHeartFlagsLogin(memberService.getLoginMember(),bestReviews);
            }
        }

        return new ResponseEntity<>(bestReviews, HttpStatus.OK);
    }


    //전체 리뷰 보기 (베스트리뷰에서 전체 보기 눌렀을 때 -- 리뷰 랭킹 페이지 느낌)
    @GetMapping("/review/all/{method-id}")
    @ApiOperation(value = "전체 리뷰 조회",
            notes = "✅ 모든 리뷰들을 조회합니다.\n" +
                    "정렬 : 좋아요순(1), 최신순(그 외)\n - \n " )
    public ResponseEntity getReviews(@PathVariable("method-id") @Positive int methodId,
                                     @Positive @RequestParam int page,
                                     HttpServletRequest request) {
        size = 20;
        Page<Review> pageReviews = reviewService.SortReviews(page-1,size,methodId,null,null);
        List<Review> reviewList = pageReviews.getContent();

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            if(reviewList!=null){
                checkReviewHeartFlagsNotLongin(reviewList);
            }
        }
        else {
            if(reviewList!=null){
                checkReviewHeartFlagsLogin(memberService.getLoginMember(),reviewList);
            }
        }
        return new ResponseEntity<>(
                new MultiResponseDto<>(reviewList, pageReviews),
                HttpStatus.OK);
    }


    //내가 쓴 리뷰 보기

    @ApiOperation(tags = "My Page", value = "내 리뷰 조회",
            notes = "✅  나의 리뷰 목록을 조회합니다.  \n  \n  " +
                    "정렬 : 좋아요순(1), 최신순(그 외)\n   \n " )
    @GetMapping("/member/myPage/myReviews/{method-id}")
    public ResponseEntity getMyReviews(@PathVariable("method-id") @Positive int methodId,
                                       @Positive @RequestParam int page,
                                       HttpServletRequest request){
        size = 5;
        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else {
            Member member = memberService.getLoginMember();
            Page<Review> pageReviews = reviewService.SortReviews(page-1,size,methodId, member,null);
            List<Review> reviewList = pageReviews.getContent();
            if(reviewList!=null){
                checkReviewHeartFlagsLogin(memberService.getLoginMember(),reviewList);
            }
            return new ResponseEntity<>(
                    new MultiResponseDto<>(reviewList, pageReviews), HttpStatus.OK);
            /*if(pageReviews.isEmpty()){
                return new ResponseEntity<>("작성한 리뷰가 없어요",HttpStatus.NOT_FOUND);
            }
            else {
                List<Review> reviewList = pageReviews.getContent();
                if(reviewList!=null){
                    checkReviewHeartFlagsLogin(memberService.getLoginMember(),reviewList);
                }
                return new ResponseEntity<>(
                        new MultiResponseDto<>(reviewList, pageReviews), HttpStatus.OK);
            }*/
        }
    }

    @ApiOperation(tags = "Product Detail Page", value = "상품 상세 페이지 리뷰 조회",
            notes = "✅ 상품에 달린 리뷰들을 조회합니다.  \n" +
                    "정렬 : 좋아요순(1), 최신순(그 외)  \n  \n " )
    @GetMapping("/review/productReviews/{method-id}")
    public ResponseEntity getProductReviews(@PathVariable("method-id") @Positive int methodId,
                                            @RequestParam long productId,
                                            @Positive @RequestParam int page,
                                            HttpServletRequest request) {
        size = 10;
        Product product = productService.findVerifiedProductId(productId);
        Page<Review> pageReviews = reviewService.SortReviews(page-1,size,methodId, null,product);
        List<Review> reviewList = pageReviews.getContent();

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            if(reviewList!=null){
                checkReviewHeartFlagsNotLongin(reviewList);
            }
        }
        else {
            if(reviewList!=null){
                checkReviewHeartFlagsLogin(memberService.getLoginMember(),reviewList);
            }
        }
        return new ResponseEntity<>(
                new MultiResponseDto<>(reviewList, pageReviews),
                HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 등록 / 취소",
            notes = "✅ 입력 받은 reviewId에 해당하는 리뷰에 좋아요를 등록합니다..\n  - \n " )
    @PostMapping("/review/heart")
    public ResponseEntity registerReviewHeart(HttpServletRequest request, @RequestParam long reviewId) {

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        boolean result = false;

        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else { // 로그인한 상태일 때
            Member member = memberService.getLoginMember();
            Review review = reviewService.findVerifiedReviewId(reviewId);

            ReviewHeart reviewHeart = new ReviewHeart();

            //이미 좋아요를 누른 리뷰인지 아닌지 검사( 이미 좋아요가 있다면 false, 없다면 true )
            boolean alreadyHeart = reviewHeartService.checkAlreadyHeart(member,review);

            if(alreadyHeart){ //해당 회원이 좋아요를 눌렀던 리뷰가 아닐 때
                reviewHeart = reviewHeartService.addHeart(member,review);

                //리뷰의 좋아요 수 1 증가
                Review updatedReview = review;
                updatedReview.getReviewHearts().add(reviewHeart);
                updatedReview.addHearts();
                reviewService.updateReview(review,updatedReview);

                //회원의 찜공리뷰에 리뷰 추가
                Member updatedMember = member;
                updatedMember.getReviewHearts().add(reviewHeart);
                memberService.updateMember(member,updatedMember);

                result = true;
            }
            else {// 해당 회원이 이미 좋아요를 누른 리뷰일 때 -> 좋아요 취소
                ReviewHeart findReviewHeart = reviewHeartService.findReviewHeart(member,review);
                reviewHeartService.cancelHeart(findReviewHeart);

                //리뷰의 좋아요 수 1 감소
                Review updatedReview = review;
                updatedReview.withdrawHearts();
                reviewService.updateReview(review,updatedReview);
                result = false;
            }
        }
        return result?
                new ResponseEntity<>("좋아요가 등록되었습니다",HttpStatus.OK)
                : new ResponseEntity<>("좋아요가 취소되었습니다",HttpStatus.OK);
    }

    @ApiOperation(tags = "My Page", value = "마이 페이지 - 내가 좋아요 누른 리뷰 목록 조회",
            notes = "✅ 찜꽁 리뷰를 조회합니다.  \n  \n" +
                    "methodId : 좋아요순(1), 최신 리뷰순(2), 최근 좋아요순(그 외) \n - \n " )
    @GetMapping("/member/myPage//simplifiedHeartReviews")
    public ResponseEntity getSimplifiedHeartReviews( @Positive @RequestParam int page,
                                                     @RequestParam int methodId,
                                                     HttpServletRequest request) {
        int size = 4;
        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else{
            Member member = memberService.getLoginMember();
            Page<ReviewHeart> reviewHeartsPage = reviewHeartService.SortHeartReviews(page-1,size,methodId,member);
            List<ReviewHeart> reviewHeartList = reviewHeartsPage.getContent();
            if(reviewHeartList!=null){
                setReviewHeartFlagTrue(reviewHeartList);
            }

            return new ResponseEntity<>(
                    new MultiResponseDto<>(reviewMapper.reviewHeartsToReviewHeartsResponseDto(reviewHeartList), reviewHeartsPage),
                    HttpStatus.OK);
           /* if(reviewHeartsPage.isEmpty()){
                return new ResponseEntity<>("찜꽁한 리뷰가 없어요",HttpStatus.NOT_FOUND);
            }
            else {
                List<ReviewHeart> reviewHeartList = reviewHeartsPage.getContent();
                if(reviewHeartList!=null){
                    setReviewHeartFlagTrue(reviewHeartList);
                }

                return new ResponseEntity<>(
                        new MultiResponseDto<>(reviewMapper.reviewHeartsToReviewHeartsResponseDto(reviewHeartList), reviewHeartsPage),
                        HttpStatus.OK);
            }*/
        }
    }

    @ApiOperation(value = "리뷰의 좋아요수 랜덤 세팅",
            notes = "✅ 리뷰의 좋아요수를 랜덤으로 세팅합니다.\",.\n - \n " )
    @PostMapping("/review/random")
    public ResponseEntity setRandomhearts(){
        List<Review> reviewList = reviewService.findAllReviews(Sort.by(Sort.Direction.DESC, "createdAt"));
        for(int i = 0 ; i<reviewList.size();i++){
            long randomHearts = (long)(Math.random()*100);
            reviewList.get(i).setHearts(randomHearts);
            reviewService.setRandomHearts(reviewList.get(i));
        }
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    public void checkReviewHeartFlag(Member member, Review review){
        if(reviewHeartService.checkAlreadyHeart(member,review)){
            //이미 눌렀으면 false, 누르지 않았다면 true
            review.setReviewHeartFlag(false);
        }
        else{
            review.setReviewHeartFlag(true);
        }
    }

    public void checkReviewHeartFlagsNotLongin(List<Review> reviews){
        for(Review review : reviews){
            review.setReviewHeartFlag(false); // 좋아요 상태 OFF
        }
    }
    public void checkReviewHeartFlagsLogin(Member member, List<Review> reviews){
        for(Review review : reviews){
            if(reviewHeartService.checkAlreadyHeart(member,review)){
                //이미 눌렀으면 false, 누르지 않았다면 true
                review.setReviewHeartFlag(false);
            }
            else{
                review.setReviewHeartFlag(true);
            }
        }
    }

    public void setReviewHeartFlagTrue(List<ReviewHeart> reviewHearts){
        for(int i = 0; i<reviewHearts.size(); i++){
            reviewHearts.get(i).getReview().setReviewHeartFlag(true);
        }
    }
}
