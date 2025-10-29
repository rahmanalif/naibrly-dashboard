import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import flag from "../../../assets/flag.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // ✅ Correct routing link

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-sans">
      <div className="flex items-center justify-between">
        {/* Header */}
        <div className="flex items-center text-black  text-xl font-semibold rounded-md">
          <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={()=>{navigate(-1)}}/>
          Personal Information
        </div>
        {/* first button color -  #017783 */}

        {/* Edit Profile Button */}
        <div className="flex justify-end">
          <Link to="/dashboard/settings/editpersonal">
            <Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white px-6 py-2 rounded-lg flex items-center space-x-2 shadow-md">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.586 3.586l-4 4V17h4l4-4-4-4z" />
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>

              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Edit Profile Button
        <div className="flex justify-end mb-8">
          <Link to="/dashboard/settings/editpersonal">
            <Button className="bg-[#017783] hover:bg-[#017783] text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.586 3.586l-4 4V17h4l4-4-4-4z" />
              </svg>
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div> */}

        {/* Profile Card and Information Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Avatar className="h-40 w-40 mb-4">
              <AvatarImage
                src="https://images.app.goo.gl/mrJyRYZVPjsik1j19"
                alt="Isabela"
              />
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium text-gray-800">Profile</p>
            <p className="text-gray-600">Admin</p>
          </div>

          {/* Information Fields */}
          <div className="md:col-span-2 p-6 space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-gray-700 font-medium text-base mb-2 block"
              >
                Name
              </Label>
              <Input
                id="name"
                value="Isabela"
                readOnly
                className="bg-gray-50 border border-gray-200 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-gray-700 font-medium text-base mb-2 block"
              >
                Email
              </Label>
              <Input
                id="email"
                value="Isabela@gmail.com"
                readOnly
                className="bg-gray-50 border border-gray-200 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="text-gray-700 font-medium text-base mb-2 block"
              >
                Phone No.
              </Label>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-200 bg-[#0E7A60] rounded-md px-3 py-2 text-white">
                  <img
                    src={flag}
                    alt="Bangladesh Flag"
                    className="h-4 w-6 mr-2"
                  />
                  <span>+880</span>
                </div>
                <Input
                  id="phone"
                  value="1234567890"
                  readOnly
                  type="tel"
                  className="bg-gray-50 border border-gray-200 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
