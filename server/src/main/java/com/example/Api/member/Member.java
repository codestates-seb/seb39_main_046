package com.example.Api.member;

import com.example.Api.audit.Auditable;
import com.example.Api.category.Category;
import com.example.Api.product.ProductHeart;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewHeart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"reviewList","productHearts","reviewHearts"})
public class Member extends Auditable {
//1
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;
    @Column(unique = true)
    @NotBlank
    //@Email
    private String username;
    @Column(length = 100)
    @NotBlank
    private String password;
    @Column(unique = true)
    @NotBlank
    private String nickName;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = true)
    @JsonIgnore
    private Category category;
    @Column(nullable = true)
    private String profile;


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

    public Member(long id,String username,String nickName,String password){

        this.memberId = id;
        this.username = username;
        this.nickName = nickName;
        this.password = password;
    }

}