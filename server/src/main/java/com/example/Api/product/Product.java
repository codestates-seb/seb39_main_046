package com.example.Api.product;

import com.example.Api.audit.Auditable;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private long id;
    @Column
    private String imageURL; // 이미지 URL
    @Column
    private String productName;
    @Column
    private BigDecimal price;
    //( member (1) ) : category (1) : product (N) // 상품 추천 기능
    @Column
    private long categoryId;
    @Column
    private  String company;
    @Column
    private long views = 0;
    @Column
    private long hearts = 0;
    @Column
    private long reviews = 0;

    /*private Category category;

    //product(1) : review (N) // 상품에 대한 리뷰 작성 기능
    private List<Review> reviewList = new ArrayList<>();*/

    //member (1)  : productHeart ( N ) : product(1)  //상품 좋아요 기능
    // 회원 기준으로 좋아요한 상품 출력만 구현할 예정
    // 상품 기준으로 좋아요한 회원 출력 기능은 미구현

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


   /* @Override
    public int compareTo(Product product) {
        if (product.hearts < hearts) {
            return 1;
        } else if (product.hearts > hearts) {
            return -1;
        }
        return 0;
    }*/
}
