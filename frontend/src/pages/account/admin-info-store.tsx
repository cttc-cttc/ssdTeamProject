import { create } from "zustand";

interface AdminInfoStore {
    adminPkID: string | null;
    adminName: string | null;
    adminId: string | null;

    setInfoStore: (data: {
        adminPkID: string;
        adminName: string;
        adminId: string;
    }) => void;

    clearInfoStore: () => void;
}

export const useAdminInfoStore = create<AdminInfoStore>(set => ({
    adminPkID: localStorage.getItem("adminPkID"),
    adminName: localStorage.getItem("adminName"),
    adminId: localStorage.getItem("adminId"),

    setInfoStore: ({ adminPkID, adminName, adminId }) => {
        localStorage.setItem("adminPkID", adminPkID);
        localStorage.setItem("adminName", adminName);
        localStorage.setItem("adminId", adminId);
        set({ adminPkID, adminName, adminId });
    },

    clearInfoStore: () => {
        localStorage.removeItem("adminPkID");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminId");
        set({ adminPkID: null, adminName: null, adminId: null });
    },
}));