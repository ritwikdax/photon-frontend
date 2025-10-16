"use client";

import AddEmployeeForm from "@/app/components/forms/AddEmployeeForm";
import useAddMuttion from "@/app/mutations/useAddMutataion";

export default function AddEmployee() {
    const addMutation = useAddMuttion("employees");

  const handleSubmit = async (data: any) => {
    console.log("Employee data:", data);
    addMutation.mutate(data);
  };

  return (
    <div>
      <AddEmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}