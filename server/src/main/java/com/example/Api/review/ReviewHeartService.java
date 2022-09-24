package com.example.Api.review;

import com.example.Api.member.Member;
import com.example.Api.member.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class ReviewHeartService {

    private final ReviewHeartRepository reviewHeartRepository;
    private final MemberRepository memberRepository;

    public ReviewHeartService(ReviewHeartRepository reviewHeartRepository, MemberRepository memberRepository) {
        this.reviewHeartRepository = reviewHeartRepository;
        this.memberRepository = memberRepository;
    }

    public ReviewHeart addHeart(Member member, Review review){
        if(checkAlreadyHeart(member,review)){
            ReviewHeart reviewHeart = new ReviewHeart();
            reviewHeart.addReview(review);
            reviewHeart.addMember(member);
            reviewHeartRepository.save(reviewHeart);

            return reviewHeart;
        }

        //이미 좋아요를 누른 리뷰라면
        ReviewHeart reviewHeart = new ReviewHeart();
        return  reviewHeart;
    }

    public ReviewHeart findReviewHeart(Member member, Review review){
        Optional<ReviewHeart> optionalReviewHeart = reviewHeartRepository.findByMemberAndAndReview(member,review);
        return optionalReviewHeart.orElseThrow(()->
                new RuntimeException("연결된 리뷰 좋아요 테이블이 없습니다."));
    }

    public void cancelHeart(ReviewHeart reviewHeart){
        reviewHeartRepository.delete(reviewHeart);
    }

    //Member가 이미 좋아요 누른 리뷰인지 체크( 이미 눌렀으면 false, 누르지 않았다면 true)
    public boolean checkAlreadyHeart(Member member,Review review){
        return reviewHeartRepository.findByMemberAndAndReview(member,review).isEmpty();
    }


    //정렬 부분
    public Page<ReviewHeart> SortHeartReviews(int page, int size, int methodId, Member member){
        Page<ReviewHeart> reviewHeartsPage;
        Sort.Order order;
        Sort sort;

        if(methodId == 1){
            System.out.println("좋아요순 정렬");
            order = Sort.Order.desc("review.hearts");
            sort = Sort.by(order);
            reviewHeartsPage = reviewHeartRepository.findAllByMember(member, PageRequest.of(page,size, sort));
        }
        else if(methodId == 2) {
            System.out.println("최신 리뷰순 정렬");
            order = Sort.Order.desc("review.createdAt");
            sort = Sort.by(order);
            reviewHeartsPage = reviewHeartRepository.findAllByMember(member, PageRequest.of(page,size, sort));
        }
        else { //최근에 좋아요 등록한 순서
            System.out.println("최근 좋아요순 정렬");
            order = Sort.Order.desc("createdAt");
            sort = Sort.by(order);
            reviewHeartsPage = reviewHeartRepository.findAllByMember(member, PageRequest.of(page,size, sort));
        }
        return reviewHeartsPage;
    }
}
