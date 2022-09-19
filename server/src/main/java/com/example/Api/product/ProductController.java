package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.category.CategoryMapper;
import com.example.Api.category.CategoryService;
import com.example.Api.review.Review;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/product")
@Validated
public class ProductController {

    // test
    private final ProductMapper productMapper;
    private final ProductService productService;

    private final CategoryService categoryService;

    private final int size = 10;
    private List<Product>  products = new ArrayList<>();
    public ProductController(ProductMapper productMapper, ProductService productService,
                             CategoryService categoryService){
        this.productMapper = productMapper;
        this.productService = productService;
        this.categoryService = categoryService;

    }
    //url/2


    /*
    # POST("/{member-id}")
    : 상품 등록 ( 여러 개 )
      엑셀 등록 , 관리자 페이지에서 관리자만 상품 등록 가능
     */
    @ApiOperation(value = "Excel File 등록(상품 등록)",
            notes = "✅ Excel File을 등록합니다.\n - \n " )
    @PostMapping("admin/{member-id}")
    public ResponseEntity postProducts(@PathVariable("member-id") @Positive long memberId,
                                     @RequestPart("file") MultipartFile file) throws IOException {

        boolean isAdmin = checkAdminId(memberId);
        if(!isAdmin){
            throw new RuntimeException("관리자가 아닙니다.");
        }
        products.clear();
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
            String parsedValue = "";
            long price = 0;
            // 크롤링한 가격은 텍스트 형식으로 되어 있는 숫자, 문자열 가격에 "원"이나 ","가 있으면 모두 제거
            if(priceValue.contains(",") || priceValue.contains("원")){
                parsedValue = priceValue.replaceAll("[,원]","");
                System.out.println(parsedValue);
                price = Long.parseLong(parsedValue);
               /* System.out.println(price);*/
            }
            else{
                price = Long.parseLong(priceValue);
                /*System.out.println(price);*/
            }

            BigDecimal seq = new BigDecimal(price);
            long categoryId = ((long)row.getCell(3).getNumericCellValue());
            data.setCategory(categoryService.findVerifiedCategoryId(categoryId));
            data.setCompany(row.getCell(4).getStringCellValue());
            data.setPrice(seq);
            data.setCreatedAt(LocalDateTime.now());

            //중복 삼품인지 검사 필요
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

            /*return productList;*/
            /*return dataList;*/
            products = productList;
            return new ResponseEntity<>(productList, HttpStatus.CREATED);
        }

    }
