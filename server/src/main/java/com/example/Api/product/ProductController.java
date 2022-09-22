package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.member.*;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@Validated
public class ProductController {

    // test
    private final ProductMapper productMapper;
    private final ProductService productService;
    private final MemberService memberService;
    private final CategoryService categoryService;

    private final ReviewService reviewService;

    private final ProductHeartService productHeartService;

    private int size = 0;

    public ProductController(ProductMapper productMapper, ProductService productService,
                             CategoryService categoryService, MemberService memberService,
                             ReviewService reviewService, ProductHeartService productHeartService){
        this.productMapper = productMapper;
        this.productService = productService;
        this.categoryService = categoryService;
        this.memberService = memberService;
        this.reviewService = reviewService;
        this.productHeartService = productHeartService;

    }

    @ApiOperation(value = "Excel File 등록(상품 등록)",
            notes = "✅ Excel File을 등록합니다.\n - \n " )
    @PostMapping("/admin")
    public ResponseEntity postProducts(@RequestPart("file") MultipartFile file) throws IOException {

        List<Product>  products = new ArrayList<>();

        List<ExcelData> dataList = new ArrayList<>();
        List<Product> productList = new ArrayList<>();
        String extension = FilenameUtils.getExtension(file.getOriginalFilename()); // 3

        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            throw new IOException("엑셀파일만 업로드 해주세요.");
        }

