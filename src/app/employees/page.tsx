"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";

// Lazy load the employees component
const EmployeesPage = dynamic(() => import("./employees"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Page() {
  return <EmployeesPage />;
}
