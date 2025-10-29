// import React from "react";

// const AllNotifications = () => {
//   return <div>AllNotifications</div>;
// };

// export default AllNotifications;


import React from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import providerImg from "@/assets/provider.png"; // Avatar image for provider (use your actual provider image from assets folder)

const notifications = [
  {
    title: "New Payment Information Submitted",
    description:
      "A service provider has completed their payment setup.",
    businessName: "Example: 'Elite Cleaning Services'",
    accountType: "Business Checking",
    status: "Awaiting Stripe verification",
    date: "Aug 12, 2025",
  },
  {
    title: "New Withdrawal Request",
    description:
      "A service provider has requested a withdrawal from their Stripe balance.",
    businessName: "Example: Sparkle Cleaning Co.",
    amountRequested: "$15,200",
    requestedOn: "October 5, 2025",
    paymentMethod: "Stripe Transfer",
    date: "Aug 12, 2025",
  },
  {
    title: "New Business Account Registration",
    description: "A new service provider has requested to open a business account.",
    businessName: "Example: 'Urban Fixers'",
    ownerName: "John Rahman",
    email: "john@urbanfixers.com",
    dateSubmitted: "October 5, 2025",
    date: "Aug 12, 2025",
  },
  {
    title: "New Report Submitted",
    description: "A user has submitted a report related to a service or provider.",
    reportedBy: "Sarah Asher",
    against: "Service Provider: HomeFix Ltd.",
    reason: "Poor Service / Misbehavior",
    date: "October 5, 2025",
    date: "Aug 12, 2025",
  },
];

const AllNotifications = () => {
  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 border border-black border-l-2"
        >
          {/* Avatar */}
          <img
            src={providerImg}
            alt="Provider"
            className="w-16 h-16 rounded-full border border-gray-200"
          />

          {/* Content */}
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <div className="flex  items-center gap-5">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="bg-[#FFF7D6] px-3 py-1 rounded-lg text-[#F1C400]">Pending</p>
              </div>
              <span className="text-sm text-gray-400">{notification.date}</span>
            </div>

            <p className="text-sm text-gray-600 mt-2">{notification.description}</p>

            {/* Extra Details */}
            <div className="text-sm text-gray-500 mt-2">
              {notification.businessName && (
                <p>
                  <strong>Business Name:</strong> {notification.businessName}
                </p>
              )}
              {notification.accountType && (
                <p>
                  <strong>Account Type:</strong> {notification.accountType}
                </p>
              )}
              {notification.amountRequested && (
                <p>
                  <strong>Amount Requested:</strong> {notification.amountRequested}
                </p>
              )}
              {notification.requestedOn && (
                <p>
                  <strong>Requested On:</strong> {notification.requestedOn}
                </p>
              )}
              {notification.paymentMethod && (
                <p>
                  <strong>Payment Method:</strong> {notification.paymentMethod}
                </p>
              )}
              {notification.ownerName && (
                <p>
                  <strong>Owner Name:</strong> {notification.ownerName}
                </p>
              )}
              {notification.email && (
                <p>
                  <strong>Email:</strong> {notification.email}
                </p>
              )}
              {
                notification.status && (
                  <span className="text-sm"> <strong>Status:</strong> {notification.status}</span>
                )
              }
              {notification.dateSubmitted && (
                <p>
                  <strong>Date Submitted:</strong> {notification.dateSubmitted}
                </p>
              )}
            </div>

            {/* Status and Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              {/* <span className="text-sm text-yellow-500">{notification.status}</span> */}
              <div className="flex gap-4">
                <Button variant="outline" className="text-black hover:bg-[##0E7A601A]/90 bg-[#0E7A601A]/90">
                  Reject
                </Button>
                <Button className="text-white bg-[#0E7A60] hover:bg-[#0E7A60]">Approve</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllNotifications;
