package com.example.Api.product;

import com.example.Api.audit.Auditable;
import com.example.Api.category.Category;
import com.example.Api.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
/*@AllArgsConstructor*/
@NoArgsConstructor
@Entity
public class Product extends Auditable {

    /*
    연관 관계
    member (1)  : productHeart ( N ) : product(1)  //상품 좋아요 기능
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    @Column
    private String imageURL; // 이미지 URL
    @Column
    private String productName;
    @Column
    private BigDecimal price;

    @Column
    private  String company;
    @Column
    private long views = 0;
    @Column
    private long hearts = 0;
    @Column
    private long reviews = 0;

    //( member (1) ) : category (1) : product (N) // 상품 추천 기능


    //product(1) : review (N) // 상품에 대한 리뷰 작성 기능
    //private List<Review> reviewList = new ArrayList<>();*/

    //member (1)  : productHeart ( N ) : product(1)  //상품 좋아요 기능
    // 회원 기준으로 좋아요한 상품 출력만 구현할 예정
    // 상품 기준으로 좋아요한 회원 출력 기능은 미구현

    @ManyToOne
    @JoinColumn(name = "category_id")
    //@JsonIgnore // 무한 반복 피하기 위해 @JsonIgnore 어노테이션을 추가하여 직렬화에서 제외시키는 방법
    private Category category;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviewList = new ArrayList<>();
    public long addViews(){
        views+=1;
        return views;
    }

    /*private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;*/

}