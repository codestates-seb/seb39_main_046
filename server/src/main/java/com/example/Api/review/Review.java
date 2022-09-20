package com.example.Api.review;

import com.example.Api.audit.Auditable;
import com.example.Api.member.Member;
import com.example.Api.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Review extends Auditable {
    /*
    연관 관계
    product(1) : review ( N )
    member (1)  : review ( N )
    member (1)  : reviewHeart (N) : review (1)
    review(1) : comment (N)

     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column
    private long hearts;

    @Column
    private String content;

    /*@Column
    private List<String> images = new ArrayList<>();*/

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
