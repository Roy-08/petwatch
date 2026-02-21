"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VisitssRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/visits");
  }, [router]);
  return null;
}