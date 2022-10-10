package com.example.Api.application.entity.member;

import com.example.Api.application.entity.audit.Auditable;
import com.example.Api.application.entity.category.Category;
import com.example.Api.application.entity.product.ProductHeart;
import com.example.Api.application.entity.review.Review;
import com.example.Api.application.entity.review.ReviewHeart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"reviewList","productHearts","reviewHearts"})
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Email
    @NotNull
    @Column(unique = true, length = 20)
    private String username;

    @NotNull
    @Column(length = 100)
    private String password;

    @NotNull
    @Column(unique = true, length = 10)
    private String nickName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id",nullable = true)
    private Category category;

    @Column(nullable = true)
    private String profile;

    @NotNull
    @Column
    private String roles; // User, MANAGER, ADMIN


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL) //REMOVE  PERSIST ALL
    @JsonIgnore
    private List<Review> reviewList= new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductHeart> productHearts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ReviewHeart> reviewHearts = new ArrayList<>();


    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

}