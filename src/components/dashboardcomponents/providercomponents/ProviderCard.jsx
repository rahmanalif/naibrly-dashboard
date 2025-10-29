


import React from "react";
// import { Badge } from "@shadcn/ui";
// import { Button } from "@shadcn/ui";
import { Phone, Mail } from "lucide-react";
import providerImage from "@/assets/provider.png"; // Assuming you have the image in the assets folder
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProviderCard = () => {
  return (
    <div className=" p-4 border shrink-0 rounded-lg shadow-md bg-white">
      <div className="flex items-center bg-[#1C59410D]/50 p-5 rounded-lg">
        <div className="p-[1px] rounded-full bg-gradient-to-b from-[#93E3A4] to-[#517D5A]">

        
        <div className="w-16 h-16 rounded-full overflow-hidden m-[1px] bg-white p-[1px]">
          <img src={providerImage} alt="Provider" className="w-full h-full object-cover" />
        </div>
        </div>
        <div className="ml-4 flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Jacob Maicle</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span>★ 5.0 (55 reviews)</span>
          </div>
          <div className="ml-auto flex gap-2">
          <Button variant="outline" className="border border-[#3EBF5A]" color="green">Provider</Button>
          <Button variant="outline" className="bg-[#F34F4F] text-white hover:bg-[#F34F4F] hover:text-white" color="red">Ban</Button>
        </div>
        </div>
        {/* <div className="ml-auto flex gap-2">
          <Button variant="outline" color="green">Provider</Button>
          <Button variant="outline" color="red">Ban</Button>
        </div> */}
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">About</h3>
        <p className="text-sm text-gray-600">
          Ocean View Hotel is a premium beachfront destination renowned for its exceptional guest service, welcoming atmosphere, and dynamic work culture.
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Details</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Name:</strong> Jacob Maicle</p>
          <p><strong>Location:</strong> Rome, Italy</p>
          <p><strong>Business Hours:</strong> 9:00AM - 5:00PM</p>
          <p><strong>Joined Date:</strong> Aug 5, 2023</p>
          <p><strong>Business Status:</strong> <span className="bg-[#E4F6E8] p-1 rounded-sm text-[#3EBF5A]">Verified</span> </p>
          {/* <Badge color="green">Verified</Badge> */}
          <p><strong>Contact:</strong> <Phone size={14} className="inline" /> (603) 555-0123</p>
          <p><strong>Email:</strong> <Mail size={14} className="inline" /> support@romasportsclub.com</p>
          <p><strong>Language:</strong> English</p>
          <p><strong>Services Provided:</strong> <span className="bg-[#FFF7D6] p-1 text-[#F1C400] rounded-sm"> Cleaning & Organization </span></p>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
