package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.review.Review;
import com.example.Api.specification.ProductSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductHeartRepository productHeartRepository;

    public ProductService(ProductRepository productRepository,
                          ProductHeartRepository productHeartRepository) {
        this.productRepository = productRepository;
        this.productHeartRepository = productHeartRepository;
    }

    public Product createProduct(Product product){

        return productRepository.save(product);
    }


    public boolean checkDuplicatedProduct(String productName){  // 상품 중복 검사
        boolean result = false;
        Optional<Product> optionalProduct = productRepository.findByProductName(productName);
        if(optionalProduct.isPresent()){
            result = true;
        }
        return result;
    }

    // 상품 정보 업데이트
    public Product updateProduct(Product product, Product patchProduct){
        //product : 원본 상품 , patchProduct : 수정된 상품 정보, productId는 동일

        Optional.ofNullable(patchProduct.getImageURL())
                .ifPresent(imageURL -> product.setImageURL(imageURL));
        Optional.ofNullable(patchProduct.getProductName())
                .ifPresent(productName -> product.setProductName(productName));
        Optional.ofNullable(patchProduct.getPrice())
                .ifPresent(price -> product.setPrice(price));
        Optional.ofNullable(patchProduct.getCompany())
                .ifPresent(company -> product.setCompany(company));
        Optional.ofNullable(patchProduct.getCategory())
                .ifPresent(Category -> product.setCategory(Category));
        Optional.ofNullable(patchProduct.getViews())
                .ifPresent(views -> product.setViews(views));
        Optional.ofNullable(patchProduct.getHearts())
                .ifPresent(hearts -> product.setHearts(hearts));
        Optional.ofNullable(patchProduct.getReviews())
                .ifPresent(reviews -> product.setReviews(reviews));
        Optional.ofNullable(patchProduct.getReviewList())
                .ifPresent(reviewList->product.setReviewList(reviewList));
        Optional.ofNullable(patchProduct.getProductHearts())
                .ifPresent(productHearts -> product.setProductHearts(productHearts));


        return productRepository.save(product);

    }

    public Product findVerifiedProductName(String productName) {
        Optional<Product> optionalProduct = productRepository.findByProductName(productName);
        Product findProduct =
                optionalProduct.orElseThrow(() ->
                        new RuntimeException("Product not found"));
        return findProduct;
    }
    public Product findVerifiedProductId(long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product findProduct =
                optionalProduct.orElseThrow(() ->
                        new RuntimeException("Product not found"));
        return findProduct;
    }




    public List<Product> findAllProduct(Sort sort){  // 좋아요수/리뷰수/조회수 랜덤 세팅에 사용
        return productRepository.findAll(sort);
    }

    //top5 세팅
    public List<Product> getTop5Products(String company){

        boolean existCompany = ( (company.equals("CU")) || (company.equals("GS25")) || (company.equals("7-ELEVEN")) );
        // top5 세팅, 최소조회수 필터링 필요
        List<Product> productList = new ArrayList<>();
        List<Product> top5 = new ArrayList<>();

        if(existCompany){
            productList = productRepository.findAllByCompany(company, Sort.by(Sort.Direction.DESC, "hearts"));
        }
        else{
            productList = productRepository.findAll(Sort.by(Sort.Direction.DESC, "hearts"));
        }


        for (Iterator<Product> iterator = productList.iterator(); iterator.hasNext(); ) {
            long minReviews = 10;
            long reviews = iterator.next().getReviews();
            if (minReviews > (reviews)) {
                iterator.remove();
            }
        }

        int maxCount = 0;
        if(productList.size()>=5){
            maxCount = 5;
        }
        else if(productList.size() == 0){
            return null;
        }
        else{
            maxCount = productList.size();
        }
        for(int i = 0 ; i<maxCount; i++){
            Product product = productList.get(i);
            top5.add(product);
        }
        return top5;
    }


    // 랭킹 페이지 하위 20개 데이터 정렬해서 반환 (회사명 + 카테고리 + (좋아요순 or 리뷰순 or 조회순)
    public Page<Product> SortProducts(int page, int size, int methodId, String company, Category category){

        Page<Product> productsPage;
        Specification<Product> spec;
        boolean existCategory = ( category != null);
        Sort.Order order;
        Sort sort;
        boolean existCompany = ( (company.equals("CU")) || (company.equals("GS25")) || (company.equals("7-ELEVEN")) );

        if(methodId == 1){
            System.out.println("좋아요순 정렬");
            order = Sort.Order.desc("hearts");
            sort = Sort.by(order);
            if(existCompany){  // Company O

                spec = Specification.where(ProductSpecification.equalCompanyAndCategory(company,category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAllByCompany(company, PageRequest.of(page,size, sort));
                }
            }
            else {  // company X

                spec = Specification.where(ProductSpecification.equalCategory(category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAll(PageRequest.of(page,size, sort));
                }
            }
        }

        else if(methodId == 2){
                System.out.println("리뷰순 정렬");
            order = Sort.Order.desc("reviews");
            sort = Sort.by(order);
            if(existCompany){  // Company O

                spec = Specification.where(ProductSpecification.equalCompanyAndCategory(company,category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAllByCompany(company, PageRequest.of(page,size, sort));
                }
            }
            else {  // company X

                spec = Specification.where(ProductSpecification.equalCategory(category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAll(PageRequest.of(page,size, sort));
                }
            }
        }

        else if(methodId == 3){
                System.out.println("조회순 정렬");
            order = Sort.Order.desc("views");
            sort = Sort.by(order);
            if(existCompany){  // Company O

                spec = Specification.where(ProductSpecification.equalCompanyAndCategory(company,category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAllByCompany(company, PageRequest.of(page,size, sort));
                }
            }
            else {  // company X

                spec = Specification.where(ProductSpecification.equalCategory(category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAll(PageRequest.of(page,size, sort));
                }
            }
        }

        else {
                System.out.println("최신순 정렬");
            order = Sort.Order.desc("createdAt");
            sort = Sort.by(order);
            if(existCompany){  // Company O

                spec = Specification.where(ProductSpecification.equalCompanyAndCategory(company,category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAllByCompany(company, PageRequest.of(page,size, sort));
                }
            }
            else {  // company X

                spec = Specification.where(ProductSpecification.equalCategory(category));
                if (existCategory) { //category O
                    productsPage = productRepository.findAll(spec, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productsPage = productRepository.findAll(PageRequest.of(page,size, sort));
                }
            }
        }

       return productsPage;
    }



    public List<Product> setRecommendedProductsAtLeastOne(List<Category> atLeastOne, String pageName, List<Product> products){
        // PBTI 결과 카테고리에 해당하는 상품이 최소 하나라도 있다
        int returnSize = 12;
        int existSize = products.size();  //3
        if(pageName.equals("PBTI")){
            returnSize = 6;
        }
        List<Product> recommends = new ArrayList<>(returnSize);
        int remainSize = returnSize - existSize;    // 11
        // 연결된 상품이 하나라도 있는 카테고리들의 랜덤 상품 출력 후에도 size가 남는다면
        // 남는 size만큼 반복문 돌리기 ( 랜덤 상품 출력한 카테고리들에서 랜덤 카테고리를 선택하고 그에 해당하는 랜덤 상품 출력)

        // 1. 비로그인 회원 ( Member = null  ) || 로그인은 했으나 선택된 카테고리가 없는 회원(Category == null)
        //                                   || 로그인, PBTI는 했으나 선택된 카테고리에 연결된 상품이 12개(or 6개) 미만인 회원
        // 받아온 카테고리 연결 상품들  +  연결된 상품이 최소 1개라도 있는 카테고리들 중 랜덤 카테고리 - 랜덤 상품 세팅
        for(int i = 0 ; i<existSize;i++){
            recommends.add(products.get(i));  // 0 , 1, 2
        }
        if(remainSize>0){
                for(int i = returnSize-remainSize ; i<returnSize;i++){
                    int randomCategoryRange = atLeastOne.size();
                    int randomCategoryIndex = (int)(Math.random()*randomCategoryRange);
                    Category randomCategory = atLeastOne.get(randomCategoryIndex);
                    Specification<Product> spec = Specification.where(ProductSpecification.equalCategory(randomCategory));
                    List<Product> productList = productRepository.findAll(spec);
                    int randomRange = productList.size();
                    int randomIndex = (int)(Math.random()*randomRange);
                    recommends.add(productList.get(randomIndex));
                }
        }
        return recommends;
    }
    public List<Product> setRecommendedProducts(Category category,String pageName){
        // 메인 페이지인지  PBTI 등록 페이지인지에 따라 리턴 사이즈 결정
        //메인(12) / PBTI (6)
        // 2. 로그인 완료, 선택된 카테고리가 있는 회원 && 선택된 카테고리에 연결된 상품이 10개 이상
        int returnSize = 12;
        if(pageName.equals("PBTI")){
            returnSize = 6;
        }
        List<Product> recommends = new ArrayList<Product>(returnSize);
        for(int i = 0 ;i<returnSize;i++){
                List<Product> products = productRepository.findAllByCategory(category);
                System.out.println(products);
                int randomRange = products.size();
                int randomIndex = (int)(Math.random()*randomRange);
                recommends.add(products.get(randomIndex)); // !
        }
        return recommends;
    }

    public List<Product> setRandomRecommendedProducts(List<Category> categories, String pageName){
        if(categories.size()==0){
            return null;
        }
        List<Product> recommends = new ArrayList<Product>(categories.size());
        int returnSize = 12;
        if(pageName.equals("PBTI")){
            returnSize = 6;
        }
        for(int i = 0 ; i<returnSize;i++){
            int randomCategoryRange = categories.size();
            int randomCategoryIndex = (int)(Math.random()*randomCategoryRange);
            Category randomCategory = categories.get(randomCategoryIndex);
            Specification<Product> spec = Specification.where(ProductSpecification.equalCategory(randomCategory));
            List<Product> products = productRepository.findAll(spec);
            int randomRange = products.size();
            int randomIndex = (int)(Math.random()*randomRange);
            recommends.add(products.get(randomIndex));
        }

        return recommends;
    }


    public List<Product> findProductsByCategory(Category category){
        return productRepository.findAllByCategory(category);
    }

    public void deleteProduct(long productId){
        Product findProduct = findVerifiedProductId(productId);
        productRepository.delete(findProduct);
    }

}
