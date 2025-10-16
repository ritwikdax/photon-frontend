"use client";

import AddEmployeeForm from "@/app/components/forms/AddEmployeeForm";
import useAddMuttion from "@/app/mutations/useAddMutataion";

export default function AddEmployee() {
    const addMutation = useAddMuttion("employees");

  const handleSubmit = async (data: any) => {
    console.log("Employee data:", data);
    addMutation.mutate(data);
    // TODO: Implement API call to add employee
    // Example:
    // const response = await fetch('/api/employees', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <div>
      <AddEmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}