        Workbook workbook = null;

        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);

        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) { // 4

            Row row = worksheet.getRow(i);

            ExcelData data = new ExcelData();


            /*data.setProductId(i);*/
            data.setImageURL(row.getCell(0).getStringCellValue());
            data.setProductName(row.getCell(1).getStringCellValue());
            /*String priceValue = row.getCell(2).getStringCellValue().replaceAll(",","");*/
            String priceValue = row.getCell(2).getStringCellValue();
            /*String parsedValue = "";*/
            //long price = 0;
            // 크롤링한 가격은 텍스트 형식으로 되어 있는 숫자, 문자열 가격에 "원"이나 ","가 있으면 모두 제거
            if(priceValue.contains(",") || priceValue.contains("원")){
                priceValue = priceValue.replaceAll("[,원]","");
                System.out.println(priceValue);
                //price = Long.parseLong(parsedValue);
               /* System.out.println(price);*/
            }
            else if(priceValue.isEmpty()){
                    System.out.println("현재 i 값 : " + i + ", 현재 상품 : " + data.getProductName());
                    break;
            }

            BigDecimal seq = new BigDecimal(priceValue).setScale(0,RoundingMode.FLOOR);
            System.out.println(seq);
            long categoryId = ((long)row.getCell(3).getNumericCellValue());
            data.setCategory(categoryService.findVerifiedCategoryId(categoryId));
            data.setCompany(row.getCell(4).getStringCellValue());
            data.setPrice(seq);

            // DB에 저장, 중복 삼품인지 검사 필요
            if(productService.checkDuplicatedProduct(data.getProductName())){
                continue;
            }
            else{
                Product product = productMapper.excelDataToProduct(data);
                productService.createProduct(product);
                dataList.add(data);
                productList.add(product);
            }

        }

        if(dataList.isEmpty()){
            throw new RuntimeException("파일 등록 실패");
        }
        else{
            products = productList;
            return new ResponseEntity<>(products, HttpStatus.CREATED);
        }

    }

    @ApiOperation(value = "상품명 검색(productName)",
            notes = "✅ 상품을 검색합니다.\n - \n " )
    @GetMapping
    public ResponseEntity getProductByProductName(@Parameter(name = "productName") @RequestParam String productName,
                                                  HttpServletRequest request){

        Product product = productService.findVerifiedProductName(productName);

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if (loginStatus) {   //비회원일 때
            product.setHeartFlag(false); // 좋아요 상태 OFF
        }
        else{
            checkHeartFlag(memberService.getLoginMember(),product);
        }

        return new ResponseEntity<>(product, HttpStatus.OK);
    }


    @ApiOperation(value = "상품 정보 수정",
            notes = "✅ 상품 정보를 수정합니다.\n - \n " )
    @PatchMapping("/admin")
    public ResponseEntity patchProduct(
                                @RequestParam long productId,
                                @Valid @RequestBody ProductPatchDto productPatchDto,
                                HttpServletRequest request){
        //상품 원본
        Product product = productService.findVerifiedProductId(productId);
        // 연결된 카테고리
        Category category = categoryService.findCategoryByCategoryName(productPatchDto.getCategoryName());

        Product patchProduct = productMapper.productPatchDtoToProduct(product,productPatchDto,category);

        Product result = productService.updateProduct(product, patchProduct);

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if (loginStatus) {   //비회원일 때
            result.setHeartFlag(false); // 좋아요 상태 OFF
        }
        else{
            checkHeartFlag(memberService.getLoginMember(),result);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "상품 삭제",
            notes = "✅ 입력받은 productId에 해당하는 상품을 삭제합니다.\n - \n " )
    @DeleteMapping("/admin")
    public ResponseEntity deleteProduct(@RequestParam long productId){

        productService.deleteProduct(productId);
        return new ResponseEntity<>( "삭제 완료 ( ID:"+ productId + " )", HttpStatus.OK);

    }


    @ApiOperation(value = "상품 조회 (상세 페이지 (product page) )",
            notes = "✅ 상품의 상세 페이지로 이동합니다. (조회수 1 증가)\",.\n - \n " )
    @GetMapping("/{product-id}")
    public ResponseEntity getProductByProductName(@PathVariable("product-id") @Positive long productId,
                                                  HttpServletRequest request){
        //해당 상품  + 리뷰
        Product product = productService.findVerifiedProductId(productId);
        Product updatedProduct = product;
        updatedProduct.addViews();
        Product product1 = productService.updateProduct(product,updatedProduct);

        int page = 1;
        size = 10;
        int methodId = 4;
        Page<Review> pageReviews = reviewService.findAllByProductAndMethod(page-1,size,product1,methodId);
        List<Review> reviewList = pageReviews.getContent();


        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if (loginStatus) {   //비회원일 때
            product1.setHeartFlag(false); // 좋아요 상태 OFF
        }
        else{
            checkHeartFlag(memberService.getLoginMember(),product1);
        }

        return new ResponseEntity<>(
                new ProductDetailResponseDto<>(product1,new MultiResponseDto<>(reviewList,pageReviews)),
                HttpStatus.OK);
    }

    @ApiOperation(value = "상품의 좋아요수 / 리뷰수 / 조회수 랜덤 세팅",
            notes = "✅ 상품의 정보(좋아요수 / 리뷰수 / 조회수)를 랜덤으로 세팅합니다.\",.\n - \n " )
    @PostMapping("/random")
    public ResponseEntity setRandomValues(){

        List<Product>  products = productService.findAllProduct(Sort.by(Sort.Direction.DESC, "createdAt"));
        for(int i = 0 ; i<products.size();i++){
            long randomHearts = (long)(Math.random()*100);
            long randomReviews = (long)(Math.random()*100);
            long randomViews = (long)(Math.random()*100);
            Product originalProduct = products.get(i);
            Product updatedProduct = products.get(i);
            updatedProduct.setHearts(randomHearts);
            updatedProduct.setReviews(randomReviews);
            updatedProduct.setViews(randomViews);

            productService.updateProduct(originalProduct,updatedProduct);
            products.set(i,updatedProduct);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // 편의점별 top 5, 메인 페이지에서 회사 버튼 클릭할 때마다 회사별 top5 출력 // 공백 입력 시 전체 top5 출력
    @ApiOperation(value = " TOP5 상품 조회",
            notes = "✅ TOP 5 상품의 정보를 조회합니다.\n - \n " )
    @GetMapping("/top5")
    public ResponseEntity getTop5Products(@RequestParam String company,
                                          HttpServletRequest request){

        List<Product> top5 = new ArrayList<>();
        if(company.equals(" ")){  // 전체 상품 중 TOP5 뽑기
            company = "all";
            top5 = productService.getTop5Products(company);
        }
        else{  // 회사별 TOP5 뽑기
            top5 = productService.getTop5Products(company);
        }
        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            checkHeartFlagsNotLongin(top5);
        }
        else{
            checkHeartFlagsLogin(memberService.getLoginMember(),top5);
        }
        return new ResponseEntity<>(top5, HttpStatus.OK);
    }

    @ApiOperation(value = "회사별 전체 상품 조회( 랭킹 페이지 )",
            notes = "✅ 회사별 모든 상품을 조회합니다.\n " +
                    "company에 공백 입력 시 전체 상품 조회\n " +
                    "methodId (1 : 좋아요순 / 2: 리뷰순 / 3. 조회순 / 그 외: 최신순)\n - \n " )
    @GetMapping("/allByCompany/{method-id}")
    public ResponseEntity getProductRankingPage(@PathVariable("method-id") @Positive int methodId,
                                               @RequestParam String company,
                                               @Positive @RequestParam int page,
                                                HttpServletRequest request) {
        // 메인 페이지에서 top5 전체 보기 눌렀을 때 나오는 초기 랭킹 페이지

        // top 5 + 페이징 처리되어있는 20개의 데이터 (@GetMapping("/all/{category-id}/{method-id}")로 정렬 가능)

        size = 20;
        List<Product> top5 = new ArrayList<>();
        Page<Product> pageProducts;
        List<Product> productList;

        // 회사별 랭킹 페이지
        if((company.equals("CU"))|| (company.equals("GS25")) || (company.equals("7-ELEVEN"))){

            //top 5 세팅
            top5 = productService.getTop5Products(company);
            // 페이징 처리된 20개의 데이터, 1페이지
            pageProducts = productService.getTop20ProductsPage(page-1,size,methodId, company);
            productList = pageProducts.getContent();

        }
        // 전체 랭킹 페이지
        else {
            company = "all";
            //top 5 세팅
            top5 = productService.getTop5Products(company);
            // 페이징 처리된 20개의 데이터, 1페이지
            pageProducts = productService.getTop20ProductsPage(page-1,size,methodId, company);
            productList = pageProducts.getContent();
        }

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            checkHeartFlagsNotLongin(top5);
            checkHeartFlagsNotLongin(productList);
        }
        else{
            checkHeartFlagsLogin(memberService.getLoginMember(),top5);
            checkHeartFlagsLogin(memberService.getLoginMember(),productList);
        }

        return new ResponseEntity<>(
                new ProductRankingResponseDto<>(top5,new MultiResponseDto<>(productList, pageProducts)),
                HttpStatus.OK);
    }


    @ApiOperation(value = "회사별 전체 상품 카테고리별 정렬 기능(랭킹 페이지 하위 20개 데이터)",
            notes = "✅ 입력받은 카테고리에 해당하는 회사별 모든 상품들을 조회합니다.\n " +
                    "    company에 공백 입력 시 전체 상품 카테고리별 조회\n" +
                    "methodId (1 : 좋아요순 / 2: 리뷰순 / 3. 조회순 / 그 외: 최신순)\n - \n " )
    @GetMapping("/allByCompany/{category-id}/{method-id}")
    public ResponseEntity getSortedProductsByCompanyAndCategory(@PathVariable("category-id") @Positive int categoryId,
                                                          @PathVariable("method-id") @Positive int methodId,
                                                          @RequestParam String company,
                                                          @Positive @RequestParam int page,
                                                          HttpServletRequest request) {
        // 랭킹 페이지 아래 20개 데이터 정렬 요청

        size = 20;
        Category category = categoryService.findVerifiedCategoryId(categoryId);
        Page<Product> pageProducts;
        List<Product> productList;

        // 전체 상품 랭킹 페이지 20개 데이터 정렬
        if((company.equals("CU"))|| (company.equals("GS25")) || (company.equals("7-ELEVEN"))){
            pageProducts = productService.SortProductsByCompanyAndCategoryAndMethod(page-1,size,methodId,company,category);
            productList = pageProducts.getContent();
        }

        // 회사별 상품 랭킹 페이지 20개 데이터 정렬
        else{
            pageProducts = productService.SortProductsByCompanyAndCategoryAndMethod(page-1,size,methodId,company,category);
            productList = pageProducts.getContent();
        }

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        if(loginStatus){
            checkHeartFlagsNotLongin(productList);
        }
        else{
            checkHeartFlagsLogin(memberService.getLoginMember(),productList);
        }

        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }


    @ApiOperation(value = "추천 상품 조회",
            notes = "✅ 추천 상품 목록을 조회합니다.\n - \n " )
    @GetMapping("/recommend")
    public ResponseEntity getRecommendedProduct(HttpServletRequest request) {
        // 추천 상품 세팅

        int status = 0;
        List<Product> recommends = new ArrayList<>();
        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환

        if (loginStatus) {   //비회원일 때
            status = 1;
            List<Category> allCategories = categoryService.findAllCategoryAsList();
            //연결된 상품이 최소 1개라도 있는 카테고리들로 리스트 만들기
            List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);
            recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne);
            checkHeartFlagsNotLongin(recommends);

        }
        else {
            Member member = memberService.getLoginMember();
            Category memberCategory = member.getCategory();
            if((memberCategory == null) || (memberCategory.getProducts().size()<10)){
                status = 1;
                List<Category> allCategories = categoryService.findAllCategoryAsList();
                //연결된 상품이 최소 1개라도 있는 카테고리들로 리스트 만들기
                List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);
                recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne);
            }
            else {
                status = 2;
                recommends = productService.setRecommendedProducts(memberCategory);
            }
            checkHeartFlagsLogin(member,recommends);
        }
        return new ResponseEntity<>(recommends, HttpStatus.OK);
    }


    @ApiOperation(value = "좋아요 등록 / 취소",
            notes = "✅ 입력 받은 productId에 해당하는 상품에 좋아요를 등록합니다..\n  - \n " )
    @PostMapping("/heart")
    public ResponseEntity getProductsByCompanyAndCategory(HttpServletRequest request,@RequestParam long productId) {

        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환
        boolean result = false;

        if(loginStatus){
            return new ResponseEntity<>("로그인이 필요한 서비스입니다.", HttpStatus.BAD_REQUEST);
        }
        else { // 로그인한 상태일 때
            Member member = memberService.getLoginMember();
            Product product = productService.findVerifiedProductId(productId);

            ProductHeart productHeart = new ProductHeart();


            //이미 좋아요를 누른 상품인지 아닌지 검사( 이미 좋아요가 있다면 false, 없다면 true )
            boolean alreadyHeart = productHeartService.checkAlreadyHeart(member,product);
            /*alreadyHeart = productHeartService.checkAlreadyHeart(member,product);*/

            if(alreadyHeart){ //해당 회원이 좋아요를 눌렀던 상품이 아닐 때

                productHeart = productHeartService.addHeart(member,product,alreadyHeart);

                //상품의 좋아요 수 1 증가
                Product updatedProduct = product;
                updatedProduct.getProductHearts().add(productHeart);
                updatedProduct.addHearts();
                productService.updateProduct(product, updatedProduct);

                // 회원의 찜꽁바구니에 상품 추가
                Member updatedMember = member;
                updatedMember.getProductHearts().add(productHeart);
                memberService.updateMember(member,updatedMember);

                result = true;
            }
            else {  // 해당 회원이 이미 좋아요를 누른 상품일 때 -> 좋아요 취소
                ProductHeart findProductHeart = productHeartService.findProductHeart(member,product);
                productHeartService.cancelHeart(findProductHeart);

                //상품의 좋아요 수 1 감소
                Product updatedProduct = product;
                updatedProduct.withdrawHearts();
                productService.updateProduct(product,updatedProduct);
                result = false;
            }

        }

        return result?
                new ResponseEntity<>("좋아요가 등록되었습니다",HttpStatus.OK)
                : new ResponseEntity<>("좋아요가 취소되었습니다",HttpStatus.OK);

    }

    public void checkHeartFlag( Member member, Product product){
        if(productHeartService.checkAlreadyHeart(member,product)){
            //이미 눌렀으면 false, 누르지 않았다면 true
            product.setHeartFlag(false);
        }
        else{
            product.setHeartFlag(true);
        }
    }

    public void checkHeartFlagsNotLongin(List<Product> products){
        for(Product product : products){
            product.setHeartFlag(false); // 좋아요 상태 OFF
        }
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
}
