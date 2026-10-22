import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export const AnnouncementBar: React.FC = () => {
  if (!siteConfig.announcement.enabled) return null;

  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="container d-flex align-items-center justify-content-center text-center">
        <span>
          <i className="bi bi-stars me-2 text-warning" aria-hidden="true" />
          {siteConfig.announcement.text}
        </span>
        {siteConfig.announcement.linkUrl && siteConfig.announcement.linkText && (
          <Link href={siteConfig.announcement.linkUrl} className="d-inline-flex align-items-center">
            {siteConfig.announcement.linkText}
            <i className="bi bi-arrow-right ms-1 small" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
};
