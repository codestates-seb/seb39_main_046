package com.example.Api.category;


import com.example.Api.member.Member;
import com.example.Api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString(exclude = {"products","members"})
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @NotNull
    @Column(length = 50, unique = true)
    private String categoryName;


    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL) //REMOVE  PERSIST ALL
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL) //REMOVE  PERSIST ALL
    @JsonIgnore
    private List<Member> members = new ArrayList<>();
}
