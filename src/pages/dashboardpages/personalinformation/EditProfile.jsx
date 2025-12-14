import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import flag from "../../../assets/flag.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { updateAdminProfile, uploadAdminProfileImage, validateEmail } from "../../../services/settingsService";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

const EditProfile = () => {

  const navigate = useNavigate();
  const { admin, loading, fetchAdminProfile, updateAdminProfile: updateAdminContext } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone?.replace('+880', '') || "",
      });
      setProfileImagePreview(admin.profileImage || "");
    }
  }, [admin]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Validation
      if (!formData.name.trim()) {
        toast.error('Name is required');
        return;
      }

      if (!formData.email.trim()) {
        toast.error('Email is required');
        return;
      }

      if (!validateEmail(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      if (!formData.phone.trim()) {
        toast.error('Phone number is required');
        return;
      }

      setSaving(true);

      // Upload profile image to Cloudinary if a new one is selected
      let uploadedImageUrl = profileImagePreview;
      if (profileImageFile) {
        try {
          setUploading(true);
          const uploadResponse = await uploadAdminProfileImage(profileImageFile);
          if (uploadResponse.success) {
            uploadedImageUrl = uploadResponse.data.profileImage.url;
            toast.success('Profile image uploaded successfully!');
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast.error(uploadError?.message || 'Failed to upload image');
          setSaving(false);
          setUploading(false);
          return;
        } finally {
          setUploading(false);
        }
      }

      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: `+880${formData.phone}`,
      };

      const response = await updateAdminProfile(updateData);

      if (response.success) {
        toast.success('Profile updated successfully!');

        // Update admin context
        await fetchAdminProfile();

        // Navigate back to profile page
        setTimeout(() => navigate('/dashboard/settings/profile'), 1000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">

      <div className="flex items-center justify-between">


        {/* Header */}
        <div className=" text-black  text-xl font-semibold flex justify-between items-center rounded-md">

           {/* <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 cursor-pointer"
  >
    <MdOutlineKeyboardArrowLeft size={30} />
    <span>Edit Personal Information</span>
  </button> */}

          <span className="flex items-center"> <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />Edit Personal Information</span>
        </div>

        <Button
          onClick={handleSaveChanges}
          disabled={saving || uploading}
          className=" bg-[#0E7A60] hover:bg-[#0E7A60] text-white disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Save Changes'}
        </Button>

      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4  mt-8">
        {/* Profile Card and Information Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src={profileImagePreview || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback>{formData.name?.substring(0, 2).toUpperCase() || "AD"}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-white" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
            {profileImageFile && (
              <p className="text-xs text-gray-600 text-center mb-2">
                New image selected: {profileImageFile.name}
              </p>
            )}
            <p className="text-lg font-medium text-gray-800">Profile</p>
            <p className="text-gray-600">Admin</p>
          </div>

          {/* Information Fields */}
          <div className="md:col-span-2  p-6 rounded-lg  space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-gray-700 font-medium text-base mb-2 block"
              >
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white border border-gray-300 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#017783] focus:border-transparent"
                placeholder="Enter your name"
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
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-white border border-gray-300 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#017783] focus:border-transparent"
                placeholder="Enter your email"
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
                <div className="flex items-center border border-gray-300 bg-[#0E7A60] rounded-md px-3 py-2 text-[#FEFEFE]">
                  <img src={flag} alt="Bangladesh" className="h-4 w-6 mr-2" />
                  <span>+1242</span>
                </div>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  type="tel"
                  className="bg-white border border-gray-300 text-gray-800 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#017783] focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Additional Action Buttons */}
            {/* <div className="flex space-x-4 pt-4">
              <div>
                <Link to={"/dashboard/settings/personal"}>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
              <Button
                onClick={handleSaveChanges}
                className="flex-1 bg-[#017783] hover:bg-[#015a63] text-white"
              >
                Save Changes
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
