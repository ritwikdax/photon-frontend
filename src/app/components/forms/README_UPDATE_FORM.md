# AddUpdateForm Component

## Overview

The `AddUpdateForm` component is a reusable form component for adding and editing `Update` entities. It uses Material-UI components and React Hook Form for form handling and validation.

## Features

- ✅ **Add & Edit modes**: Single component handles both operations
- ✅ **Form validation**: Built-in validation using React Hook Form
- ✅ **Dialog integration**: Works seamlessly with the custom Dialog context
- ✅ **Loading states**: Displays loading indicators during async operations
- ✅ **Type-safe**: Full TypeScript support with proper type definitions
- ✅ **Consistent UI**: Follows the same design patterns as other forms in the app

## Usage

### Adding a New Update

```tsx
import { useDialog } from "@/app/context/DialogContext";
import AddUpdateForm from "@/app/components/forms/AddUpdateForm";
import useAddMutataion from "@/app/mutations/useAddMutataion";

function MyComponent() {
  const { openDialog, closeDialog } = useDialog();
  const addMutation = useAddMutataion("updates", false);

  const handleAddUpdate = () => {
    openDialog(
      <AddUpdateForm
        onSubmit={async (data) => {
          await addMutation.mutateAsync(data);
          closeDialog();
        }}
        onCancel={closeDialog}
        isLoading={addMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
  };

  return (
    <Button onClick={handleAddUpdate}>
      Add Update
    </Button>
  );
}
```

### Editing an Existing Update

```tsx
import { useDialog } from "@/app/context/DialogContext";
import AddUpdateForm from "@/app/components/forms/AddUpdateForm";
import useUpdateMutation from "@/app/mutations/useUpdateMutation";
import { Update } from "@/app/interfaces/data/interface";

function MyComponent({ update }: { update: Update }) {
  const { openDialog, closeDialog } = useDialog();
  const updateMutation = useUpdateMutation("updates", `id=${update.id}`);

  const handleEdit = () => {
    openDialog(
      <AddUpdateForm
        update={update}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
          closeDialog();
        }}
        onCancel={closeDialog}
        isLoading={updateMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
  };

  return (
    <Button onClick={handleEdit}>
      Edit
    </Button>
  );
}
```

## Props

### `AddUpdateFormProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(data: AddUpdateFormData) => Promise<void>` | Yes | Async function called when form is submitted |
| `onCancel` | `() => void` | No | Function called when cancel button is clicked |
| `update` | `Update` | No | Update object to edit (if provided, form will be in edit mode) |
| `isLoading` | `boolean` | No | Shows loading state on submit button |

### `AddUpdateFormData`

```typescript
interface AddUpdateFormData {
  title: string;
  description: string;
  updateType: {
    type: "payment" | "drive_backup" | "team_breafing" | "drive_uplaod" 
        | "image_transfer" | "sheet_update" | "contract_signing" | "other";
    status: "incomplete" | "not_started" | "in_progress" | "completed" 
          | "on_hold" | "cancelled" | "unknown";
  };
}
```

## Form Fields

### 1. **Title** (required)
- Type: Text
- Validation:
  - Required
  - Min length: 3 characters
  - Max length: 100 characters

### 2. **Description** (required)
- Type: Multiline text (4 rows)
- Validation:
  - Required
  - Min length: 10 characters
  - Max length: 1000 characters

### 3. **Update Type** (required)
- Type: Select dropdown
- Options:
  - Payment
  - Drive Backup
  - Team Briefing
  - Drive Upload
  - Image Transfer
  - Sheet Update
  - Contract Signing
  - Other

### 4. **Status** (required)
- Type: Select dropdown
- Options:
  - Incomplete
  - Not Started
  - In Progress
  - Completed
  - On Hold
  - Cancelled
  - Unknown

## Integration with Dialog Context

The form is designed to work with the custom Dialog context:

```tsx
const { openDialog, closeDialog } = useDialog();

// Open the form in a dialog
openDialog(
  <AddUpdateForm {...props} />,
  { maxWidth: "md", fullWidth: true }
);

// Close the dialog after successful submission
await onSubmit(data);
closeDialog();
```

## Complete Example Page

See `/src/app/updates/page.tsx` for a complete example of how to use the form in a page with:
- Add button to create new updates
- Integration with the Updates list component
- Proper dialog handling
- Mutation hooks for data persistence

## Related Components

- **Update.tsx**: Displays a single update card with edit/delete actions
- **Updates.tsx**: Displays a grid of update cards
- **UpdatesPage**: Example page implementation

## Notes

- The form automatically switches between "Add" and "Edit" modes based on whether an `update` prop is provided
- All form fields are validated using React Hook Form's built-in validation
- The form uses the same color scheme as other forms in the app (#b70058ff)
- Error messages are displayed inline under each field
