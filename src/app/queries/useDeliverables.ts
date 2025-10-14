import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { Deliverable } from "../interfaces/data/interface";

export default function useProjectDeliverables(projectId: string) {
  return useQuery({
    queryKey: ["deliverables", projectId],
    queryFn: async () => {
      return await fetchProjectDeliverables(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchProjectDeliverables(id: string) {
  // Dummy data for testing
  const dummyData: Deliverable[] = [
    {
      id: "del-1",
      createdAt: new Date("2025-10-01"),
      updatedAt: new Date("2025-10-14"),
      type: "edited_photos",
      deliveryTime: 15,
      assetType: "digital",
      isDelivered: false,
      projectId: id,
      deliveryUpdates: [
        {
          id: "du-1",
          createdAt: new Date("2025-10-01"),
          updatedAt: new Date("2025-10-01"),
          title: "Photos received from event",
          status: "done",
          //deliverableId: "del-1",
        },
        {
          id: "du-2",
          createdAt: new Date("2025-10-05"),
          updatedAt: new Date("2025-10-10"),
          title: "Selection and basic editing in progress",
          status: "in_progress",
          //deliverableId: "del-1",
        },
        {
          id: "du-3",
          createdAt: new Date("2025-10-08"),
          updatedAt: new Date("2025-10-08"),
          title: "Final color grading and retouching",
          status: "not_started",
          //deliverableId: "del-1",
        },
      ],
    },
    {
      id: "del-2",
      createdAt: new Date("2025-10-01"),
      updatedAt: new Date("2025-10-12"),
      type: "album",
      deliveryTime: 30,
      assetType: "physical",
      isDelivered: false,
      projectId: id,
      deliveryUpdates: [
        {
          id: "du-4",
          createdAt: new Date("2025-10-01"),
          updatedAt: new Date("2025-10-05"),
          title: "Album design started",
          status: "done",
          //deliverableId: "del-2",
        },
        {
          id: "du-5",
          createdAt: new Date("2025-10-06"),
          updatedAt: new Date("2025-10-12"),
          title: "Client approval pending",
          status: "in_progress",
          //deliverableId: "del-2",
        },
      ],
    },
    {
      id: "del-3",
      createdAt: new Date("2025-09-25"),
      updatedAt: new Date("2025-10-05"),
      type: "teaser",
      deliveryTime: 7,
      assetType: "digital",
      isDelivered: true,
      projectId: id,
      deliveryUpdates: [
        {
          id: "du-6",
          createdAt: new Date("2025-09-25"),
          updatedAt: new Date("2025-09-28"),
          title: "Video editing completed",
          status: "done",
          //deliverableId: "del-3",
        },
        {
          id: "du-7",
          createdAt: new Date("2025-09-30"),
          updatedAt: new Date("2025-10-02"),
          title: "Music and effects added",
          status: "done",
          //deliverableId: "del-3",
        },
        {
          id: "du-8",
          createdAt: new Date("2025-10-03"),
          updatedAt: new Date("2025-10-05"),
          title: "Delivered to client",
          status: "done",
          //deliverableId: "del-3",
        },
      ],
    },
    {
      id: "del-4",
      createdAt: new Date("2025-10-10"),
      updatedAt: new Date("2025-10-10"),
      type: "raw_photos",
      deliveryTime: 3,
      assetType: "digital",
      isDelivered: false,
      projectId: id,
      deliveryUpdates: [],
    },
  ];

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return dummyData;
  
  // Replace with actual API call when ready
  // const { data } = await http.get(`/api/deliverables?projectId=${id}`);
  // console.log(data);
  // return data;
}
