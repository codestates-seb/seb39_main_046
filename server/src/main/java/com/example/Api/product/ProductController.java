package com.example.Api.product;

import com.example.Api.SortingMethod;
import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.response.MultiResponseDto;
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
import java.util.ArrayList;
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

    private int size = 0;

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
            return new ResponseEntity<>(products, HttpStatus.CREATED);
        }

    }
/*
# GET("/{member-id}") , Request Parmeters : String productName
: 상품 Id 찾기
  관리자가 수정하거나 삭제할 상품의 ID를 찾기 위해 필요
*/
    @ApiOperation(value = "상품 ID 조회(productName)",
            notes = "✅ 입력받은 상품명에 해당하는 상품의 ID를 조회합니다.\n - \n " )
    @GetMapping("/admin")
    public ResponseEntity getProductByProductName(@Parameter(name = "productName") @RequestParam String productName){

        Product product = productService.findVerifiedProductName(productName);

        return new ResponseEntity<>(product.getProductId(), HttpStatus.OK);
    }

/*
# PATCH("/{member-id}") , Request Parmeters : long productId
: 관리자가 상품 정보 수정
*/
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
    /*
    # DELETE("/{member-id}") , Request Parmeters : long productId
    : 관리자가 상품 삭제
    */
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
    /*
    # GET("/{product-id}")
    : 상품 조회 (상세 페이지 )
     상품에 달린 댓글까지 출력, 조회수 1 증가

*/
    @ApiOperation(value = "상품 조회 (상세 페이지 )",
            notes = "✅ 상품의 상세 페이지로 이동합니다. (조회수 1 증가)\",.\n - \n " )
    @GetMapping("/{product-id}")
    public ResponseEntity getProductByProductName(@PathVariable("product-id") @Positive long productId){
        Product product = productService.findVerifiedProductId(productId);
        long calculatedViews = product.addViews();
        Product addedViews = productService.updateViews(product,calculatedViews);

        return new ResponseEntity<>(addedViews, HttpStatus.OK);
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

    // 편의점별 top 5
    @ApiOperation(value = " TOP5 상품 조회",
            notes = "✅ TOP 5 상품의 정보를 조회합니다.\n - \n " )
    @GetMapping("/top5")
    public ResponseEntity getTop5Products(@RequestParam String company){
        List<Product> top5 = new ArrayList<>();
        if(company.equals(" ")){
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
            /*for(int i = 0 ; i< 5; i++){
                //데이터가 적을 때 인덱스 에러 고려 필요
                if(products.get(i) == null){
                    top5.add(null);
                }
                else{
                    Product product = products.get(i);
                    top5.add(product);
                }

            }*/

//1
        }
        else{
            top5 = productService.findProductsByCompany(company);
        }
        return new ResponseEntity<>(top5, HttpStatus.OK);
    }

    /*
    # GET("/all"), Request Parmeters : int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 전체 상품 좋아요순 정렬 ( sortingMethod= "byHearts")
    - 전체 상품 리뷰순 정렬 ( sortingMethod= "byReviews")
    - 전체 상품 조회순 정렬 ( sortingMethod= "byViews")

    */
    @ApiOperation(value = "전체 상품 조회",
            notes = "✅ 모든 상품을 조회합니다.\n - \n " )
    @GetMapping("/all/{method-id}")
    public ResponseEntity getProductByProductName(@PathVariable("method-id") @Positive int methodId,
                                                  @Positive @RequestParam int page) {
        size = 20;

        Page<Product> pageProducts = productService.findAllProductByMethod(page-1,size,methodId);
        List<Product> productList = pageProducts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }

    /*
    # GET("/all/{category-id}), Request Parmeters :  int page , String sortingMethod
              !) sortingMethod값에 따라 분기

    - 전체 상품 카테고리별 좋아요순 정렬  ( sortingMethod= "byHearts")
    - 전체 상품 카테고리별 리뷰순 정렬 ( sortingMethod= "byReviews")
    - 전체 상품 카테고리별 조회순 정렬 ( sortingMethod= "byViews")

     */
    @ApiOperation(value = "전체 상품 카테고리별 조회",
            notes = "✅ 입력받은 카테고리에 해당하는 전체 상품들을 조회합니다.\n - \n " )
    @GetMapping("/all/{category-id}/{method-id}")
    public ResponseEntity getProductsByCategory(@PathVariable("category-id") @Positive int categoryId,
                                                @PathVariable("method-id") @Positive int methodId,
                                                @Positive @RequestParam int page) {

        size = 20;
        Category category = categoryService.findVerifiedCategoryId(categoryId);
        Page<Product> pageProducts = productService.findAllByCategoryAndMethod(page-1,size,category,methodId);
        List<Product> productList = pageProducts.getContent();


        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }



    /*
    # GET("/allByCompanyType"), Request Parmeters : String company, int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 회사별 전체 상품 좋아요순 정렬  ( sortingMethod= "byHearts")
    - 회사별 전체 상품 카테고리별 좋아요순 정렬 ( sortingMethod= "byReviews")
    - 회사별 전체 상품 리뷰순 정렬 ( sortingMethod= "byViews")
    */

    @ApiOperation(value = "회사별 전체 상품 조회",
            notes = "✅ 회사별 모든 상품을 조회합니다.\n - \n " )
    @GetMapping("/allBycompany/{method-id}")
    public ResponseEntity getProductsByCompany(@PathVariable("method-id") @Positive int methodId,
                                               @RequestParam String company,
                                               @Positive @RequestParam int page) {
        size = 20;
        /*
1. 전체 top5
2. 정렬 / 페이징 처리되어 있는 상품목록(multiResponse)

제네릭 타입 클래스에 1,2 담아서 제네릭 타입 클래스 반환하기
         */

        Page<Product> pageProducts = productService.findAllByCompanyAndMethod(page-1,size,company,methodId);
        List<Product> productList = pageProducts.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }
    /*
    # GET("/allByCompanyType/{category-id}"), Request Parmeters : String company, int page , String sortingMethod
    !) sortingMethod값에 따라 분기

    - 회사별 전체 상품 카테고리별 리뷰순 정렬( sortingMethod= "byHearts")
    - 회사별 전체 상품 카테고리별 조회순 정렬 ( sortingMethod= "byReviews")
    - 회사별 전체 상품 카테고리별 조회순 정렬 ( sortingMethod= "byViews")
    */
    @ApiOperation(value = "회사별 전체 상품 카테고리별 조회",
            notes = "✅ 입력받은 카테고리에 해당하는 회사별 모든 상품들을 조회합니다.\n - \n " )
    @GetMapping("/allBycompany/{category-id}/{method-id}")
    public ResponseEntity getProductsByCompanyAndCategory(@PathVariable("category-id") @Positive int categoryId,
                                                          @PathVariable("method-id") @Positive int methodId,
                                                          @RequestParam String company,
                                                          @Positive @RequestParam int page) {

        /*
1. 회사별 top5
2. 정렬 / 페이징 처리되어 있는 상품목록(multiResponse)

제네릭 타입 클래스에 1,2 담아서 제네릭 타입 클래스 반환하기
         */
        size = 20;

        Category category = categoryService.findVerifiedCategoryId(categoryId);
        Page<Product> pageProducts = productService.findAllByCompanyAndCategoryAndMethod(page-1,size,company, category,methodId);
        List<Product> productList = pageProducts.getContent();


        return new ResponseEntity<>(
                new MultiResponseDto<>(productList, pageProducts),
                HttpStatus.OK);
    }


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


}
