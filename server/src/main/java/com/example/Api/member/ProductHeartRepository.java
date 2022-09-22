package com.example.Api.member;

import com.example.Api.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductHeartRepository extends JpaRepository<ProductHeart, Long> {
    Optional<ProductHeart> findByMemberAndProduct(Member member, Product product);
    //member와 product를 인자로 받아서 해당 상품에 해당 회원이 좋아요를 등록한 적이 있는지 체크하는 용도
    //findBy -> existsBy 로 변경하면 boolean 리턴 가능

}
