import { useApiStore } from "@/components/common/api-store";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface ActivitySectionProps {
  userPkID: number;
}

export default function ActivitySection({ userPkID }: ActivitySectionProps) {
  const { API_BASE } = useApiStore();
  const [participatedStudies, setParticipatedStudies] = useState(0);
  const [createdStudies, setCreatedStudies] = useState(0);
  const [wishStudies, setWishStudies] = useState(0);

  const fetchListCount = useCallback(() => {
    axios
      .get(`${API_BASE}/api/users/activity/${userPkID}`)
      .then(res => {
        // console.log(res.data);
        setParticipatedStudies(res.data.participatedStudies);
        setCreatedStudies(res.data.createdStudies);
        setWishStudies(res.data.wishStudies);
      })
      .catch(err => console.error("활동 통계 조회 실패: ", err));
  }, [userPkID, API_BASE]);

  useEffect(() => {
    fetchListCount();
  }, [fetchListCount]);

  return (
    <div className="px-6 py-6 border-t">
      <h2 className="text-lg font-semibold mb-4">활동 통계</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{participatedStudies}</p>
          <p>참여 스터디</p>
        </div>
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{createdStudies}</p>
          <p>개설 스터디</p>
        </div>
        <div className="text-center bg-[#f5f5dc] p-4 rounded-lg dark:bg-[#2c3e50]">
          <p>{wishStudies}</p>
          <p>위시 스터디</p>
        </div>
      </div>
    </div>
  );
}
