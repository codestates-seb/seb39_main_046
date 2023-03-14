import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import axios from "axios";

const ProfileDelete = () => {
    return axiosInstance.delete(`/member/profile`);
};

export const useDelteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(ProfileDelete, {
        onSuccess: () => {
            queryClient.invalidateQueries(["infos"]);
            alert("프로필 삭제를 완료했어요");
            window.location.reload();
        },
    });
};

const ProfileAdd = (fd) => {
    return axiosInstance.post("/member/profile", fd);
};

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(ProfileAdd, {
        onSuccess: () => {
            queryClient.invalidateQueries(["infos"]);
            alert("등록 완료");
        },
        onError: (e) => {
            alert("현재 S3비용 문제로 인해.. 업로드할 수가 없습니다. addme 노션에 시연이미지(gif)를 확인해주세요.");
        },
    });
};
