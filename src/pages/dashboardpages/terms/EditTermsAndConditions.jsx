import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  ImageIcon,
} from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getTermsAndConditions, updateTermsAndConditions } from "../../../services/settingsService";
import { toast } from "sonner";

const EditTermsAndConditions = () => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState("16");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await getTermsAndConditions();
      if (response.success) {
        setContent(response.data.content?.content || "");
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      toast.error(error?.message || 'Failed to load terms and conditions');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!content.trim()) {
        toast.error('Content cannot be empty');
        return;
      }

      setSaving(true);
      const response = await updateTermsAndConditions(content);

      if (response.success) {
        toast.success('Terms and Conditions updated successfully!');
        setTimeout(() => navigate('/dashboard/settings/terms'), 1000);
      }
    } catch (error) {
      console.error('Error updating terms:', error);
      toast.error(error?.message || 'Failed to update terms and conditions');
    } finally {
      setSaving(false);
    }
  };

  const insertText = (before, after = "") => {
    const newContent = content + before + after;
    setContent(newContent);
  };

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertText("**Bold Text**") },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertText("*Italic Text*"),
    },
    {
      icon: Underline,
      label: "Underline",
      action: () => insertText("<u>Underlined</u>"),
    },
    {
      icon: Strikethrough,
      label: "Strikethrough",
      action: () => insertText("~~Strikethrough~~"),
    },
  ];

  const alignButtons = [
    { icon: AlignLeft, label: "Align Left" },
    { icon: AlignCenter, label: "Align Center" },
    { icon: AlignRight, label: "Align Right" },
  ];

  const listButtons = [
    {
      icon: List,
      label: "Bullet List",
      action: () => insertText("\n• List item"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertText("\n1. List item"),
    },
  ];

  const insertButtons = [
    {
      icon: Link,
      label: "Insert Link",
      action: () => {
        const url = prompt("Enter URL:");
        if (url) insertText(`[Link Text](${url})`);
      },
    },
    {
      icon: ImageIcon,
      label: "Insert Image",
      action: () => {
        const url = prompt("Enter image URL:");
        if (url) insertText(`![Image](${url})`);
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">

      <div className="flex items-center justify-between mb-4">


        {/* Header */}
        <div className=" text-black flex items-center gap-3">
          
          <h1 className="flex items-center text-lg font-medium"> <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />  Edit Terms and Conditions</h1>
        </div>

        {/* Save Button */}
        <div className="">
          <Button
            onClick={handleSaveChanges}
            disabled={saving}
            className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white px-8 py-2 rounded-md disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update'}
          </Button>
        </div>

      </div>

      {/* Main Content */}
      <div className="">
        <div className="mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm text-[#0E7A60] p-4">
            {/* Toolbar */}
            <div className="rounded-lg p-3 bg-gray-50">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Font Size Selector */}
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-16 h-8 text-sm text-[#0E7A60]">
                    <SelectValue className="text-[#0E7A60]"/>
                  </SelectTrigger>
                  <SelectContent>
                    {["12", "14", "16", "18", "20", "24"].map((size) => (
                      <SelectItem key={size} value={size} className="text-[#0E7A60]">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Format Buttons */}
                <div className="w-px h-6 bg-gray-300 mx-1" />
                {formatButtons.map(({ icon: Icon, label, action }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}

                {/* Alignment Buttons */}
                <div className="w-px h-6 bg-gray-300 mx-1" />
                {alignButtons.map(({ icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}

                {/* List Buttons */}
                <div className="w-px h-6 bg-gray-300 mx-1" />
                {listButtons.map(({ icon: Icon, label, action }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}

                {/* Insert Buttons */}
                <div className="w-px h-6 bg-gray-300 mx-1" />
                {insertButtons.map(({ icon: Icon, label, action }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    onClick={action}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="relative text-black">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing..."
                className="h-[500px] border-0 resize-none focus:ring-0 focus:outline-none text-sm leading-relaxed overflow-y-auto"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>

            {/* Save Button */}
            {/* <div className="p-4 border-t border-gray-200">
              <Button
                onClick={handleSaveChanges}
                className="bg-[#017783] hover:bg-[#015a63] text-white px-8 py-2 rounded-md"
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

export default EditTermsAndConditions;
