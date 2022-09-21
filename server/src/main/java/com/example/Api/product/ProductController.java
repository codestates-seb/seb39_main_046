package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.member.Member;
import com.example.Api.member.MemberService;
import com.example.Api.member.MyPageResponseDto;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    private int size = 0;

    public ProductController(ProductMapper productMapper, ProductService productService,
                             CategoryService categoryService, MemberService memberService,
                             ReviewService reviewService){
        this.productMapper = productMapper;
        this.productService = productService;
        this.categoryService = categoryService;
        this.memberService = memberService;
        this.reviewService = reviewService;

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
            /*return productList;*/
            /*return dataList;*/
            products = productList;
            return new ResponseEntity<>(products, HttpStatus.CREATED);
        }

    }

    @ApiOperation(value = "상품명 검색(productName)",
            notes = "✅ 상품을 검색합니다.\n - \n " )
    @GetMapping
    public ResponseEntity getProductByProductName(@Parameter(name = "productName") @RequestParam String productName){

        Product product = productService.findVerifiedProductName(productName);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }


    @ApiOperation(value = "상품 정보 수정",
            notes = "✅ 상품 정보를 수정합니다.\n - \n " )
    @PatchMapping("/admin")
    public ResponseEntity patchProduct(
                                @RequestParam long productId,
                                @Valid @RequestBody ProductPatchDto productPatchDto){

        Product product = productService.findVerifiedProductId(productId);
        Category category = categoryService.findCategoryByCategoryName(productPatchDto.getCategoryName());

        productService.updateProduct(product, productPatchDto, category);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @ApiOperation(value = "상품 삭제",
            notes = "✅ 입력받은 productId에 해당하는 상품을 삭제합니다.\n - \n " )
    @DeleteMapping("/admin")
    public ResponseEntity deleteProduct(@RequestParam long productId){

        productService.deleteProduct(productId);
        return new ResponseEntity<>( "삭제 완료 ( ID:"+ productId + " )", HttpStatus.OK);

    }

    /*
    # POST("/{member-id}") , Request Parmeters : long productId
    : 일반 사용자가 상품 좋아요 등록 / 취소

    - 현재 회원이 해당 상품에 좋아요를 누르지 않았다면 -> 새로운 productHeart 등록, product 테이블의 hearts +1
    - 현재 회원이 해당 상품에 이미 좋아요를 눌렀다면 -> 해당하는 productHeartId의 값 DB에서 삭제, product 테이블의 hearts -1
    */

    @ApiOperation(value = "상품 조회 (상세 페이지 )",
            notes = "✅ 상품의 상세 페이지로 이동합니다. (조회수 1 증가)\",.\n - \n " )
    @GetMapping("/{product-id}")
    public ResponseEntity getProductByProductName(@PathVariable("product-id") @Positive long productId){
        //해당 상품  + 리뷰
        Product product = productService.findVerifiedProductId(productId);
        long calculatedViews = product.addViews();
        Product addedViews = productService.updateViews(product,calculatedViews);

        int page = 1;
        size = 10;
        int methodId = 4;
        Page<Review> pageReviews = reviewService.findAllByProductAndMethod(page-1,size,addedViews,methodId);
        List<Review> reviewList = pageReviews.getContent();


        /*return new ResponseEntity<>(addedViews, HttpStatus.OK);*/
        return new ResponseEntity<>(
                new ProductDetailResponseDto<>(addedViews,new MultiResponseDto<>(reviewList,pageReviews)),
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
            products.get(i).setHearts(randomHearts);
            products.get(i).setReviews(randomReviews);
            products.get(i).setViews(randomViews);
            productService.setRandomValues(products.get(i));
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // 편의점별 top 5, 메인 페이지에서 회사 버튼 클릭할 때마다 회사별 top5 출력 // 공백 입력 시 전체 top5 출력
    @ApiOperation(value = " TOP5 상품 조회",
            notes = "✅ TOP 5 상품의 정보를 조회합니다.\n - \n " )
    @GetMapping("/top5")
    public ResponseEntity getTop5Products(@RequestParam String company){
        List<Product> top5 = new ArrayList<>();
        if(company.equals(" ")){  // 전체 상품 중 TOP5 뽑기
            List<Product> products = productService.findAllProduct(Sort.by(Sort.Direction.DESC, "hearts"));
            //최소 리뷰수 (10) 이하인 상품들은 제거
            long minReivews = 10;

            for(int i =0 ;i<products.size();i++){
                if(products.get(i).getReviews()<minReivews){
                    products.remove(i);
                }
            }
            int maxCount = 0;
            if(products.size()>=5){
                maxCount = 5;
            }
            else{
                maxCount = products.size();
            }
            for(int i = 0 ; i<maxCount; i++){
                Product product = products.get(i);
                top5.add(product);
            }
        }
        else{  // 회사별 TOP5 뽑기
            top5 = productService.findProductsByCompany(company);
        }
        return new ResponseEntity<>(top5, HttpStatus.OK);
    }

    /*@ApiOperation(value = "전체 상품 조회",
            notes = "✅ 모든 상품을 조회합니다.\n - \n " )
    @GetMapping("/all/{method-id}")
    public ResponseEntity getProductByProductName(@PathVariable("method-id") @Positive int methodId,
                                                  @Positive @RequestParam int page) {
        // 메인 페이지에서 전체 top5 전체 보기 눌렀을 때 나오는 초기 랭킹 페이지

        // 전체 top 5 + 페이징 처리되어있는 20개의 데이터 (@GetMapping("/all/{category-id}/{method-id}")로 정렬 가능)
        size = 20;

        Page<Product> pageProducts = productService.findAllProductByMethod(page-1,size,methodId);
        List<Product> productList = pageProducts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }*/

    /*    @ApiOperation(value = "전체 상품 카테고리별 조회",
            notes = "✅ 입력받은 카테고리에 해당하는 전체 상품들을 조회합니다.\n - \n " )
    @GetMapping("/all/{category-id}/{method-id}")
    public ResponseEntity getProductsByCategory(@PathVariable("category-id") @Positive int categoryId,
                                                @PathVariable("method-id") @Positive int methodId,
                                                @Positive @RequestParam int page) {
        // 랭킹 페이지 아래 20개 데이터 정렬 요청
        size = 20;
        Category category = categoryService.findVerifiedCategoryId(categoryId);
        Page<Product> pageProducts = productService.findAllByCategoryAndMethod(page-1,size,category,methodId);
        List<Product> productList = pageProducts.getContent();


        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }*/

    @ApiOperation(value = "회사별 전체 상품 조회",
            notes = "✅ 회사별 모든 상품을 조회합니다.\n " +
                    "company에 공백 입력 시 전체 상품 조회\n - \n " )
    @GetMapping("/allByCompany/{method-id}")
    public ResponseEntity getProductsByCompany(@PathVariable("method-id") @Positive int methodId,
                                               @RequestParam String company,
                                               @Positive @RequestParam int page) {
        // 메인 페이지에서 top5 전체 보기 눌렀을 때 나오는 초기 랭킹 페이지

        // top 5 + 페이징 처리되어있는 20개의 데이터 (@GetMapping("/all/{category-id}/{method-id}")로 정렬 가능)

        size = 20;
        List<Product> top5 = new ArrayList<>();
        Page<Product> pageProducts;
        List<Product> productList;

        if(company.equals(" ")){  // 전체 랭킹 페이지  --> productService에 구현

            // 전체 top5 세팅
            List<Product> products = productService.findAllProduct(Sort.by(Sort.Direction.DESC, "hearts"));
            //최소 리뷰수 (10) 이하인 상품들은 제거
            long minReivews = 10;

            for(int i =0 ;i<products.size();i++){
                if(products.get(i).getReviews()<minReivews){
                    products.remove(i);
                }
            }
            int maxCount = 0;
            if(products.size()>=5){
                maxCount = 5;
            }
            else{
                maxCount = products.size();
            }
            for(int i = 0 ; i<maxCount; i++){
                Product product = products.get(i);
                top5.add(product);
            }
            // 페이징 처리된 20개의 데이터
            pageProducts = productService.findAllProductByMethod(page-1,size,methodId);
            productList = pageProducts.getContent();
        }

        // 회사별 랭킹 페이지
        else {
            top5 = productService.findProductsByCompany(company);
            pageProducts = productService.findAllByCompanyAndMethod(page-1,size,company,methodId);
            productList = pageProducts.getContent();
        }

        return new ResponseEntity<>(
                new ProductRankingResponseDto<>(top5,new MultiResponseDto<>(productList, pageProducts)),
                HttpStatus.OK);
    }

    @ApiOperation(value = "회사별 전체 상품 카테고리별 조회",
            notes = "✅ 입력받은 카테고리에 해당하는 회사별 모든 상품들을 조회합니다.\n " +
                    "    company에 공백 입력 시 전체 상품 카테고리별 조회\n - \n " )
    @GetMapping("/allByCompany/{category-id}/{method-id}")
    public ResponseEntity getProductsByCompanyAndCategory(@PathVariable("category-id") @Positive int categoryId,
                                                          @PathVariable("method-id") @Positive int methodId,
                                                          @RequestParam String company,
                                                          @Positive @RequestParam int page) {
        // 랭킹 페이지 아래 20개 데이터 정렬 요청

        size = 20;
        Category category = categoryService.findVerifiedCategoryId(categoryId);
        Page<Product> pageProducts;
        List<Product> productList;

        // 전체 상품 랭킹 페이지 20개 데이터 정렬
        if(company.equals(" ")){
            pageProducts = productService.findAllByCategoryAndMethod(page-1,size,category,methodId);
            productList = pageProducts.getContent();
        }

        // 회사별 상품 랭킹 페이지 20개 데이터 정렬
        else{
            pageProducts = productService.findAllByCompanyAndCategoryAndMethod(page-1,size,company, category,methodId);
            productList = pageProducts.getContent();
        }


        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }



    @ApiOperation(value = "추천 상품 조회",
            notes = "✅ 추천 상품 목록을 조회합니다.\n - \n " )
    @GetMapping("/recommend")
    public ResponseEntity getProductsByCompany() {
        int status = 0;

        Member member = memberService.getLoginMember();
        Category memberCategory = member.getCategory();
        List<Product> recommends = new ArrayList<>();
        if((member == null) || (memberCategory == null) || (memberCategory.getProducts().size()<10)){
            status = 1;
            List<Category> allCategories = categoryService.findAllCategoryAsList();

            //연결된 상품이 최소 1개라도 있는 카테고리들
            List<Category> atLeastOne = new ArrayList<>();
            for(Category category: allCategories){
                if(category.getProducts().isEmpty()){
                    continue;
                }
                atLeastOne.add(category);
            }

            recommends = productService.setRecommendProductsAtLeastOne(atLeastOne);
        }
        else{
            status = 2;
            recommends = productService.setRecommendProducts(memberCategory);
        }



        return new ResponseEntity<>(recommends, HttpStatus.OK);
    }

}
