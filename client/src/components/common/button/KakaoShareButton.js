import React, { useEffect } from "react";
import Button from "./Button";

const { Kakao } = window;

const KakaoShareButton = ({ data }) => {
    const url = "https://localhost:3000";
    const resultUrl = window.location.href;
    const API_KEY = process.env.REACT_APP_KAKAO_SHARE_API_KEY;

    useEffect(() => {
        Kakao.cleanup();
        Kakao.init(API_KEY);
        console.log(Kakao.isInitialized());
    }, [API_KEY]);

    const shareKakao = () => {
        Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: "편의점 취향 테스트 결과",
                description: `당신이 편의점에 온다면 가장 좋아하는 음식은 ${data.name}입니다.`,
                imageUrl: url + data.image,
                link: {
                    mobileWebUrl: resultUrl,
                    webUrl: resultUrl,
                },
            },
            buttons: [
                {
                    title: "나도 테스트 하러가기",
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
            ],
        });
    };
    return <Button onClick={shareKakao}>카카오톡 공유하기</Button>;
};

export default KakaoShareButton;
