"use client";

import { useState } from "react";
import { PlanDetail, User } from "../types/types";

const PlanSubmitButton = ({ plan, user }: { plan: PlanDetail; user: User }) => {
  const [status, setStatus] = useState(plan.status);
  const handlePlanSubmitClick = async () => {
    const content = `${user.name}さんから「${plan?.title}」のリクエストが届いています。\nさっそく承諾をしよう！ [こちらから](${process.env.NEXT_PUBLIC_BASE_URL}/plans/${plan?.id})`;

    const response = await fetch("/api/plan-submissions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, plan, content }),
    });

    if (response.ok) {
      console.log("Message sent successfully!");
      setStatus("pending");
    } else {
      console.error("Failed to send messageだよ");
    }
  };

  return (
    <>
      {status === "pending" ? (
        <button
          className="bg-gray-500 text-white font-bold py-3 w-full rounded text-center mb-4"
          onClick={handlePlanSubmitClick}
        >
          リクエスト済み
        </button>
      ) : (
        <button
          className="bg-primary-500 text-white font-bold py-3 w-full rounded text-center mb-4"
          onClick={handlePlanSubmitClick}
        >
          プランをリクエスト
        </button>
      )}
    </>
  );
};

export default PlanSubmitButton;
