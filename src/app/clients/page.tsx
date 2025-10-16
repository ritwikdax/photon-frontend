"use client"
import { useState } from "react";
import EditableTypography from "../components/EditableTypography";

export default function ClientsPage() {
    //const [title, setTitle] = useState("Click to edit");
  return (
    <div>
      <h1>Clients</h1>
      <p>Clients page content goes here.</p>
      <EditableTypography value="Hello" onSave={(newValue)=>{}} variant="h6"  placeholder="Enter title"/>
    </div>
  );
}
