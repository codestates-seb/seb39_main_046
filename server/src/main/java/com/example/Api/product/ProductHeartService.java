package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.member.Member;
import com.example.Api.member.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ProductHeartService {
    private final ProductHeartRepository productHeartRepository;
    private final ProductRepository productRepository;

    private final MemberRepository memberRepository;

    public ProductHeartService(ProductHeartRepository productHeartRepository,
                               ProductRepository productRepository,MemberRepository memberRepository) {
        this.productHeartRepository = productHeartRepository;
        this.productRepository = productRepository;
        this.memberRepository = memberRepository;
    }

    public ProductHeart addHeart(Member member, Product product, boolean alreadyHeart){

        if(checkAlreadyHeart(member,product)){

            ProductHeart productHeart = new ProductHeart();
            productHeart.addProduct(product);
            productHeart.addMember(member);
            productHeartRepository.save(productHeart);

            return productHeart;
        }

        //이미 좋아요를 누른 상품인 경우
        ProductHeart productHeart = new ProductHeart();
        return productHeart;
    }

    public ProductHeart findProductHeart(Member member, Product product){
        Optional<ProductHeart> optionalProductHeart = productHeartRepository.findByMemberAndProduct(member,product);
        return optionalProductHeart.orElseThrow(()->
                new RuntimeException("연결된 상품 좋아요 테이블이 없습니다"));
    }

    public void cancelHeart(ProductHeart productHeart){
        productHeartRepository.delete(productHeart);

    }

    //Member가 이미 좋아요 누른 상품인지 체크( 이미 눌렀으면 false, 누르지 않았다면 true)
    public boolean checkAlreadyHeart(Member member, Product product){
        return productHeartRepository.findByMemberAndProduct(member,product).isEmpty();
    }

    public List<ProductHeart> findProductHeartsByMember(Member member){
        return productHeartRepository.findAllByMember(member);
    }

    public Page<ProductHeart> SortHeartProducts(int page, int size, int methodId, String company, Member member, Category category){

        Page<ProductHeart> productHeartsPage;
        boolean existCompany = ( (company.equals("CU")) || (company.equals("GS25")) || (company.equals("7-ELEVEN")) );
        boolean existCategory = ( category != null);
        Sort.Order order;
        Sort sort;

        if(methodId == 1){
            System.out.println("좋아요순 정렬");
            order = Sort.Order.desc("product.hearts");
            sort = Sort.by(order);
            if(existCompany){ // Company O
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_CompanyAndProduct_Category(member,company,category, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Company(member,company,PageRequest.of(page,size, sort));
                }
            }
            else{// company X
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Category(member,category,PageRequest.of(page,size, sort));
                }
                else {   // category X
                    productHeartsPage = productHeartRepository.findAllByMember(member,PageRequest.of(page,size, sort));
                }
            }
        }
        else if(methodId == 2){//"productHeart.product.reviews"
            System.out.println("리뷰순 정렬");
            order = Sort.Order.desc("product.reviews");
            sort = Sort.by(order);
            if(existCompany){ // Company O
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_CompanyAndProduct_Category(member,company,category, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Company(member,company,PageRequest.of(page,size, sort));
                }
            }
            else{// company X
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Category(member,category,PageRequest.of(page,size, sort));
                }
                else {   // category X
                    productHeartsPage = productHeartRepository.findAllByMember(member,PageRequest.of(page,size, sort));
                }
            }
        }
        else if(methodId == 3) {
            System.out.println("조회순 정렬");
            order = Sort.Order.desc("product.views");
            sort = Sort.by(order);
            if(existCompany){ // Company O
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_CompanyAndProduct_Category(member,company,category, PageRequest.of(page,size, sort));
                }
                else { // category X
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Company(member,company,PageRequest.of(page,size, sort));
                }
            }
            else{// company X
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Category(member,category,PageRequest.of(page,size, sort));
                }
                else {   // category X
                    productHeartsPage = productHeartRepository.findAllByMember(member,PageRequest.of(page,size, sort));
                }
            }
        }
        else {
            System.out.println("최신 좋아요순 정렬");  //<- 최근에 좋아요 등록한 순서
            /*  이건 최신 상품순
            order = Sort.Order.desc("product.createdAt");
            sort = Sort.by(order);
             */
            if(existCompany){ // Company O
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_CompanyAndProduct_Category(member,company,category, PageRequest.of(page,size,
                            Sort.by("createdAt").descending()));
                }
                else { // category X
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Company(member,company,PageRequest.of(page,size,
                            Sort.by("createdAt").descending()));
                }
            }
            else{// company X
                if (existCategory) {  //category O
                    productHeartsPage = productHeartRepository.findAllByMemberAndProduct_Category(member,category,PageRequest.of(page, size,
                            Sort.by("createdAt").descending()));
                }
                else {   // category X
                    productHeartsPage = productHeartRepository.findAllByMember(member,PageRequest.of(page, size,
                            Sort.by("createdAt").descending()));
                }
            }
        }
        return productHeartsPage;
    }

}
