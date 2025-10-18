export const projectsData = JSON.parse(`[
  {
    "_id": "68ed68988d0ccd5b6dd1641b",
    "id": "4b43cd3d-85fd-4d88-8ceb-7e840829843a",
    "createdAt": "2025-10-13T21:01:12.309Z",
    "updatedAt": "2025-10-13T21:10:49.141Z",
    "name": "Ranveer Alia Wedding",
    "phone": "9909876567",
    "alternatePhone": "7787634565",
    "leadSource": "facebook",
    "bookingCategory": "wedding",
    "dateOfBooking": "2025-09-23",
    "status": "open",
    "discussionSummary": "NRI Clients, Demand is very high",
    "email": "dasankit@gmail.com",
    "details": "Additional client details"
  },
  {
    "_id": "68ed68b58d0ccd5b6dd1641c",
    "id": "381a7837-f775-4801-96a5-2772443ea974",
    "createdAt": "2025-10-13T21:01:41.003Z",
    "updatedAt": "2025-10-13T21:13:06.438Z",
    "name": "Ankit Deep Rice Ceremony",
    "phone": "9909876567",
    "alternatePhone": "7787634565",
    "leadSource": "facebook",
    "bookingCategory": "Rice Ceremony",
    "dateOfBooking": "2025-09-23",
    "status": "close",
    "discussionSummary": "NRI Clients, Demand is very high",
    "email": "dasankit@gmail.com",
    "details": "Additional client details"
  }
]`)



export const eventsData = JSON.parse(`[
  {
    "_id": "68ee57aaaa188cf1f3b812fe",
    "id": "b89089ac-6be1-4fbc-b2e3-1742792b92e0",
    "createdAt": "2025-10-14T14:01:14.623Z",
    "updatedAt": "2025-10-14T14:03:04.353Z",
    "startDateTime": "2025-10-14T13:59:01.060Z",
    "endDateTime": "2025-10-14T18:00:00.000Z",
    "venue": "Jodhpur Palace",
    "team": [
      {
        "employeeId": "emp-001",
        "isLead": "true"
      },
      {
        "employeeId": "emp-002",
        "isLead": "false"
      }
    ],
    "assignment": "Still Photoshoot",
    "status": "upcoming",
    "projectId": "4b43cd3d-85fd-4d88-8ceb-7e840829843a"
  },
  {
    "_id": "68ee57aaaa188cf1f3b812ff",
    "id": "c99189bc-7ce2-5gcd-c3f4-2853803c03d1",
    "createdAt": "2025-10-15T09:00:00.000Z",
    "updatedAt": "2025-10-15T09:00:00.000Z",
    "startDateTime": "2025-10-20T10:00:00.000Z",
    "endDateTime": "2025-10-20T16:00:00.000Z",
    "venue": "City Park Garden",
    "team": [],
    "assignment": "Pre-Wedding Photography",
    "status": "upcoming",
    "projectId": "381a7837-f775-4801-96a5-2772443ea974"
  },
  {
    "_id": "68ee57aaaa188cf1f3b81300",
    "id": "d00290cd-8df3-6hde-d4g5-3964914d14e2",
    "createdAt": "2025-10-16T11:30:00.000Z",
    "updatedAt": "2025-10-16T11:30:00.000Z",
    "startDateTime": "2025-10-25T08:00:00.000Z",
    "endDateTime": "2025-10-25T20:00:00.000Z",
    "venue": "Beach Resort Goa",
    "team": [
      {
        "employeeId": "emp-003",
        "isLead": "true"
      },
      {
        "employeeId": "emp-004",
        "isLead": "false"
      },
      {
        "employeeId": "emp-005",
        "isLead": "false"
      }
    ],
    "assignment": "Corporate Event Coverage",
    "status": "upcoming",
    "projectId": "4b43cd3d-85fd-4d88-8ceb-7e840829843a"
  }
]`)