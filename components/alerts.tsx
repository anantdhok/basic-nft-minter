import React, { ReactNode } from "react";

interface AlertsProps {
  type: "info" | "success" | "warning" | "error";
  message: string | ReactNode;
}

const alertIcons = {
  info: {
    class: "alert-info",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  success: {
    class: "alert-success",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  warning: {
    class: "alert-warning",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  },
  error: {
    class: "alert-error",
    icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  }
};

function Alerts({ type = "info", message }: AlertsProps) {
  return (
    <div className={`alert ${alertIcons[type].class} shadow-lg`} id="status">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={alertIcons[type].icon} />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Alerts;
