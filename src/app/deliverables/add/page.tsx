"use client";

import AddDeliverableForm from "@/app/components/forms/AddDeliverableForm";
import useAddMuttion from "@/app/mutations/useAddMutataion";

export default function AddDeliverable() {
  const addMutation = useAddMuttion("deliverables");

  const handleSubmit = async (data: any) => {
    console.log("Deliverable data:", data);
    addMutation.mutate(data);
  };

  return (
    <div>
      <AddDeliverableForm onSubmit={handleSubmit} isLoading={addMutation.isPending} />
    </div>
  );
}
