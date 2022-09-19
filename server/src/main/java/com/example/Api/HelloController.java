package com.example.Api;

import com.example.Api.member.Member;
import com.example.Api.member.MemberRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
// 1.편비티아이 결과로 인한 카테고리별 상품 1개 씩 총 11개
// 2. 베스트 추천 리뷰

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;

    public HelloController(BCryptPasswordEncoder bCryptPasswordEncoder, MemberRepository memberRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.memberRepository = memberRepository;
    }

    @Operation(summary = "", description = "hello api example")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })


//    @GetMapping("/hello")
//    @ApiOperation(value = "멤버 조회",notes = "추가 적인 메모는 이렇게 추가")
//    public ResponseEntity<Member> hello(@Parameter(description = "이름", required = true, example = "Park") @RequestParam String name) {
//        Member member = new Member();
//
//        return ResponseEntity.ok(member);
//    }

    @PostMapping("/hello")
    public ResponseEntity<Member> hello2(Member member) {

        return ResponseEntity.ok(member);
    }

    @GetMapping
    public String defalt(){
        return "전체 5 정보, 베스트 리뷰, 편비티아이";
    }

    @GetMapping("/seven11")
    public String CU5(){

        return "seven11";
    }

    @PostMapping("/signup")
    public String join(@RequestBody Member member) {
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.setRoles("ROLE_USER");
        memberRepository.save(member);
        return "회원 가입 완료";
    }

}