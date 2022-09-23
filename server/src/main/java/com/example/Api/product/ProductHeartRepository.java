package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductHeartRepository extends JpaRepository<ProductHeart, Long> {
    Optional<ProductHeart> findByMemberAndProduct(Member member, Product product);
    //member와 product를 인자로 받아서 해당 상품에 해당 회원이 좋아요를 등록한 적이 있는지 체크하는 용도
    //findBy -> existsBy 로 변경하면 boolean 리턴 가능

   /* List<ProductHeart> findAllByMember(Member member);*/

    Page<ProductHeart> findAllByMember(Member member, Pageable pageable);
    Page<ProductHeart> findAllByMemberAndProduct_Company(Member member,String company, Pageable pageable);

    Page<ProductHeart> findAllByMemberAndProduct_Category(Member member,Category category, Pageable pageable);
    Page<ProductHeart> findAllByMemberAndProduct_CompanyAndProduct_Category(Member member,String company,Category category, Pageable pageable);


}
