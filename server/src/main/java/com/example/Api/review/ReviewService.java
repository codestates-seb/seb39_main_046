package com.example.Api.review;

import com.example.Api.member.Member;
import com.example.Api.product.Product;
import com.example.Api.specification.ReviewSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review createReview(Review review){

        Review savedReview = saveReview(review);
        return savedReview;
    }

    private Review saveReview(Review review){
        return reviewRepository.save(review);
    }

    public void updateReview(Review review, Member member){

        Review findReview = findVerifiedReviewId(review.getReviewId());
        long memberId = member.getId();
        if(checkAuth(review,memberId)){
            Optional.ofNullable(review.getContent())
                    .ifPresent(content -> findReview.setContent(content));
            Optional.ofNullable(review.getImageURL())
                    .ifPresent(imageURL -> findReview.setImageURL(imageURL));

            saveReview(findReview);
        }
        else{
            throw new RuntimeException("수정 권한이 없습니다.");
        }

    }

    public Review findVerifiedReviewId(long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review findReview =
                optionalReview.orElseThrow(()->
                        new RuntimeException("Review not found"));
        return findReview;
    }

    private boolean checkAuth(Review review, long memberId){
        boolean result = false;
        if(memberId == review.getMember().getId()){
            result = true;
        }
        return result;
    }

    public void deleteReview(Review review, Member member){

        long memberId = member.getId();
        if(checkAuth(review,memberId)){
            reviewRepository.delete(review);
        }
        else{
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
    }

    public Page<Review> findAllReviewByMethod(int page, int size, int methodId){
        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return reviewRepository.findAll(PageRequest.of(page, size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return reviewRepository.findAll(PageRequest.of(page, size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return reviewRepository.findAll(PageRequest.of(page, size,
                    Sort.by("views").descending()));
        }

        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

    public List<Review> findAllReviews(Sort hearts){
        return reviewRepository.findAll(hearts);
    }


    public Page<Review> findAllByMemberAndMethod(int page, int size, Member member, int methodId){
        Specification<Review> spec = Specification.where(ReviewSpecification.equalMember(member));


        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("views").descending()));
        }

        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }

    //findAllByProductAndMethod
    public Page<Review> findAllByProductAndMethod(int page, int size, Product product, int methodId){
        Specification<Review> spec = Specification.where(ReviewSpecification.equalProduct(product));


        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else if(methodId == 2){
            System.out.println("리뷰 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("reviews").descending()));
        }
        else if(methodId == 3){
            System.out.println("조회 순 정렬");
            return reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("views").descending()));
        }

        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    }





    //setRenadomHearts
    public void setRandomHearts(Review review){
        Review findReview = findVerifiedReviewId(review.getReviewId());

        Optional.ofNullable(review.getHearts())
                .ifPresent(hearts -> findReview.setHearts(hearts));

        reviewRepository.save(findReview);

    }
}
