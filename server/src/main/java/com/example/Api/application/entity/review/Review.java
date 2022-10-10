package com.example.Api.application.entity.review;

import com.example.Api.application.entity.audit.Auditable;
import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.product.Product;
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


    @Column(length = 50)
    private String content;

    @Column(nullable = true)
    private String imageURL;

    @Column
    private long hearts;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "review",cascade = CascadeType.ALL)
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
