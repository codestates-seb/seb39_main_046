package com.example.Api.product;

import com.example.Api.audit.Auditable;
import com.example.Api.category.Category;
import com.example.Api.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
/*@AllArgsConstructor*/
@NoArgsConstructor
@Entity
@ToString(exclude = {"reviewList","productHearts"})
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

    @Transient
    private boolean heartFlag;

    @ManyToOne
    @JoinColumn(name = "category_id")
    //@JsonIgnore // 무한 반복 피하기 위해 @JsonIgnore 어노테이션을 추가하여 직렬화에서 제외시키는 방법
    private Category category;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductHeart> productHearts = new ArrayList<>();

    public long addViews(){
        views+=1;
        return views;
    }
    public long addReviews(){
        reviews+=1;
        return reviews;
    }
    public long withdrawReviews(){
        reviews-=1;
        return reviews;
    }

    public long addHearts(){
        hearts+=1;
        return hearts;
    }
    public long withdrawHearts(){
        hearts-=1;
        return hearts;
    }


    /*private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;*/

}
