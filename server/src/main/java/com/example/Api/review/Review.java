package com.example.Api.review;

import com.example.Api.audit.Auditable;
import com.example.Api.member.Member;
import com.example.Api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString(exclude = "reviewHearts")
// comment 추가되면 @ToString(exclude = {"reviewHearts","comments"})
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column
    private long hearts;

    @Column
    private String content;

    @Column
    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany
    @JsonIgnore
    private List<ReviewHeart> reviewHearts = new ArrayList<>();

    @Transient
    private boolean reviewHeartFlag;

    public long addHearts(){
        hearts+=1;
        return hearts;
    }
    public long withdrawHearts(){
        hearts-=1;
        return hearts;
    }
}
