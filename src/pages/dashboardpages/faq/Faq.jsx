import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from "../../../services/settingsService";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Faq = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await getAllFAQs();
      if (response.success) {
        setFaqs(response.data.faqs || response.data || []);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error(error?.message || 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async () => {
    try {
      if (!formData.question.trim()) {
        toast.error('Question is required');
        return;
      }
      if (!formData.answer.trim()) {
        toast.error('Answer is required');
        return;
      }

      const response = await createFAQ(formData);
      if (response.success) {
        toast.success('FAQ added successfully!');
        setFormData({ question: "", answer: "" });
        setIsAddDialogOpen(false);
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast.error(error?.message || 'Failed to add FAQ');
    }
  };

  const handleEditFAQ = async () => {
    try {
      if (!formData.question.trim()) {
        toast.error('Question is required');
        return;
      }
      if (!formData.answer.trim()) {
        toast.error('Answer is required');
        return;
      }

      const response = await updateFAQ(editingFaq._id || editingFaq.id, formData);
      if (response.success) {
        toast.success('FAQ updated successfully!');
        setFormData({ question: "", answer: "" });
        setIsEditDialogOpen(false);
        setEditingFaq(null);
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error(error?.message || 'Failed to update FAQ');
    }
  };

  const handleDeleteFAQ = async (id) => {
    try {
      const response = await deleteFAQ(id);
      if (response.success) {
        toast.success('FAQ deleted successfully!');
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error(error?.message || 'Failed to delete FAQ');
    }
  };

  const openEditDialog = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        

        <h2 className="text-2xl sm:text-xl font-semibold text-black rounded-lg flex items-center">
          <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />
          Update FAQ
        </h2>

       

        <AlertDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-md shadow-md ">
              + Add FAQ
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-[#01010B] lg:text-[2rem]'>Add new FAQ</AlertDialogTitle>
              <AlertDialogDescription>
                <form onSubmit={(e) => { e.preventDefault(); handleAddFAQ(); }} className="flex flex-col gap-4">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="add-question" className="text-sm text-[#5B5B5F] font-medium">Question</label>
                    <input
                      id="add-question"
                      type="text"
                      placeholder="How to apply for a Campaign?"
                      className="border p-2 bg-[#E6E6E7] rounded-sm"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="add-answer" className="text-sm text-[#5B5B5F] font-medium">Answer</label>
                    <textarea
                      id="add-answer"
                      rows="4"
                      placeholder="Answer"
                      className="border p-2 bg-[#E6E6E7] rounded-sm"
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    ></textarea>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="">

              <div className="w-full flex flex-row gap-3">
                <AlertDialogCancel
                  className="flex-1/2 text-[#0E7A60] lg:text-[1rem] border border-[#0E7A60] hover:text-[#0E7A60] hover:border-[#0E7A60] hover:bg-transparent font-intertext"
                  onClick={() => setFormData({ question: "", answer: "" })}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="flex-1/2 text-white bg-[#0E7A60] hover:bg-[#0E7A60] font-intertext"
                  onClick={handleAddFAQ}
                >
                  Submit
                </AlertDialogAction>
              </div>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit FAQ Dialog */}
        <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-[#01010B] lg:text-[2rem]'>Edit FAQ</AlertDialogTitle>
              <AlertDialogDescription>
                <form onSubmit={(e) => { e.preventDefault(); handleEditFAQ(); }} className="flex flex-col gap-4">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="edit-question" className="text-sm text-[#5B5B5F] font-medium">Question</label>
                    <input
                      id="edit-question"
                      type="text"
                      placeholder="How to apply for a Campaign?"
                      className="border p-2 bg-[#E6E6E7] rounded-sm"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="edit-answer" className="text-sm text-[#5B5B5F] font-medium">Answer</label>
                    <textarea
                      id="edit-answer"
                      rows="4"
                      placeholder="Answer"
                      className="border p-2 bg-[#E6E6E7] rounded-sm"
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    ></textarea>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="">

              <div className="w-full flex flex-row gap-3">
                <AlertDialogCancel
                  className="flex-1/2 text-[#0E7A60] lg:text-[1rem] border border-[#0E7A60] hover:text-[#0E7A60] hover:border-[#0E7A60] hover:bg-transparent font-intertext"
                  onClick={() => {
                    setFormData({ question: "", answer: "" });
                    setEditingFaq(null);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="flex-1/2 text-white bg-[#0E7A60] hover:bg-[#0E7A60] font-intertext"
                  onClick={handleEditFAQ}
                >
                  Update
                </AlertDialogAction>
              </div>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* FAQ Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No FAQs found. Click "Add FAQ" to create one.</div>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4 border-b">#</th>
                <th className="py-3 px-4 border-b">Questions</th>
                <th className="py-3 px-4 border-b">Answer</th>
                <th className="py-3 px-4 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {faqs.map((faq, index) => (
                <tr
                  key={faq._id || faq.id}
                  className={`hover:bg-[#0E7A601A] ${index % 2 === 1 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b font-medium">{faq.question}</td>
                  <td className="py-3 px-4 border-b text-gray-700">
                    {faq.answer}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => openEditDialog(faq)}
                        className="text-[#0E7A60] hover:text-[#015a63]"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this FAQ.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteFAQ(faq._id || faq.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Faq;