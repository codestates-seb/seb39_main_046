package com.example.Api.member;

import com.example.Api.audit.Auditable;
import com.example.Api.category.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Member extends Auditable {
//1
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String nickName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    private String profile;


    private String roles; // User, MANAGER, ADMIN

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public Member(long id,String username,String nickName,String password){

        this.id = id;
        this.username = username;
        this.nickName = nickName;
        this.password = password;
    }
}