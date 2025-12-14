import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, User, Loader2, Plus, MessageCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  getMyTickets,
  addUserReplyToTicket,
  formatTicketTime,
  getStatusColors
} from "@/services/supportService";

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Reply state
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filter state
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch user's tickets
  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (statusFilter) params.status = statusFilter;

      const response = await getMyTickets(params);

      if (response.success) {
        setTickets(response.data.tickets);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch your tickets');
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMyTickets();
  }, [currentPage, itemsPerPage, statusFilter]);

  const getStatusBadge = (status) => {
    const colors = getStatusColors(status);
    return (
      <Badge className={`${colors.bg} ${colors.text} ${colors.hover}`}>
        {status}
      </Badge>
    );
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setOpenDialog(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setSendingReply(true);
      const response = await addUserReplyToTicket(selectedTicket._id, {
        message: replyMessage.trim()
      });

      if (response.success) {
        toast.success("Reply sent successfully");
        setReplyMessage("");

        // Update the selected ticket with new reply
        setSelectedTicket(response.data);

        // Refresh tickets list
        fetchMyTickets();
      }
    } catch (error) {
      toast.error(error.message || "Failed to send reply");
      console.error("Error sending reply:", error);
    } finally {
      setSendingReply(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm border rounded-xl">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>My Support Tickets</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                View and manage your support tickets
              </p>
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Status</option>
                <option value="Unsolved">Unsolved</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>

              <Button
                onClick={() => navigate("/contact-support")}
                className="bg-[#0E7A60] hover:bg-[#0E7A60]/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto mt-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60]" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No tickets found</p>
                <Button
                  onClick={() => navigate("/contact-support")}
                  className="bg-[#0E7A60] hover:bg-[#0E7A60]/90"
                >
                  Create Your First Ticket
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-gray-500">
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow
                      key={ticket._id}
                      className="hover:bg-[#0E7A601A] cursor-pointer"
                      onClick={() => handleTicketClick(ticket)}
                    >
                      <TableCell className="font-medium">{ticket.ticketId}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{ticket.category || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={
                          ticket.priority === 'High' || ticket.priority === 'Urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }>
                          {ticket.priority || 'Medium'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatTicketTime(ticket.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {getStatusBadge(ticket.status)} <ChevronDown size={14} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination footer */}
          {!loading && tickets.length > 0 && (
            <div className="flex justify-end items-center mt-4 text-sm text-gray-500 gap-5">
              <div className="flex items-center gap-2">
                Rows per page:
                <select
                  className="border rounded-md px-2 py-1"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex flex-row items-center gap-3">
                <p>Page {currentPage} of {totalPages}</p>
                <button
                  className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </CardContent>

        {/* Ticket Detail Dialog */}
        {selectedTicket && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <button className="hidden">Open Dialog</button>
            </DialogTrigger>

            <DialogContent className="w-full md:max-w-5xl lg:max-w-7xl p-8 bg-white rounded-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex justify-between items-center bg-[#0E7A601A]/90 py-3 px-4 rounded-sm">
                  <DialogTitle>
                    <span className="font-bold">Ticket #{selectedTicket.ticketId}</span> - {selectedTicket.subject}
                  </DialogTitle>
                  {getStatusBadge(selectedTicket.status)}
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Left Section - Messages */}
                <div className="col-span-2 space-y-4">
                  {/* Original Message */}
                  <div className="p-6 bg-[#F4F7FE] shadow-sm rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <User size={32} className="text-[#0E7A60] bg-white rounded-full p-1"/>
                      <div>
                        <p className="font-medium text-lg">{selectedTicket.name}</p>
                        <p className="text-sm text-gray-500">{formatTicketTime(selectedTicket.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>

                    {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-700 mb-2">Attachments:</h5>
                        <div className="space-y-1">
                          {selectedTicket.attachments.map((url, index) => (
                            <a
                              key={index}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline block"
                            >
                              Attachment {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Replies Section */}
                  {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Replies</h4>
                      {selectedTicket.replies.map((reply, index) => (
                        <div key={index} className="p-4 bg-white border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <User size={20} className="text-gray-600" />
                            <span className="font-medium">{reply.author}</span>
                            <span className="text-sm text-gray-500">
                              {formatTicketTime(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  {selectedTicket.status !== 'Resolved' && (
                    <div className="p-4 bg-gray-50 border rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">Add Reply</h4>
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your message here..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0E7A60] focus:border-transparent resize-none"
                      />
                      <Button
                        onClick={handleSendReply}
                        disabled={sendingReply || !replyMessage.trim()}
                        className="mt-3 bg-[#0E7A60] hover:bg-[#0E7A60]/90"
                      >
                        {sendingReply ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Reply
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {selectedTicket.status === 'Resolved' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                      <p className="text-green-700 font-medium">
                        This ticket has been resolved
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Section - Info */}
                <div className="col-span-1 space-y-4 p-6 bg-[#EBEBEB] shadow-sm rounded-lg h-fit">
                  <h4 className="font-semibold text-gray-800">Ticket Information</h4>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span> {getStatusBadge(selectedTicket.status)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Priority:</span>{' '}
                    <Badge className={selectedTicket.priority === 'High' || selectedTicket.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}>
                      {selectedTicket.priority || 'Medium'}
                    </Badge>
                  </p>
                  {selectedTicket.category && (
                    <p className="text-gray-700">
                      <span className="font-medium">Category:</span> {selectedTicket.category}
                    </p>
                  )}
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {selectedTicket.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Created:</span> {formatTicketTime(selectedTicket.createdAt)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Last Updated:</span> {formatTicketTime(selectedTicket.updatedAt)}
                  </p>
                  {selectedTicket.solvedDate && (
                    <p className="text-gray-700">
                      <span className="font-medium">Solved:</span> {formatTicketTime(selectedTicket.solvedDate)}
                    </p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </div>
  );
};

export default MyTickets;
