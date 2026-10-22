"use client";

import { useEffect } from "react";

export const BootstrapClient: React.FC = () => {
  useEffect(() => {
    // Dynamically import bootstrap JS so popper and dropdown/collapse/modal work
    import("bootstrap/dist/js/bootstrap.bundle.min.js" as any)
      .then(() => {
        // Bootstrap initialized
      })
      .catch((err) => {
        console.error("Bootstrap JS load error:", err);
      });
  }, []);

  return null;
};
