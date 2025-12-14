import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAboutUs, formatLastUpdated } from "../../../services/settingsService";
import { toast } from "sonner";

const AboutUs = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      const response = await getAboutUs();
      if (response.success) {
        setContent(response.data.content?.content || "");
        setLastUpdated(response.data.content?.updatedAt || "");
      }
    } catch (error) {
      console.error('Error fetching about us:', error);
      toast.error(error?.message || 'Failed to load about us');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans pr-5">
      <div className="flex items-center justify-between">

        {/* Header */}
        <h2 className="text-2xl sm:text-xl font-semibold text-black  rounded-lg flex items-center">
          <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />
          About Us
        </h2>

        {/* Edit Button */}
        <div className="flex ">
          <Link to="/dashboard/settings/editabout">
            <Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-lg flex items-center space-x-1 shadow-md">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          </Link>
        </div>

      </div>

      {/* Content */}
      <div className="space-y-6 p-6 bg-[#FFFFFF] rounded-lg mt-4">
        {loading ? (
          <div className="text-center text-gray-600 py-8">Loading...</div>
        ) : (
          <>
            <h3 className="text-[18px] text-[#0E7A60] font-semibold">
              {lastUpdated ? formatLastUpdated(lastUpdated) : 'Last Updated: N/A'}
            </h3>
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
