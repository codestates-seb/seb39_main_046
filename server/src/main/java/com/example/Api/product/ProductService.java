package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.specification.ProductSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product){

        return productRepository.save(product);
    }


    public boolean checkDuplicatedProduct(String productName){
        boolean result = false;
        Optional<Product> optionalProduct = productRepository.findByProductName(productName);
        if(optionalProduct.isPresent()){
            result = true;
        }
        return result;
    }

    public Product updateProduct(Product product, ProductPatchDto productPatchDto, Category category){

        Optional.ofNullable(productPatchDto.getImageURL())
                .ifPresent(ImageURL -> product.setImageURL(ImageURL));
        Optional.ofNullable(productPatchDto.getProductName())
                .ifPresent(ProductName -> product.setProductName(ProductName));
        Optional.ofNullable(productPatchDto.getPrice())
                .ifPresent(Price -> product.setPrice(Price));
        Optional.ofNullable(category)
                .ifPresent(Category -> product.setCategory(Category));

        return productRepository.save(product);

    }

    public Product updateViews(Product product, long calculatedViews){

        Optional.ofNullable(product.getViews())
                .ifPresent(views -> product.setViews(calculatedViews));
        return productRepository.save(product);
    }

    public Product updateReviews(Product product, long calculatedViews){

        Optional.ofNullable(product.getReviews())
                .ifPresent(reviews -> product.setReviews(calculatedViews));
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

    public Page<Product> findAllProductByMethod(int page, int size, int methodId){

         /* switch (methodId) {

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
        }*/

        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return productRepository.findAll(PageRequest.of(page, size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return productRepository.findAll(PageRequest.of(page, size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return productRepository.findAll(PageRequest.of(page, size,
                    Sort.by("views").descending()));
        }

        return productRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

    public List<Product> findAllProduct(Sort hearts){
        return productRepository.findAll(hearts);
    }

    public void setRandomValues(Product product){
        Product findProduct = findVerifiedProductId(product.getProductId());

        Optional.ofNullable(product.getHearts())
                .ifPresent(hearts -> findProduct.setHearts(hearts));
        Optional.ofNullable(product.getReviews())
                .ifPresent(reviews -> findProduct.setReviews(reviews));
        Optional.ofNullable(product.getViews())
                .ifPresent(views -> findProduct.setViews(views));

        productRepository.save(findProduct);
    }

    public List<Product> findProductsByCompany(String company){
        List<Product> productList = productRepository.findAllByCompany(company, Sort.by(Sort.Direction.DESC, "hearts"));
        // 최소조회수 필터링 필요

        List<Product> top5 = new ArrayList<>();

        //최소 리뷰수 (10) 이하인 상품들은 제거
        long minReivews = 10;

        for(int i =0 ;i<productList.size();i++){
            if(productList.get(i).getReviews()<minReivews){
                productList.remove(i);
            }
        }
        int maxCount = 0;
        if(productList.size()>=5){
            maxCount = 5;
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

    public Page<Product> findAllByCategoryAndMethod(int page, int size, Category category, int methodId){

        Specification<Product> spec = Specification.where(ProductSpecification.equalCategory(category));


        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("views").descending()));
        }

        return productRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

    public Page<Product> findAllByCompanyAndMethod(int page, int size,  String company, int methodId){

        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return productRepository.findAllByCompany(company, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return productRepository.findAllByCompany(company, PageRequest.of(page,size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return productRepository.findAllByCompany(company, PageRequest.of(page,size,
                    Sort.by("views").descending()));
        }

        return productRepository.findAllByCompany(company, PageRequest.of(page,size,
                Sort.by("createdAt").descending()));
    }

    public Page<Product> findAllByCompanyAndCategoryAndMethod(int page, int size, String company, Category category, int methodId){

        Specification<Product> spec = Specification.where(ProductSpecification.equalCompanyAndCategory(company,category));


        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return productRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("views").descending()));
        }

        return productRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

  /*  public Page<Product> findProducts(int page, int size) {

        Page<Product> ProductsPage = new Page<Product>() {
        }
        return productRepository.findAll(PageRequest.of(page, size,
                Sort.by("tagId").descending()));
    }
*/
    public void deleteProduct(long productId){
        Product findProduct = findVerifiedProductId(productId);
        productRepository.delete(findProduct);
    }

    public List<Product> setRecommendProductsAtLeastOne(List<Category> categories){
        List<Product> recommends = new ArrayList<Product>(categories.size());
        int returnSize = 10;
        int remainSize = returnSize - categories.size();  //3
        // 연결된 상품이 하나라도 있는 카테고리들의 랜덤 상품 출력 후에도 size가 남는다면
        // 남는 size만큼 반복문 돌리기 ( 랜덤 상품 출력한 카테고리들에서 랜덤 카테고리를 선택하고 그에 해당하는 랜덤 상품 출력)

        // 1. 비로그인 회원 ( Member = null  ) || 로그인은 했으나 선택된 카테고리가 없는 회원(Category == null)
        //                                   || 로그인, PBTI는 했으나 선택된 카테고리에 연결된 상품이 10개 미만인 회원
        //  -> 연결된 상품이 최소 1개라도 있는 카테고리들 각각에 해당하는 랜덤 상품 세팅

        for(Category category1 : categories){  //7 ( 0  ~ 6 )
                Specification<Product> spec = Specification.where(ProductSpecification.equalCategory(category1));

                List<Product> products = productRepository.findAll(spec);
                System.out.println(products);
                if(products.isEmpty()){
                    throw new RuntimeException("products null");
                }
                int randomRange = products.size();
                int randomIndex = (int)(Math.random()*randomRange);
                recommends.add(products.get(randomIndex)); // !
        }
        if(remainSize>0){
                for(int i = returnSize-remainSize ; i<returnSize;i++){
                    int randomCategoryRange = categories.size();
                    int randomCategoryIndex = (int)(Math.random()*randomCategoryRange);
                    Category randomCategory = categories.get(randomCategoryIndex);
                    Specification<Product> spec = Specification.where(ProductSpecification.equalCategory(randomCategory));
                    List<Product> products = productRepository.findAll(spec);
                    int randomRange = products.size();
                    int randomIndex = (int)(Math.random()*randomRange);
                    recommends.add(products.get(randomIndex));
                }
        }
        return recommends;
    }
    public List<Product> setRecommendProducts(Category category){

        // 2. 로그인 완료, 선택된 카테고리가 있는 회원 && 선택된 카테고리에 연결된 상품이 10개 이상
        // -> 선택된 카테고리에 해당하는 랜덤 상품 10가지
        int returnSize = 10;
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


}
