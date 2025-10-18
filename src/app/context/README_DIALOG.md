# Dialog Context Usage

The `DialogContext` provides a centralized, app-wide dialog system. Only one dialog instance exists throughout the entire application, making it easy to manage and consistent in appearance.

## Features

- **Single Dialog Instance**: Only one dialog is rendered in the entire app
- **Custom Content**: Pass any React component as dialog content
- **Custom Options**: Override default dialog props (maxWidth, fullWidth, etc.)
- **Easy to Use**: Simple `openDialog()` and `closeDialog()` API

## Setup

The `DialogProvider` is already included in the app's context providers (`all.tsx`), so you don't need to add it again.

## Usage

### Basic Example

```tsx
"use client";

import { useDialog } from "@/app/context/DialogContext";
import { Button, Typography } from "@mui/material";

export default function MyComponent() {
  const { openDialog, closeDialog } = useDialog();

  const handleOpen = () => {
    openDialog(
      <div>
        <Typography variant="h6">Hello from Dialog!</Typography>
        <Button onClick={closeDialog}>Close</Button>
      </div>
    );
  };

  return <Button onClick={handleOpen}>Open Dialog</Button>;
}
```

### With Custom Dialog Options

```tsx
const handleOpen = () => {
  openDialog(
    <YourCustomComponent />,
    {
      maxWidth: "lg",        // xs, sm, md, lg, xl, or false
      fullWidth: true,
      fullScreen: false,
    }
  );
};
```

### With Form Component

```tsx
const handleOpenForm = () => {
  openDialog(
    <AddProjectForm 
      onSubmit={(data) => {
        // Handle submission
        console.log(data);
        closeDialog();
      }}
      onCancel={closeDialog}
    />
  );
};
```

### Complex Content Example

```tsx
const handleOpenConfirmation = () => {
  openDialog(
    <Box>
      <Typography variant="h6" gutterBottom>
        Confirm Delete
      </Typography>
      <Typography variant="body1" paragraph>
        Are you sure you want to delete this item?
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={closeDialog}>Cancel</Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={() => {
            // Handle delete
            handleDelete();
            closeDialog();
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};
```

## API Reference

### `useDialog()`

Returns an object with the following methods:

#### `openDialog(content, options?)`

Opens the dialog with the specified content.

**Parameters:**
- `content` (ReactNode): The content to display in the dialog
- `options` (Partial<DialogProps>, optional): MUI Dialog props to override defaults
  - Default values: `{ maxWidth: "md", fullWidth: true }`

**Example:**
```tsx
openDialog(<MyComponent />, { maxWidth: "lg" });
```

#### `closeDialog()`

Closes the currently open dialog.

**Example:**
```tsx
closeDialog();
```

## Best Practices

1. **Always provide a close action**: Ensure your dialog content has a way to close (button, form submission, etc.)
2. **Pass `closeDialog` to child components**: Let form components close the dialog after submission
3. **Keep content focused**: Each dialog should have a single, clear purpose
4. **Use appropriate sizing**: Choose `maxWidth` based on your content needs

## Examples in the Codebase

See `AddMenu.tsx` for a real-world example of using the dialog system.
