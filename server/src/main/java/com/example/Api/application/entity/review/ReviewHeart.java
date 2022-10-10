package com.example.Api.application.entity.review;

import com.example.Api.application.entity.audit.Auditable;
import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReviewHeart extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewHeartId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne
    @JoinColumn(name = "review_id")
    @JsonIgnore
    private Review review;

    public void addMember(Member member){
        this.member = member;
        if(!this.member.getReviewHearts().contains(this)){
            this.member.getReviewHearts().add(this);
        }
    }

    public void addReview(Review review){
        this.review = review;
        if(!this.review.getReviewHearts().contains(this)){
            this.review.getReviewHearts().add(this);
        }
    }

}
