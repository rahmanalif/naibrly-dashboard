// import { Badge } from "@/components/ui/badge";
// import React from "react";
// // import { Badge } from "@shadcn/ui"; // Badge component for status like 'Pending'

// const activities = [
//   { id: 1, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
//   { id: 2, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
//   { id: 3, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
//   { id: 4, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
//   { id: 5, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
// ];

// const ActivityTimeline = () => {
//   return (
//     <div className="w-full p-4 bg-white border rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
//       <div className="space-y-4">
//         {activities.map((activity) => (
//           <div key={activity.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
//             <div className="flex flex-col space-y-1">
//               <p className="font-medium text-gray-900">{activity.text}</p>
//               <p className="text-sm text-gray-600">{activity.subText}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Badge variant="outline" color="yellow" className="text-yellow-600">{activity.status}</Badge>
//               <p className="text-sm text-gray-500">{activity.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityTimeline;


import React from "react";
// import { Badge } from "@shadcn/ui"; // Badge component for status like 'Pending'
import providerImage from "@/assets/provider.png"; // Using the provider image from assets folder
import { Badge } from "@/components/ui/badge";

const activities = [
    { id: 1, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
    { id: 2, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
    { id: 3, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
    { id: 4, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
    { id: 5, text: "Text", subText: "Sub text", status: "Pending", date: "Aug 12, 2025" },
];

const ActivityTimeline = () => {
    return (
        <div className="w-full p-4 bg-white border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                            <img
                                src={providerImage} // Using the provider image
                                alt="Provider"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center gap-4">
                                    <p className="font-medium text-gray-900">{activity.text}</p>
                                    <p className="text-[#F1C400] bg-[#FFF7D6] p-2 rounded-lg">{activity.status}</p>
                                </div>
                                <p className="text-sm text-gray-600">{activity.subText}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* <p className="text-yellow-600">{activity.status}</p> */}
                            <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;
