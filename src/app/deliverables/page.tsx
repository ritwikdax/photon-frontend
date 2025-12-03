"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";

// Lazy load the deliverables component
const DeliverablesPage = dynamic(() => import("./deliverables"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Page() {
  return <DeliverablesPage />;
}
