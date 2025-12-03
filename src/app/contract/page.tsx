"use client";
import dynamic from "next/dynamic";
import Loading from "./loading";

// Lazy load the contract component
const ContractPage = dynamic(() => import("./contract"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Page() {
  return <ContractPage />;
}
