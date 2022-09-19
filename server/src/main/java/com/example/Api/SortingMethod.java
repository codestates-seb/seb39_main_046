package com.example.Api;

import com.example.Api.product.Product;
import lombok.Getter;

import java.util.Comparator;

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

    static class ProductHeartsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getHearts() > p2.getHearts()) {
                return 1;
            } else if (p1.getHearts() < p2.getHearts()) {
                return -1;
            }
            return 0;
        }
    }
    /*
    static class ProductReviewsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getReviews() > p2.getReviews()) {
                return 1;
            } else if (p1.getReviews() < p2.getReviews()) {
                return -1;
            }
            return 0;
        }
    }
    static class ProductViewsComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            if (p1.getViews() > p2.getViews()) {
                return 1;
            } else if (p1.getViews() < p2.getViews()) {
                return -1;
            }
            return 0;
        }
    }

    static class ProductCreatedAtComparator implements Comparator<Product> {
        @Override
        public int compare(Product p1, Product p2) {
            return (p1.getCreatedAt()).compareTo(p2.getCreatedAt());
        }
    }

     */
}
