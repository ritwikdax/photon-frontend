"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";

// Lazy load the assignment component
const TeamAssignmentPage = dynamic(() => import("./assignment"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Page() {
  return <TeamAssignmentPage />;
}