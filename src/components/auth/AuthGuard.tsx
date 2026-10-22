"use client";

import React, { useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const PUBLIC_ROUTES = ["/", "/portal", "/login", "/register"];

export const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAuthHydrated } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (isAuthHydrated && !isAuthenticated && !isPublicRoute) {
      router.push(`/portal?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthHydrated, isAuthenticated, isPublicRoute, pathname, router]);

  // While checking hydration, render nothing or spinner for non-public routes to prevent flashes
  if (!isAuthHydrated) {
    if (isPublicRoute) return <>{children}</>;
    return (
      <div className="py-5 text-center my-5" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying credentials...</span>
        </div>
      </div>
    );
  }

  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="py-5 d-flex align-items-center" style={{ minHeight: "75vh", backgroundColor: "#f8fafc" }}>
        <div className="container text-center">
          <div
            className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center text-primary mb-4 shadow-sm"
            style={{ width: "90px", height: "90px" }}
          >
            <i className="bi bi-shield-lock-fill fs-1 text-primary" />
          </div>

          <span className="section-tag mb-2">Access Restricted</span>
          <h1 className="h2 fw-bold text-dark mb-3">Enterprise Authentication Required</h1>
          <p className="text-muted small mb-4" style={{ maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
            The page you are trying to reach (<code>{pathname}</code>) is part of the NEXORA protected commercial system. Please sign in to view hardware specifications, pricing, inventory, or cart features.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link href={`/portal?redirect=${encodeURIComponent(pathname)}`} className="btn btn-primary-custom px-4 py-2.5">
              <i className="bi bi-box-arrow-in-right me-2" />
              Sign In to Continue
            </Link>
            <Link href="/" className="btn btn-outline-custom px-4 py-2.5">
              <i className="bi bi-house-door me-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
