import { useMutation } from "react-query";
import axiosInstance from "../../utils/axiosInastance";
import { useNavigate } from "react-router-dom";

const PROXY = window.location.hostname === 'localhost' ? 'https://recostore24.com/' : '/proxy';

const loginperson = (log) => {
    return axiosInstance.post(`/member/login`, log);
};

export const useLogin = (onSuccess, onError) => {
    return useMutation(loginperson, {
        onSuccess,
        onError,
    });
};

const DeleteUser = () => {
    return axiosInstance.delete('/member');
};

export const useUserDelete = () => {
    const navigate = useNavigate();
    return useMutation(DeleteUser, {
        onSuccess:() => {
            navigate("/");
            sessionStorage.removeItem("token");
            window.location.reload();
        },
        onError:() => {
            console.log("탈퇴 실패");
        }
    })

}
