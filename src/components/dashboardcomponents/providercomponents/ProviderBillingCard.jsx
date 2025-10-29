import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import insurance from "@/assets/insurance.png";
import pass from "@/assets/pass.png";
import providerImage from "@/assets/provider.png";
import { Check } from "lucide-react";

const ProviderBillingCard = () => {
    return (
        <div className=" p-4 border rounded-lg shadow-md bg-white">
            {/* <div>
                <button className="btn">Account</button>
                <button className="btn">Billing</button>
            </div> */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Billing Address</h2>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 border-b pb-2">
                    <p><strong>Business Name:</strong> Jacob Maicle</p>
                    <p><strong>Contact:</strong> (603) 555-0123</p>

                    <p><strong>Business Name (DBA):</strong> ABCDE FG</p>
                    <p><strong>EIN Number:</strong> 123456789</p>

                    <p><strong>Email:</strong> irena.dubrovna@wayne.com</p>
                    <p><strong>Bank name:</strong> Bank of America</p>

                    <p><strong>Website:</strong> https://xyz</p>
                    <p><strong>Account number:</strong> 603 555-0123</p>

                    <p><strong>Address:</strong> 100 Water Plant Avenue,</p>
                    <p><strong>Routing Number:</strong> 5550123</p>

                    <p><strong>Zip:</strong> 542165</p>
                </div>

                {/* Insurance Proof */}
                <div className="mt-4 border border-green-300 rounded-md p-2">
                    <h3 className="text-sm font-medium mb-2">Upload proof of insurance coverage</h3>
                    <img src={insurance} alt="Insurance Proof" className="w-full rounded-md border" />
                </div>

                {/* Owner Operator ID */}
                <div className="mt-4 border border-green-300 rounded-md p-2">
                    <h3 className="text-sm font-medium mb-2">Owner Operator ID check</h3>
                    <div className="flex gap-3">
                        <img src={pass} alt="Owner ID 1" className="w-1/2 rounded-md border" />
                        <img src={pass} alt="Owner ID 2" className="w-1/2 rounded-md border" />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 p-3 bg-gray-50 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={providerImage} alt="Provider" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-medium text-gray-800">Tech-Haven</p>
                            <Badge>Provider</Badge>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-blue-600 font-medium">
                        <p>Add verify</p>
                        <Check size={16} />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="destructive" className="bg-red-100 text-red-600 hover:bg-red-200">
                            Cancel
                        </Button>
                        <Button className="bg-green-100 text-green-600 hover:bg-green-200">
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderBillingCard;