/*
# GET("/{member-id}") , Request Parmeters : String productName
: 상품 Id 찾기
  관리자가 수정하거나 삭제할 상품의 ID를 찾기 위해 필요
*/
    @ApiOperation(value = "상품 정보 조회(productName)",
            notes = "✅ 입력받은 상품명에 해당하는 상품의 정보를 조회합니다.\n - \n " )
    @GetMapping("admin/{member-id}")
    public ResponseEntity getProductByProductName(@PathVariable("member-id") @Positive long memberId,
                                @Parameter(name = "productName", description = "햄)치치버거") @RequestParam String productName){
        boolean isAdmin = checkAdminId(memberId);
        if(!isAdmin){
            throw new RuntimeException("관리자가 아닙니다.");
        }
        /*Category category = new Category(11L,"버거");*/
        List<Review> reviewList = new ArrayList<>();
        Product product = productService.findVerifiedProductName(productName);
        /*product.setCategory(category);
        product.setReviewList(reviewList);*/

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

/*
# PATCH("/{member-id}") , Request Parmeters : long productId
: 관리자가 상품 정보 수정
*/
    @ApiOperation(value = "상품 정보 수정",
            notes = "✅ 상품 정보를 수정합니다.\n - \n " )
    @PatchMapping("admin/{member-id}")
    public ResponseEntity patchProduct(@PathVariable("member-id") @Positive long memberId,
                                @RequestParam long productId,
                                @Valid @RequestBody ProductPatchDto productPatchDto){
        boolean isAdmin = checkAdminId(memberId);
        if(!isAdmin){
            throw new RuntimeException("관리자가 아닙니다.");
        }
        /*Category category = new Category(7L,"adf");*/
        List<Review> reviewList = new ArrayList<>();
        Product product = new Product();
        product.setId(productId);
        product.setImageURL(productPatchDto.getImageURL());
        product.setProductName(productPatchDto.getProductName());
        product.setPrice(new BigDecimal(9900));
        product.setCategory(categoryService.findVerifiedCategoryId(productPatchDto.getCategoryId()));
        /*product.setCategory(new Category(productPatchDto.getCategoryId(), "도시락"));*/


        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    /*
    # DELETE("/{member-id}") , Request Parmeters : long productId
    : 관리자가 상품 삭제
    */
    @ApiOperation(value = "상품 삭제",
            notes = "✅ 입력받은 productId에 해당하는 상품을 삭제합니다.\n - \n " )
    @DeleteMapping("admin/{member-id}")
    public ResponseEntity deleteProduct(@PathVariable("member-id") @Positive long memberId,
                                       @RequestParam long productId){

        boolean isAdmin = checkAdminId(memberId);
        if(!isAdmin){
            throw new RuntimeException("관리자가 아닙니다.");
        }
        return new ResponseEntity<>( "삭제 완료 ( ID:"+ productId + " )", HttpStatus.OK);

    }


    /*
    # POST("/{member-id}") , Request Parmeters : long productId
    : 일반 사용자가 상품 좋아요 등록 / 취소

    - 현재 회원이 해당 상품에 좋아요를 누르지 않았다면 -> 새로운 productHeart 등록, product 테이블의 hearts +1
    - 현재 회원이 해당 상품에 이미 좋아요를 눌렀다면 -> 해당하는 productHeartId의 값 DB에서 삭제, product 테이블의 hearts -1

    # GET("/{product-id}")
    : 상품 조회 (상세 페이지 )
     상품에 달린 댓글까지 출력, 조회수 1 증가

*/

    /*
    # GET("/all"), Request Parmeters : int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 전체 상품 좋아요순 정렬 ( sortingMethod= "byHearts")
    - 전체 상품 리뷰순 정렬 ( sortingMethod= "byReviews")
    - 전체 상품 조회순 정렬 ( sortingMethod= "byViews")

    # GET("/all/{category-id}), Request Parmeters :  int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 전체 상품 카테고리별 좋아요순 정렬  ( sortingMethod= "byHearts")
    - 전체 상품 카테고리별 리뷰순 정렬 ( sortingMethod= "byReviews")
    - 전체 상품 카테고리별 조회순 정렬 ( sortingMethod= "byViews")

     */
    @ApiOperation(value = "전체 상품 조회",
            notes = "✅ 입력받은 상품명에 해당하는 상품의 정보를 조회합니다.\n - \n " )
    @GetMapping("/all/{method-id}")
    public ResponseEntity getProductByProductName(@PathVariable("method-id") @Positive int methodId,
                                                  @Positive @RequestParam int page
                                                  /*@RequestParam int methodId*/) {

        for(int i = 0 ; i<products.size();i++){
            long randomHearts = (long)(Math.random()*100);
            long randomReviews = (long)(Math.random()*100);
            long randomViews = (long)(Math.random()*100);
            products.get(i).setHearts(randomHearts);
            products.get(i).setReviews(randomReviews);
            products.get(i).setViews(randomViews);
        }

        switch (methodId) {

            case 1:
                System.out.println("좋아요 순 정렬");
                Collections.sort(products, new ProductHeartsComparator().reversed());
                break;

            case 2:
                System.out.println("리뷰 순 정렬");
                Collections.sort(products, new ProductReviewsComparator().reversed());
                break;

            case 3:
                System.out.println("조회 순 정렬");
                Collections.sort(products, new ProductViewsComparator().reversed());
                break;

            default:
                System.out.println();
                Collections.sort(products, new ProductCreatedAtComparator().reversed());
                break;
        }
        /* 페이징 처리 - JPA Repository 필요
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), users.size());
        Pageable pageable =
        final Page<User> page = new PageImpl<>(users.subList(start, end), pageable, users.size());

        Page<Product> pages = new PageImpl<Product>(products, pageable, products.size());

        Page<Product> pageProducts = PageRequest.of(page,size,Sort.by());// product를 Pageable pageable로 변화*/

        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    /*
    # GET("/allByCompanyType"), Request Parmeters : String company, int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 회사별 전체 상품 좋아요순 정렬  ( sortingMethod= "byHearts")
    - 회사별 전체 상품 카테고리별 좋아요순 정렬 ( sortingMethod= "byReviews")
    - 회사별 전체 상품 리뷰순 정렬 ( sortingMethod= "byViews")

    # GET("/allByCompanyType/{category-id}"), Request Parmeters : String company, int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 회사별 전체 상품 카테고리별 리뷰순 정렬( sortingMethod= "byHearts")
    - 회사별 전체 상품 조회순 정렬 ( sortingMethod= "byReviews")
    - 회사별 전체 상품 카테고리별 조회순 정렬 ( sortingMethod= "byViews")

         */
    private boolean checkAdminId(long memberId){
        long[] adminIdList = {1, 2, 3, 4, 5};
        boolean isAdmin = false;
        for(long i : adminIdList){
            if(memberId == i){
                isAdmin = true;
            }
        }
        return isAdmin;
    }

    static class ProductHeartsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getHearts() > p2.getHearts()) {
                return 1;
            } else if (p1.getHearts() < p2.getHearts()) {
                return -1;
            }
            return 0;
        }
    }
    static class ProductReviewsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getReviews() > p2.getReviews()) {
                return 1;
            } else if (p1.getReviews() < p2.getReviews()) {
                return -1;
            }
            return 0;
        }
    }
    static class ProductViewsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getViews() > p2.getViews()) {
                return 1;
            } else if (p1.getViews() < p2.getViews()) {
                return -1;
            }
            return 0;
        }
    }

    static class ProductCreatedAtComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            return (p1.getCreatedAt()).compareTo(p2.getCreatedAt());
        }
    }

    //feature2 테스트
    //dev테스트
    //dev테스트 2
}
