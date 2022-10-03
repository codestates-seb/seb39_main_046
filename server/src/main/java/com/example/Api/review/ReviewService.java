package com.example.Api.review;

import com.example.Api.S3Upload;
import com.example.Api.member.Member;
import com.example.Api.product.Product;
import com.example.Api.specification.ReviewSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final S3Upload s3Upload;

    public ReviewService(ReviewRepository reviewRepository, S3Upload s3Upload) {
        this.reviewRepository = reviewRepository;
        this.s3Upload = s3Upload;
    }

    public Review createReview(Review review){
        return  reviewRepository.save(review);
    }



    public Review updateReview(Review review, Review patchReview){

        Optional.ofNullable(patchReview.getContent())
                .ifPresent(content -> review.setContent(content));
        Optional.ofNullable(patchReview.getImageURL())
                .ifPresent(imageURL -> review.setImageURL(imageURL));
        Optional.ofNullable(patchReview.getHearts())
                .ifPresent(hearts -> review.setHearts(hearts));
        Optional.ofNullable(patchReview.getReviewHearts())
                .ifPresent(reviewHearts -> review.setReviewHearts(reviewHearts));
       /* Optional.ofNullable(patchReview.getProduct())
                .ifPresent(product -> review.setProduct(product));
        Optional.ofNullable(patchReview.getMember())
                .ifPresent(member -> review.setMember(member));  리뷰를 수정하더라도 member와 product는 고정된 데이터*/

        return reviewRepository.save(review);
    }

    public Review findVerifiedReviewId(long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review findReview =
                optionalReview.orElseThrow(()->
                        new RuntimeException("Review not found"));
        return findReview;
    }

    public boolean checkAuth(Review review, long memberId){
        boolean result = memberId == review.getMember().getMemberId();
        return result;
    }

    public void deleteReview(Review review, Member member ) throws IOException{

        long memberId = member.getMemberId();
        if(checkAuth(review,memberId)){
            s3Upload.removeFile(review.getImageURL().replace("https://pre-project2.s3.ap-northeast-2.amazonaws.com/",""));
            reviewRepository.delete(review);
        }
        else{
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
    }

    public List<Review> findAllReviews(Sort hearts){
        return reviewRepository.findAll(hearts);
    }

    public List<Review> getTop5Reviews(){
        List<Review> reviewList = new ArrayList<>();
        List<Review> top5Reviews = new ArrayList<>();

        //리뷰 top5 기준 : 좋아요 수
        reviewList = reviewRepository.findAll(Sort.by(Sort.Direction.DESC,"hearts"));

        int maxCount = 0;
        if(reviewList.size()>=5){
            maxCount = 5;
        }
        else if(reviewList.size() == 0){
            return null;
        }
        else {
            maxCount = reviewList.size();
        }
        for(int i = 0; i<maxCount; i++){
            Review review = reviewList.get(i);
            top5Reviews.add(review);
        }
        return top5Reviews;
    }


    // 상품 상세 페이지에 출력되는 리뷰 목록 페이지
    public Page<Review> SortReviews(int page, int size, int methodId, Member member, Product product){
        Specification<Review> spec = null;
        boolean productDetailPage = ( (product != null) && (member==null) );
        boolean myReviews = ((product == null)&&(member!=null));

        Page<Review> reviewsPage;

        if(methodId == 1){
            System.out.println("좋아요 순 정렬");
            if(productDetailPage){
                spec = Specification.where(ReviewSpecification.equalProduct(product));
            }
            else if(myReviews){
                spec = Specification.where(ReviewSpecification.equalMember(member));
            }
            reviewsPage = reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("hearts").descending()));
        }
        else{
            System.out.println("최신 순 정렬");
            if(productDetailPage){
                spec = Specification.where(ReviewSpecification.equalProduct(product));
            }
            else if(myReviews){
                spec = Specification.where(ReviewSpecification.equalMember(member));
            }
            reviewsPage = reviewRepository.findAll(spec, PageRequest.of(page,size,
                    Sort.by("createdAt").descending()));
        }
        return reviewsPage;

    }


    //setRenadomHearts
    public void setRandomHearts(Review review){
        Review findReview = findVerifiedReviewId(review.getReviewId());

        Optional.ofNullable(review.getHearts())
                .ifPresent(hearts -> findReview.setHearts(hearts));

        reviewRepository.save(findReview);

    }
    public Review postReview(ReviewPostDto reviewPostDto) throws IOException {
        Review review = new Review();
        if (reviewPostDto.getFile() == null)
        {review.setContent(reviewPostDto.getContent());
            review.setImageURL(null);
        }
        if (reviewPostDto.getContent()==null)
        { review.setContent(null);
            review.setImageURL(s3Upload.upload(reviewPostDto.getFile()));}
        if(reviewPostDto.getContent() != null && reviewPostDto.getFile() !=null) {
            review.setContent(reviewPostDto.getContent());
            review.setImageURL(s3Upload.upload(reviewPostDto.getFile()));
        }

        return review;
    }
//1
public String imgUpdate (ReviewPostDto reviewPostDto,ReviewPatchDto reviewPatchDto,Review review) throws IOException{
    if (reviewPatchDto == null)
    { if (reviewPostDto.getFile() == null) return null;
        return s3Upload.upload(reviewPostDto.getFile());}

    else
    { if (reviewPatchDto.getFile() == null) {return null;}
        s3Upload.removeFile(review.getImageURL().replace("https://pre-project2.s3.ap-northeast-2.amazonaws.com/",""));
        return s3Upload.upload(reviewPatchDto.getFile());}
}

    public List<Review> findMyReviewList(Member member){
        return reviewRepository.findAllByMember(member);
    }
}


