package com.example.Api.product;

import com.example.Api.member.Member;
import com.example.Api.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                new RuntimeException("연결된 좋아요 테이블이 없습니다"));

    }
    public void cancelHeart(ProductHeart productHeart){
        productHeartRepository.delete(productHeart);

    }

    //Member가 이미 좋아요 누른 상품인지 체크( 이미 눌렀으면 false, 누르지 않았다면 true)
    public boolean checkAlreadyHeart(Member member, Product product){
        return productHeartRepository.findByMemberAndProduct(member,product).isEmpty();
    }
}
