import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const policyParagraphs = [
    { quote:"1.Introduction",
      text:"Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus."},
    {quote:"2. Eligibility",
      text:"Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus."},
    {quote:"3. User Responsibility",
      text:"Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus."},
      {
        quote:"4. Prohibited Activities",
        text:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
      }
  ];

  const navigate = useNavigate();

  return (
    <div className="font-sans pr-5">
      {/* Header */}
      {/* <h2 className="text-xl sm:text-2xl font-bold mb-5 text-white bg-[#017783] p-5 rounded-lg">
        Privacy Policy
      </h2> */}

      {/* Edit Button */}
      {/* <div className="flex justify-end p-4">
        <Link to="/dashboard/settings/editprivacy">
          <Button className="bg-[#017783] hover:bg-[#015a63] text-white rounded-full flex items-center space-x-1 shadow-md">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </Link>
      </div> */}

      <div className="flex items-center justify-between">
      
      
              {/* Header */}
              <h2 className="text-2xl sm:text-xl font-semibold text-black  rounded-lg flex items-center">
                <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />
               Privacy Policy
              </h2>
      
              {/* Edit Button */}
              <div className="flex ">
                <Link to="/dashboard/settings/editprivacy">
                  <Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-lg flex items-center space-x-1 shadow-md">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                </Link>
              </div>
      
            </div>

      {/* Content */}
      {/* <div className="space-y-6 px-3">
        {policyParagraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}
      </div> */}

      {/* Content */}
      <div className="space-y-6 p-6 bg-[#FFFFFF] rounded-lg mt-4">
        <h3 className="text-[18px] text-[#0E7A60] font-semibold">Last Updated: October 2025</h3>
        {policyParagraphs.map((paragraph, index) => (
          <div key={index}>
          <p  className="text-gray-700 leading-relaxed text-justify">
            {paragraph.quote}
          </p>
          <p>
            {paragraph.text}
          </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
