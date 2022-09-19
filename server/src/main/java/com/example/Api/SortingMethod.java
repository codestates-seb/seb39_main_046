package com.example.Api;

import lombok.Getter;

public enum SortingMethod {

    //좋아요순 정렬 ( sortingMethod= "byHearts")
    BY_HEARTS(1),
    //리뷰순 정렬 ( sortingMethod= "byReviews")
    BY_REVIEWS(2),
    //조회순 정렬 ( sortingMethod= "byViews")
    BY_VIEWS(3);


    @Getter
    private int methodId;

    SortingMethod(int methodId){
        this.methodId = methodId;
    }

    public int getMethodId() {
        return methodId;
    }
}
