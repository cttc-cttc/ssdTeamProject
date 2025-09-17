// useContext 보다 간편한 전역 상태 관리 라이브러리
import { create } from "zustand";

interface InfoStore {
  userPkID: string | null;
  userName: string | null;
  userId: string | null;
  userNickname: string | null;
  userEmail: string | null;

  setInfoStore: (data: {
    userPkID: string;
    userName: string;
    userId: string;
    userNickname: string;
    userEmail: string;
  }) => void;

  clearInfoStore: () => void;
}

export const useInfoStore = create<InfoStore>(set => ({
  userPkID: localStorage.getItem("userPkID"),
  userName: localStorage.getItem("userName"),
  userId: localStorage.getItem("userId"),
  userNickname: localStorage.getItem("userNickname"),
  userEmail: localStorage.getItem("userEmail"),

  setInfoStore: ({ userPkID, userName, userId, userNickname, userEmail }) => {
    localStorage.setItem("userPkID", userPkID);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userNickname", userNickname);
    localStorage.setItem("userEmail", userEmail);
    set({ userPkID, userName, userId, userNickname, userEmail });
  },

  clearInfoStore: () => {
    localStorage.removeItem("userPkID");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userEmail");
    set({ userPkID: null, userName: null, userId: null, userNickname: null, userEmail: null });
  },
}));
