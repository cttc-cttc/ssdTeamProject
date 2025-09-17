// useState 보다 간편한 전역 상태 관리 라이브러리
import { create } from "zustand";

interface InfoStore {
  userPkId: number | null;
  userName: string | null;
  userId: string | null;
  userNickname: string | null;
  userEmail: string | null;

  setInfoStore: (data: {
    userPkId: number;
    userName: string;
    userId: string;
    userNickname: string;
    userEmail: string;
  }) => void;

  clearInfoStore: () => void;
}

export const useInfoStore = create<InfoStore>(set => ({
  userPkId: localStorage.getItem("userPkId") ? Number(localStorage.getItem("userPkId")) : null,
  userName: localStorage.getItem("userName"),
  userId: localStorage.getItem("userId"),
  userNickname: localStorage.getItem("userNickname"),
  userEmail: localStorage.getItem("userEmail"),

  setInfoStore: ({ userPkId, userName, userId, userNickname, userEmail }) => {
    localStorage.setItem("userPkId", userPkId.toString());
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userNickname", userNickname);
    localStorage.setItem("userEmail", userEmail);
    set({ userPkId, userName, userId, userNickname, userEmail });
  },

  clearInfoStore: () => {
    localStorage.removeItem("userPkId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userEmail");

    set({
      userPkId: null,
      userName: null,
      userId: null,
      userNickname: null,
      userEmail: null,
    });
  },
}));
