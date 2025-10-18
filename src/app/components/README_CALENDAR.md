# Monthly Calendar Component

A fully-featured monthly calendar component for displaying events in a React/Next.js application using Material-UI.

## Features

- 📅 **Monthly View**: Displays a complete month with all days
- 🎯 **Event Display**: Shows events based on `startDateTime` and `endDateTime`
- 🔄 **Navigation**: Easy month-to-month navigation with prev/next buttons
- 🎨 **Status Colors**: Color-coded events based on status (upcoming, in_progress, done, cancelled, postponed)
- 📱 **Responsive**: Works on different screen sizes
- 🖱️ **Interactive**: Click on events to trigger custom actions
- 💡 **Tooltips**: Hover over events to see full details
- 📊 **Multi-day Events**: Properly handles events that span multiple days
- ⏰ **Today Highlight**: Current day is highlighted
- 📝 **Event Count**: Shows "+X more" when more than 3 events exist on a day

## Installation

The component is already part of your project. It uses the following dependencies:
- `@mui/material`
- `@mui/icons-material`
- React

## Usage

### Basic Usage

```tsx
import MonthlyCalendar from "@/app/components/MonthlyCalendar";
import { Event } from "@/app/interfaces/data/interface";

function MyPage() {
  const events: Event[] = [
    {
      id: "1",
      projectId: "proj-001",
      startDateTime: new Date(2025, 9, 20, 10, 0),
      endDateTime: new Date(2025, 9, 20, 14, 0),
      venue: "Grand Hotel",
      assignment: "Wedding Photography",
      team: [{ employeeId: "emp-001", isLead: "true" }],
      status: "upcoming",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // ... more events
  ];

  return <MonthlyCalendar events={events} />;
}
```

### With Event Click Handler

```tsx
import MonthlyCalendar from "@/app/components/MonthlyCalendar";
import { Event } from "@/app/interfaces/data/interface";

function MyPage() {
  const events: Event[] = [/* your events */];

  const handleEventClick = (event: Event) => {
    console.log("Event clicked:", event);
    // Open a dialog, navigate to details, etc.
  };

  return (
    <MonthlyCalendar 
      events={events} 
      onEventClick={handleEventClick} 
    />
  );
}
```

### With React Query (Fetching Events)

```tsx
"use client";
import MonthlyCalendar from "@/app/components/MonthlyCalendar";
import { useEvents } from "@/app/queries/useEvents";

function EventsPage() {
  const { data: events = [], isLoading } = useEvents();

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return <MonthlyCalendar events={events} />;
}
```

## Props

### `MonthlyCalendarProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `events` | `Event[]` | Yes | Array of event objects to display on the calendar |
| `onEventClick` | `(event: Event) => void` | No | Callback function triggered when an event is clicked |

### Event Interface

The component expects events to follow this interface:

```typescript
interface Event {
  id: string;
  projectId: string;
  startDateTime: Date;
  endDateTime: Date;
  venue: string;
  assignment: string;
  team: Array<{ employeeId: string; isLead: string }>;
  status: "upcoming" | "done" | "cancelled" | "postponed" | "in_progress";
  createdAt: Date;
  updatedAt: Date;
}
```

## Event Status Colors

The component uses color-coding for different event statuses:

- 🔵 **Upcoming**: Blue (#2196F3)
- 🟠 **In Progress**: Orange (#FF9800)
- 🟢 **Done**: Green (#4CAF50)
- 🔴 **Cancelled**: Red (#F44336)
- ⚫ **Postponed**: Gray (#9E9E9E)

## How It Works

### Event Display Logic

The calendar displays events based on the following criteria:

1. **Events that start on a specific day**: If `startDateTime` falls on that day
2. **Events that end on a specific day**: If `endDateTime` falls on that day
3. **Events that span across a day**: If the event starts before and ends after that day

This means multi-day events will appear on all days they span.

### Date Handling

- The component handles month transitions properly
- Shows days from the previous and next months to fill the calendar grid
- Days from other months are displayed with reduced opacity
- Today's date is highlighted with a colored circle

### Performance

- Uses `useMemo` to calculate calendar days only when the month or events change
- Efficiently filters events per day
- Limits display to 3 events per day (with overflow indicator)

## Example

See `MonthlyCalendarExample.tsx` for a complete working example with sample data.

## Customization

You can customize the component by modifying:

1. **Colors**: Update the `STATUS_COLORS` constant in the component
2. **Maximum events per day**: Change the `slice(0, 3)` value
3. **Styling**: Modify the `sx` props in the component
4. **Tooltip content**: Customize the tooltip in the component

## Integration with Your Project

The component is designed to work seamlessly with your existing project structure:

- Works with your `Event` interface from `@/app/interfaces/data/interface`
- Compatible with your Material-UI theme
- Can be used with your existing query hooks (`useEvents`, etc.)
- Integrates with your dialog and snackbar contexts

## Future Enhancements

Possible improvements:
- Week view option
- Day view option
- Drag-and-drop event rescheduling
- Event filtering by status or project
- Export to iCal format
- Print functionality
