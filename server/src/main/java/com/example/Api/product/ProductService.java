package com.example.Api.product;

import com.example.Api.category.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public List<Product> findAllProduct(Sort createdAt){
        return productRepository.findAll();
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
        List<Product> productList = productRepository.findAllByCompany(company,Sort.by(Sort.Direction.DESC, "hearts"));
        List<Product> top5 = new ArrayList<>();
        for(int i = 0 ; i< 5; i++){
            Product product = productList.get(i);
            top5.add(product);
        }
        return top5;
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
}
