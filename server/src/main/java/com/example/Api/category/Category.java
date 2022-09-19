package com.example.Api.category;


import com.example.Api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    private String categoryName;


    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL) //REMOVE  PERSIST ALL
    @JsonIgnore
    private List<Product> products = new ArrayList<>();
}
