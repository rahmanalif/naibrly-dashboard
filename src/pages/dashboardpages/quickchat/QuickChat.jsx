


// // import React from 'react';

// // import { CirclePlus, Edit, Trash2 } from 'lucide-react'; // Import icons from lucide-react
// // import { Button } from '@/components/ui/button';

// // const QuickChat = () => {
// //     const tableData = [
// //         { id: 1, messageText: 'How long does this job usually take?', createdDate: '12/4/17', lastUpdate: '11/7/16' },
// //         { id: 2, messageText: 'Do I need to do anything to prepare before you arrive?', createdDate: '10/28/12', lastUpdate: '5/7/16' },
// //         { id: 3, messageText: 'Do you bring your own tools and supplies, or do I need to provide anything?', createdDate: '6/21/19', lastUpdate: '8/21/15' },
// //         { id: 4, messageText: 'Can you provide me an update when you will arrive?', createdDate: '1/31/14', lastUpdate: '6/19/14' },
// //         { id: 5, messageText: 'Can you message me when the job is complete?', createdDate: '2/11/12', lastUpdate: '12/10/13' },
// //     ];

// //     return (
// //         <div>
// //             <div className='flex items-center justify-end'>
// //                 <button className='flex items-center gap-2 bg-white px-4 rounded-lg lg:text-[14px] font-semibold py-2'> <span><CirclePlus /></span> Add Quick Chat</button>
// //             </div>
// //             <div className="overflow-x-auto p-4 bg-white rounded-2xl mt-4">

// //                 <table className="min-w-full text-left table-auto">
// //                     <thead className='bg-gray-100 rounded-2xl'>
// //                         <tr className=''>
// //                             <th className="px-4 py-2 border-b">#</th>
// //                             <th className="px-4 py-2 border-b">Message Text</th>
// //                             <th className="px-4 py-2 border-b">Created Date</th>
// //                             <th className="px-4 py-2 border-b">Last Update</th>
// //                             <th className="px-4 py-2 border-b">Action</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {tableData.map((row) => (
// //                             <tr key={row.id} className='hover:bg-[#0E7A601A]/90'>
// //                                 <td className="px-4 py-2 border-b">{row.id}</td>
// //                                 <td className="px-4 py-2 border-b">{row.messageText}</td>
// //                                 <td className="px-4 py-2 border-b">{row.createdDate}</td>
// //                                 <td className="px-4 py-2 border-b">{row.lastUpdate}</td>
// //                                 <td className="px-4 py-2 border-b">
// //                                     <Button variant="outline" className="mr-2 border-none shadow-none bg-transparent hover:bg-transparent">
// //                                         <Edit className="h-5 w-5" />
// //                                     </Button>
// //                                     <Button variant="outline" className="text-red-500 mr-2 border-none bg-transparent shadow-none hover:bg-transparent">
// //                                         <Trash2 className="h-5 w-5" />
// //                                     </Button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default QuickChat;


// import React, { useState } from 'react';
// import { CirclePlus, Edit, Trash2 } from 'lucide-react'; // Import icons from lucide-react
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '@shadcn/ui'; // Import Shadcn Dialog components

// const QuickChat = () => {
//     const [open, setOpen] = useState(false); // State to control modal visibility

//     const tableData = [
//         { id: 1, messageText: 'How long does this job usually take?', createdDate: '12/4/17', lastUpdate: '11/7/16' },
//         { id: 2, messageText: 'Do I need to do anything to prepare before you arrive?', createdDate: '10/28/12', lastUpdate: '5/7/16' },
//         { id: 3, messageText: 'Do you bring your own tools and supplies, or do I need to provide anything?', createdDate: '6/21/19', lastUpdate: '8/21/15' },
//         { id: 4, messageText: 'Can you provide me an update when you will arrive?', createdDate: '1/31/14', lastUpdate: '6/19/14' },
//         { id: 5, messageText: 'Can you message me when the job is complete?', createdDate: '2/11/12', lastUpdate: '12/10/13' },
//     ];

//     return (
//         <div>
//             <div className="flex items-center justify-end">
//                 <Dialog open={open} onOpenChange={setOpen}>
//                     <DialogTrigger asChild>
//                         <button className='flex items-center gap-2 bg-white px-4 rounded-lg lg:text-[14px] font-semibold py-2'>
//                             <span><CirclePlus /></span> Add Quick Chat
//                         </button>
//                     </DialogTrigger>

//                     <DialogContent className="bg-white rounded-2xl p-6">
//                         <DialogTitle className="text-2xl font-semibold mb-4">Add New Quick Chat</DialogTitle>
//                         <div>
//                             <label className="block text-sm mb-2">Question</label>
//                             <input
//                                 type="text"
//                                 placeholder="How to apply for a campaign?"
//                                 className="w-full px-4 py-2 border rounded-md bg-[#F4F7FE]"
//                             />
//                         </div>
//                         <DialogFooter className="flex justify-end gap-4 mt-4">
//                             <div className='w-full flex items-center gap-4'>
//                                 <Button variant="outline" className="flex-1 text-[#0E7A60] border border-[#0E7A60] hover:text-[#0E7A60]" onClick={() => setOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white flex-1"
//                                 onClick={() => {
//                                     // Handle save action here
//                                     setOpen(false);
//                                 }}
//                             >
//                                 Save
//                             </Button>
//                             </div>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </div>

