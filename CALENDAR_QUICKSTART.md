# Monthly Calendar Component - Quick Start Guide

## What Was Created

I've created a comprehensive monthly calendar component for your photon-frontend project with the following files:

### 1. **MonthlyCalendar.tsx** (Main Component)
   - Location: `/src/app/components/MonthlyCalendar.tsx`
   - A fully-featured calendar component that displays events in a monthly grid view
   - Features:
     - Month navigation (previous/next buttons)
     - Color-coded events by status
     - Multi-day event support
     - Today's date highlighting
     - Event tooltips with full details
     - Click handlers for event interaction
     - Responsive grid layout

### 2. **MonthlyCalendarExample.tsx** (Standalone Example)
   - Location: `/src/app/components/MonthlyCalendarExample.tsx`
   - A complete working example with sample event data
   - Shows how to use the calendar component independently
   - Good for testing and demonstration

### 3. **EventsPageWithCalendar.tsx** (Integration Example)
   - Location: `/src/app/components/EventsPageWithCalendar.tsx`
   - Shows how to integrate the calendar with your existing events system
   - Features:
     - Toggle between calendar and list view
     - Uses your existing queries (useGenericQueries)
     - Integrates with employee lookup
     - Can replace or enhance your existing events page

### 4. **README_CALENDAR.md** (Documentation)
   - Location: `/src/app/components/README_CALENDAR.md`
   - Complete documentation with usage examples
   - API reference
   - Customization guide

## How to Use

### Option 1: Quick Test with Sample Data

```tsx
// In any page file
import MonthlyCalendarExample from "@/app/components/MonthlyCalendarExample";

export default function TestPage() {
  return <MonthlyCalendarExample />;
}
```

### Option 2: Use with Your Existing Events

```tsx
import MonthlyCalendar from "@/app/components/MonthlyCalendar";
import useGenericQueries from "@/app/queries/useGenericQueries";
import { Event } from "@/app/interfaces/data/interface";

export default function MyEventsPage() {
  const { data: events = [] } = useGenericQueries<Event[]>("events");
  
  const handleEventClick = (event: Event) => {
    // Your custom logic
    console.log("Clicked:", event);
  };

  return <MonthlyCalendar events={events} onEventClick={handleEventClick} />;
}
```

### Option 3: Replace Your Events Page

You can replace your current `/src/app/events/page.tsx` with the content from `EventsPageWithCalendar.tsx` to get both calendar and list views with a toggle.

## Key Features Explained

### 1. Event Display Logic
Events are shown on a day if:
- They **start** on that day
- They **end** on that day  
- They **span across** that day (multi-day events)

### 2. Status Colors
- 🔵 **Upcoming**: Blue
- 🟠 **In Progress**: Orange
- 🟢 **Done**: Green
- 🔴 **Cancelled**: Red
- ⚫ **Postponed**: Gray

### 3. Event Limits
- Shows up to 3 events per day
- Displays "+X more" for additional events
- Hover over events for full details

## Next Steps

1. **Test the component**: Create a test page with the example component
2. **Connect your data**: Use the calendar with your actual events API
3. **Customize styling**: Adjust colors, sizes, and layout to match your design
4. **Add features**: Extend with filtering, search, or other functionality

## Example Integration in Existing Events Page

To add calendar view to your existing events page (`/src/app/events/page.tsx`):

1. Import the calendar component
2. Add a view toggle button
3. Conditionally render calendar or list view

See `EventsPageWithCalendar.tsx` for a complete example!

## Props Reference

```typescript
interface MonthlyCalendarProps {
  events: Event[];              // Array of events to display
  onEventClick?: (event: Event) => void;  // Optional click handler
}
```

## Support

For more details, see:
- `README_CALENDAR.md` - Full documentation
- `MonthlyCalendarExample.tsx` - Working example
- `EventsPageWithCalendar.tsx` - Integration example
