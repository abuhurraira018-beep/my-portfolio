"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-floating-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => {
        let icon = "bi-check-circle-fill text-success";
        let borderClass = "border-success";
        if (toast.type === "danger") {
          icon = "bi-exclamation-octagon-fill text-danger";
          borderClass = "border-danger";
        } else if (toast.type === "warning") {
          icon = "bi-exclamation-triangle-fill text-warning";
          borderClass = "border-warning";
        } else if (toast.type === "info") {
          icon = "bi-info-circle-fill text-primary";
          borderClass = "border-primary";
        }

        return (
          <div
            key={toast.id}
            className={`card shadow-lg p-3 bg-white rounded-3 border-start border-4 ${borderClass}`}
            role="alert"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className={`bi ${icon} fs-5 me-2.5`} />
                <span className="small text-dark fw-medium">{toast.message}</span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-sm ms-3"
                aria-label="Close"
                onClick={() => removeToast(toast.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
