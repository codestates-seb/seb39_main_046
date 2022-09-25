package com.example.Api.member;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.product.*;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/member")
@Validated
@RequiredArgsConstructor
@Tag(name = "Member", description = "Member API")
@Api(tags = "Member")
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final MemberMapper mapper;
    private final ProductMapper productMapper;

    private final ReviewMapper reviewMapper;
    private final CategoryService categoryService;
    private final ReviewService reviewService;
    private final ProductService productService;
    private final ProductHeartService productHeartService;
    private final ReviewHeartService reviewHeartService;


    @PostMapping
    @ApiOperation(value = "관리자 계정 등록")
    public ResponseEntity registerAdmin(){
        memberService.registerAdmin();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity signUp(@Validated @RequestBody MemberPostDto memberPostDto) {
    Member member = mapper.memberPostDtoToMember(memberPostDto);
    member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
    member.setRoles("ROLE_USER");
    Member response = memberService.createMember(member);

    return new ResponseEntity<>(mapper.memberToMemberResponseDto(response) , HttpStatus.OK);
    }

     @PatchMapping("/{patch-id}")
     @ApiOperation(value = "회원 정보 수정", notes = "✅ patch-id가 1이면 닉네임 수정, 2면 패스워드 수정")

     public ResponseEntity memberPatch(@PathVariable("patch-id")@Positive int patchId,
                                       @RequestBody String patch){

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
    @Tag(name = "My Page", description = "My Page API")
    @GetMapping("/myPage")
    @ApiOperation(value = "마이 페이지 ",
            notes = "✅ 마이 페이지 최초 데이터 요청 ( 나의 리뷰, 찜꽁 상품, 찜꽁 리뷰 )  \n " +
                    " - 나의 리뷰 최초 정렬 방식 : 최신 리뷰순  \n " +
                    " - 찜꽁 상품/리뷰 최초 정렬 방식 : 최근에 좋아요를 누른 순  \n " +
                    " - 최초 데이터 이후의 추가 데이터(정렬된 데이터)는 각각 별도로 추가 요청  \n  \n " )
    public ResponseEntity memberPage(HttpServletRequest request){

        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else { // 마이페이지  : 찜꽁 상품 8개( O ) + 나의 리뷰 5개 ( O )  + 찜꽁 리뷰 4개
            Member member =  memberService.getLoginMember();
            int page = 1;
            int jjimSize = 4;

            //  찜꽁 바구니
            MultiResponseDto jjimProducts;
            String company = "all";
            int productMethodId = 4;  // 최근에 좋아요 누른 순서
            List<ProductHeart> productHeartList;
            Page<ProductHeart> productHeartsPage = productHeartService.SortHeartProducts(page-1,jjimSize,productMethodId,company,member,null);
            if(productHeartsPage.isEmpty()){
                jjimProducts = null;
            }
            else {
                productHeartList = productHeartsPage.getContent();
                setHeartFlagTrue(productHeartList);
                jjimProducts = new MultiResponseDto<>(productMapper.productHeartsToProductHeartResponseDto(productHeartList), productHeartsPage);
            }
            // 나의 리뷰
            MultiResponseDto myReviews;
            int reviewSize = 5;
            int reviewMethodId = 2;  // 최신 리뷰 순
            Page<Review> pageReviews = reviewService.SortReviews(page-1,reviewSize,reviewMethodId, member,null);
            if(pageReviews.isEmpty()){
                myReviews = null;
            }
            else {
                List<Review> reviewList = pageReviews.getContent();
                checkReviewHeartFlagsLogin(member,reviewList);
                myReviews = new MultiResponseDto<>(reviewList,pageReviews);
            }

            // 찜꽁 리뷰
            MultiResponseDto jjimReviews;
            int jjimReviewMethodId = 3; // 최근에 좋아요 누른 순서
            Page<ReviewHeart> reviewHeartsPage = reviewHeartService.SortHeartReviews(page-1,jjimSize,jjimReviewMethodId,member);
            if(reviewHeartsPage.isEmpty()){
                jjimReviews = null;
            }
            else {
                List<ReviewHeart> reviewHeartList = reviewHeartsPage.getContent();
                setReviewHeartFlagTrue(reviewHeartList);
                jjimReviews = new MultiResponseDto<>(reviewMapper.reviewHeartsToReviewHeartsResponseDto(reviewHeartList),reviewHeartsPage);
            }

            return new ResponseEntity<>(
                    new MyPageResponseDto<>(member,jjimProducts,myReviews,jjimReviews),
                    HttpStatus.OK);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴",
                  notes = "✅ 로그인 상태 -> 회원 탈퇴  \n  \n")
    public ResponseEntity deleteMember(){
       Member member = memberService.getLoginMember();
       memberService.deleteMember(member.getMemberId());
        return new ResponseEntity<>("삭제 완료",HttpStatus.OK);
    }

    @Tag(name = "PBTI Page", description = "PBTI Page API")
    @PostMapping("/pbti/{category-id}")
    @ApiOperation(value = "PBTI 결과 등록",
                  notes = "✅ PBTI 페이지 ( 회원 / 비회원 )  \n " +
                    " - categoryId : 선택된 카테고리명에 해당하는 카테고리ID  \n " +
                    " - 추천 상품 : 선택된 카테고리에 해당하는 추천상품 6가지  \n  \n  ")
    public ResponseEntity pbti(@PathVariable("category-id") @Positive long categoryId,
                               HttpServletRequest request){
        int size = 6;
        List<Product> recommends = new ArrayList<>();
        boolean loginStatus = memberService.memberCheck(request);
        if(loginStatus){
            // 비회원 PBTI
            Category category = categoryService.findVerifiedCategoryId(categoryId);
            if(category.getProducts().size()<size){
                List<Product> products = productService.findProductsByCategory(category);

                List<Category> allCategories = categoryService.findAllCategoryAsList();
                //연결된 상품이 최소 1개라도 있는 카테고리들로 리스트 만들기
                List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);


                if(products.size() == 0){  // 카테고리에 해당하는 상품이 아예 없을 때
                    // 랜덤 카테고리 + 랜덤 상품
                    recommends = productService.setRandomRecommendedProducts(atLeastOne,"PBTI");
                }
                atLeastOne.removeIf(category1 -> category1 == category);
                recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne,"PBTI",products);
            }
            else {
                recommends = productService.setRecommendedProducts(category,"PBTI");
            }
        }
        else {  //회원 PBTI
            Member member = memberService.getLoginMember();
            Member updatedMember = member;
            updatedMember.setCategory(categoryService.findVerifiedCategoryId(categoryId));
            Member PBTIMember = memberService.updateMember(member,updatedMember);

            //PBTI 결과 카테고리에 해당하는 랜덤 상품 세팅
            Category memberCategory = PBTIMember.getCategory();
            if((memberCategory.getProducts().size()<size)){
                List<Product> products = productService.findProductsByCategory(memberCategory);
                List<Category> allCategories = categoryService.findAllCategoryAsList();
                List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);

                if(products.size() == 0){  // 카테고리에 해당하는 상품이 아예 없을 때
                    // 랜덤 카테고리 + 랜덤 상품
                    recommends = productService.setRandomRecommendedProducts(atLeastOne,"PBTI");
                }
                atLeastOne.removeIf(category1 -> category1 == memberCategory);
                recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne,"PBTI",products);
            }
            else {
                recommends = productService.setRecommendedProducts(memberCategory,"PBTI");
            }
            checkHeartFlagsLogin(member,recommends); // 상품 좋아요 플래그 적용
        }

    return new ResponseEntity<>(recommends, HttpStatus.OK);
    }


    @PostMapping("/profile")
    @ApiOperation(value = "프로필 사진 추가",
                  notes = "✅ 로그인 상태 -> 프로필 사진 추가  \n  \n")
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

    @ApiOperation(value = "전체 멤버조회", notes = "✅관리자 전용 기능")
    @GetMapping("/all")
    public ResponseEntity getProductByProductName(@Positive @RequestParam int page) {

        Page<Member> allMember = memberService.findAllMember(page-1,10);
        List<Member> membertList = allMember.getContent();

        return new ResponseEntity<>(membertList,
                HttpStatus.OK);
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인  -> 토큰 반환(유효기간 하루)",
                  notes = "✅ 로그인 후 응답으로 받은 토큰은 Authorize - Value에 대입  \n  \n")
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

    public void checkHeartFlagsLogin(Member member, List<Product> products){
        for(Product product : products){
            if(productHeartService.checkAlreadyHeart(member,product)){
                //이미 눌렀으면 false, 누르지 않았다면 true
                product.setHeartFlag(false);
            }
            else{
                product.setHeartFlag(true);
            }
        }
    }
    public void setHeartFlagTrue(List<ProductHeart> productHearts){
        for(int i = 0 ; i< productHearts.size() ; i++){
            productHearts.get(i).getProduct().setHeartFlag(true);
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
