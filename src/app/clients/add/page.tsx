"use client";

import AddClientForm from "@/app/components/forms/AddClientForm";
import useAddMuttion from "@/app/mutations/useAddMutataion";

export default function AddClient() {
  const addMutation = useAddMuttion("clients");

  const handleSubmit = async (data: any) => {
    console.log("Client data:", data);
    addMutation.mutate(data);
  };

  return (
    <div>
      <AddClientForm onSubmit={handleSubmit} />
    </div>
  );
}