//             <div className="overflow-x-auto p-4 bg-white rounded-2xl mt-4">
//                 <table className="min-w-full text-left table-auto">
//                     <thead className="bg-gray-100 rounded-2xl">
//                         <tr>
//                             <th className="px-4 py-2 border-b">#</th>
//                             <th className="px-4 py-2 border-b">Message Text</th>
//                             <th className="px-4 py-2 border-b">Created Date</th>
//                             <th className="px-4 py-2 border-b">Last Update</th>
//                             <th className="px-4 py-2 border-b">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((row) => (
//                             <tr key={row.id} className="hover:bg-[#0E7A601A]/90">
//                                 <td className="px-4 py-2 border-b">{row.id}</td>
//                                 <td className="px-4 py-2 border-b">{row.messageText}</td>
//                                 <td className="px-4 py-2 border-b">{row.createdDate}</td>
//                                 <td className="px-4 py-2 border-b">{row.lastUpdate}</td>
//                                 <td className="px-4 py-2 border-b">
//                                     <Button variant="outline" className="mr-2 border-none shadow-none bg-transparent hover:bg-transparent">
//                                         <Edit className="h-5 w-5" />
//                                     </Button>
//                                     <Button variant="outline" className="text-red-500 mr-2 border-none bg-transparent shadow-none hover:bg-transparent">
//                                         <Trash2 className="h-5 w-5" />
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default QuickChat;


import React, { useState } from 'react';
import { CirclePlus, Edit, Trash2 } from 'lucide-react'; // Import icons from lucide-react
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Shadcn Dialog components

const QuickChat = () => {
    const [open, setOpen] = useState(false); // State to control modal visibility
    const [editMessage, setEditMessage] = useState(''); // State to hold the message being edited
    const [editMessageId, setEditMessageId] = useState(null); // To identify which message is being edited

    const tableData = [
        { id: 1, messageText: 'How long does this job usually take?', createdDate: '12/4/17', lastUpdate: '11/7/16' },
        { id: 2, messageText: 'Do I need to do anything to prepare before you arrive?', createdDate: '10/28/12', lastUpdate: '5/7/16' },
        { id: 3, messageText: 'Do you bring your own tools and supplies, or do I need to provide anything?', createdDate: '6/21/19', lastUpdate: '8/21/15' },
        { id: 4, messageText: 'Can you provide me an update when you will arrive?', createdDate: '1/31/14', lastUpdate: '6/19/14' },
        { id: 5, messageText: 'Can you message me when the job is complete?', createdDate: '2/11/12', lastUpdate: '12/10/13' },
    ];

    const handleEditClick = (messageText, id) => {
        setEditMessage(messageText); // Set the current message text
        setEditMessageId(id); // Set the message ID
        setOpen(true); // Open the dialog
    };

    return (
        <div>
            <div className="flex items-center justify-end">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 bg-white px-4 rounded-lg lg:text-[14px] font-semibold py-2">
                            <span><CirclePlus /></span> Add Quick Chat
                        </button>
                    </DialogTrigger>

                    <DialogContent className="bg-white rounded-2xl p-6">
                        <DialogTitle className="text-2xl font-semibold mb-4">{editMessageId ? 'Update Quick Chat' : 'Add New Quick Chat'}</DialogTitle>
                        <div>
                            <label className="block text-sm mb-2">Question</label>
                            <input
                                type="text"
                                value={editMessage} // Set value from state
                                onChange={(e) => setEditMessage(e.target.value)} // Update message on input change
                                placeholder="How to apply for a campaign?"
                                className="w-full px-4 py-2 border rounded-md bg-[#F4F7FE]"
                            />
                        </div>
                        <DialogFooter className="flex justify-end gap-4 mt-4">
                            <div className="w-full flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 text-[#0E7A60] border border-[#0E7A60] hover:text-[#0E7A60]"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white flex-1"
                                    onClick={() => {
                                        // Handle save action here, like updating the message
                                        setOpen(false); // Close dialog after saving
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto p-4 bg-white rounded-2xl mt-4">
                <table className="min-w-full text-left table-auto">
                    <thead className="bg-gray-100 rounded-2xl">
                        <tr>
                            <th className="px-4 py-2 border-b">#</th>
                            <th className="px-4 py-2 border-b">Message Text</th>
                            <th className="px-4 py-2 border-b">Created Date</th>
                            <th className="px-4 py-2 border-b">Last Update</th>
                            <th className="px-4 py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row) => (
                            <tr key={row.id} className="hover:bg-[#0E7A601A]">
                                <td className="px-4 py-2 border-b">{row.id}</td>
                                <td className="px-4 py-2 border-b">{row.messageText}</td>
                                <td className="px-4 py-2 border-b">{row.createdDate}</td>
                                <td className="px-4 py-2 border-b">{row.lastUpdate}</td>
                                <td className="px-4 py-2 border-b">
                                    <Button
                                        variant="outline"
                                        className="mr-2 border-none shadow-none bg-transparent hover:bg-transparent"
                                        onClick={() => handleEditClick(row.messageText, row.id)}
                                        title="Edit"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-red-500 mr-2 border-none bg-transparent shadow-none hover:bg-transparent"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuickChat;
