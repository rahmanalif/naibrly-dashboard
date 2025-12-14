import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { createTicket, validateTicketData } from "@/services/supportService";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    priority: "Medium",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validation = validateTicketData(formData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError);
      return;
    }

    try {
      setLoading(true);
      const response = await createTicket(formData);

      if (response.success) {
        setTicketId(response.data.ticketId);
        setSubmitted(true);
        toast.success("Support ticket submitted successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          description: "",
          priority: "Medium",
          category: "",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit ticket. Please try again.");
      console.error("Error submitting ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setTicketId("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Ticket Submitted!</h2>
              <p className="text-gray-600">
                Your support ticket has been created successfully.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Your Ticket ID:</p>
                <p className="text-2xl font-bold text-green-700">{ticketId}</p>
              </div>
              <p className="text-sm text-gray-500">
                We'll respond to your ticket at <strong>{formData.email}</strong> as soon as possible.
              </p>
              <Button
                onClick={resetForm}
                className="w-full bg-[#0E7A60] hover:bg-[#0E7A60]/90"
              >
                Submit Another Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="bg-[#0E7A60] text-white rounded-t-lg">
          <CardTitle className="text-2xl">Contact Support</CardTitle>
          <p className="text-sm text-gray-100 mt-2">
            Need help? Submit a support ticket and our team will get back to you.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Priority and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <Label htmlFor="priority" className="text-gray-700 font-medium">
                  Priority
                </Label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-gray-700 font-medium">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="Billing Issue">Billing Issue</option>
                  <option value="Service Request">Service Request</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject" className="text-gray-700 font-medium">
                Subject <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent"
                placeholder="Brief summary of your issue"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent resize-none"
                placeholder="Please describe your issue in detail..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters required
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0E7A60] hover:bg-[#0E7A60]/90 text-white py-2 rounded-md font-medium transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You'll receive a ticket ID for tracking</li>
              <li>• Our support team will review your ticket</li>
              <li>• We'll respond via email within 24-48 hours</li>
              <li>• You can check ticket status in your account</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSupport;
