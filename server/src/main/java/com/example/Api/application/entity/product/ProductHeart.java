package com.example.Api.application.entity.product;

import com.example.Api.application.entity.audit.Auditable;
import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProductHeart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productHeartId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;



    public void addMember(Member member){
        this.member = member;
        if(!this.member.getProductHearts().contains(this)){
            this.member.getProductHearts().add(this);
        }
    }

    public void addProduct(Product product){
        this.product = product;
        if(!this.product.getProductHearts().contains(this)){
            this.product.getProductHearts().add(this);
        }
    }
}
