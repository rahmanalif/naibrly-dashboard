import React, { useState, useEffect } from "react";
import { CirclePlus, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { toast } from "sonner";

const QuickChat = () => {
  // State management
  const [quickChats, setQuickChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form states
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all admin quick chats
  const fetchQuickChats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/quick-chats/admin/all");

      if (response.data.success) {
        setQuickChats(response.data.data.quickChats);
      }
    } catch (error) {
      console.error("Error fetching quick chats:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch quick chats"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch quick chats on component mount
  useEffect(() => {
    fetchQuickChats();
  }, []);

  // Handle create or update quick chat
  const handleSaveQuickChat = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Quick chat content is required");
      return;
    }

    if (content.length > 500) {
      toast.error("Content must be 500 characters or less");
      return;
    }

    try {
      setSubmitting(true);

      if (editingId) {
        // Update existing quick chat
        const response = await api.put(
          `/quick-chats/admin/update/${editingId}`,
          {
            content: content.trim(),
          }
        );

        if (response.data.success) {
          toast.success("Quick chat updated successfully");
          handleCloseDialog();
          fetchQuickChats();
        }
      } else {
        // Create new quick chat
        const response = await api.post("/quick-chats/admin/create", {
          content: content.trim(),
        });

        if (response.data.success) {
          toast.success("Quick chat created successfully");
          handleCloseDialog();
          fetchQuickChats();
        }
      }
    } catch (error) {
      console.error("Error saving quick chat:", error);
      toast.error(error.response?.data?.message || "Failed to save quick chat");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete quick chat
  const handleDeleteQuickChat = async () => {
    if (!deletingId) return;

    try {
      setSubmitting(true);
      const response = await api.delete(
        `/quick-chats/admin/delete/${deletingId}`
      );

      if (response.data.success) {
        toast.success("Quick chat deleted successfully");
        handleCloseDeleteDialog();
        fetchQuickChats();
      }
    } catch (error) {
      console.error("Error deleting quick chat:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete quick chat"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit click
  const handleEditClick = (quickChat) => {
    setEditingId(quickChat._id);
    setContent(quickChat.content);
    setIsDialogOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (quickChatId) => {
    setDeletingId(quickChatId);
    setIsDeleteDialogOpen(true);
  };

  // Handle add new quick chat click
  const handleAddClick = () => {
    setEditingId(null);
    setContent("");
    setIsDialogOpen(true);
  };

  // Close dialog and reset form
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setContent("");
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <div>
      {/* Add Quick Chat Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-white px-4 rounded-lg lg:text-[14px] font-semibold py-2 hover:bg-gray-50 transition-colors"
        >
          <span>
            <CirclePlus />
          </span>{" "}
          Add Quick Chat
        </button>
      </div>

      {/* Quick Chats Table */}
      <div className="overflow-x-auto p-4 bg-white rounded-2xl mt-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60]" />
          </div>
        ) : quickChats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No quick chats found. Create your first one!
          </div>
        ) : (
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-100 rounded-2xl">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Message Text</th>
                <th className="px-4 py-2 border-b">Usage Count</th>
                <th className="px-4 py-2 border-b">Created Date</th>
                <th className="px-4 py-2 border-b">Last Update</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {quickChats.map((row, index) => (
                <tr key={row._id} className="hover:bg-[#0E7A601A]">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b max-w-md truncate">
                    {row.content}
                  </td>
                  <td className="px-4 py-2 border-b">{row.usageCount}</td>
                  <td className="px-4 py-2 border-b">
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {formatDate(row.updatedAt)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Button
                      variant="outline"
                      className="mr-2 border-none shadow-none bg-transparent hover:bg-transparent"
                      onClick={() => handleEditClick(row)}
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.0399 3.02025L8.15988 10.9003C7.85988 11.2003 7.55988 11.7903 7.49988 12.2203L7.06988 15.2303C6.90988 16.3203 7.67988 17.0803 8.76988 16.9303L11.7799 16.5003C12.1999 16.4403 12.7899 16.1403 13.0999 15.8403L20.9799 7.96025C22.3399 6.60025 22.9799 5.02025 20.9799 3.02025C18.9799 1.02025 17.3999 1.66025 16.0399 3.02025Z"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.9099 4.15039C15.5799 6.54039 17.4499 8.41039 19.8499 9.09039"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 mr-2 border-none bg-transparent shadow-none hover:bg-transparent"
                      onClick={() => handleDeleteClick(row._id)}
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                      >
                        <path
                          opacity="0.4"
                          d="M17.5825 14.4064C17.5058 15.6596 17.4449 16.6541 17.3202 17.4484C17.1922 18.2631 16.9874 18.9415 16.5777 19.5349C16.2029 20.0778 15.7204 20.536 15.1608 20.8803C14.5491 21.2567 13.8661 21.4213 13.0531 21.5L6.92739 21.4999C6.1135 21.421 5.42972 21.2561 4.8176 20.879C4.25763 20.5341 3.77494 20.0751 3.40028 19.5313C2.99073 18.9369 2.78656 18.2575 2.65957 17.4417C2.53574 16.6462 2.47623 15.6503 2.40122 14.3953L1.75 3.5H18.25L17.5825 14.4064Z"
                          fill="#F34F4F"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.5 16.7148C7.08579 16.7148 6.75 16.3791 6.75 15.9648L6.75 9.96484C6.75 9.55063 7.08579 9.21484 7.5 9.21484C7.91421 9.21484 8.25 9.55063 8.25 9.96484L8.25 15.9648C8.25 16.3791 7.91421 16.7148 7.5 16.7148Z"
                          fill="#F34F4F"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.5 9.21484C12.9142 9.21484 13.25 9.55063 13.25 9.96484L13.25 15.9648C13.25 16.3791 12.9142 16.7148 12.5 16.7148C12.0858 16.7148 11.75 16.3791 11.75 15.9648L11.75 9.96484C11.75 9.55063 12.0858 9.21484 12.5 9.21484Z"
                          fill="#F34F4F"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.3473 0.0327679C11.9124 0.0833095 12.4435 0.255757 12.8996 0.595912C13.2369 0.847476 13.4712 1.15542 13.6714 1.48893C13.8569 1.79798 14.0437 2.1833 14.2555 2.6204L14.6823 3.5007H19C19.5523 3.5007 20 3.94842 20 4.5007C20 5.05299 19.5523 5.5007 19 5.5007C12.9998 5.5007 7.00019 5.5007 1 5.5007C0.447715 5.5007 0 5.05299 0 4.5007C0 3.94842 0.447715 3.5007 1 3.5007H5.40976L5.76556 2.72016C5.97212 2.26696 6.15403 1.86782 6.33676 1.54754C6.53387 1.20207 6.76721 0.882367 7.10861 0.620456C7.57032 0.266256 8.11215 0.0866864 8.68992 0.0340876C9.12492 -0.00551367 9.56344 -6.29583e-05 10 0.000638653C10.5108 0.00145956 10.97 -0.000980195 11.3473 0.0327679ZM7.60776 3.5007H12.4597C12.233 3.03331 12.088 2.73707 11.9566 2.5182C11.7643 2.19787 11.5339 2.05745 11.1691 2.02482C10.9098 2.00163 10.5719 2.0007 10.0345 2.0007C9.48371 2.0007 9.13697 2.00166 8.87124 2.02585C8.49714 2.05991 8.26389 2.20568 8.07391 2.53866C7.94941 2.75687 7.81387 3.04897 7.60776 3.5007Z"
                          fill="#F34F4F"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Quick Chat Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white rounded-2xl p-6">
          <DialogTitle className="text-2xl font-semibold mb-4">
            {editingId ? "Update Quick Chat" : "Add New Quick Chat"}
          </DialogTitle>
          <form onSubmit={handleSaveQuickChat}>
            <div>
              <label className="block text-sm mb-2 font-medium">
                Message Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your quick chat message..."
                className="w-full px-4 py-2 border rounded-md bg-[#F4F7FE] min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#0E7A60]"
                maxLength={500}
                disabled={submitting}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {content.length}/500 characters
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-4 mt-4">
              <div className="w-full flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-[#0E7A60] border border-[#0E7A60] hover:text-[#0E7A60]"
                  onClick={handleCloseDialog}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white flex-1"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {editingId ? "Updating..." : "Creating..."}
                    </>
                  ) : editingId ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white rounded-2xl p-6">
          <DialogTitle className="text-2xl font-semibold mb-4">
            Delete Quick Chat
          </DialogTitle>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this quick chat? This action cannot
            be undone.
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <div className="w-full flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-gray-600 border border-gray-300 hover:text-gray-600"
                onClick={handleCloseDeleteDialog}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white flex-1"
                onClick={handleDeleteQuickChat}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickChat;
