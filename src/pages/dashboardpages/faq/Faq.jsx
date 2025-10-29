import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

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
  // Dummy FAQ data (replace with API later)
  const faqs = [
    {
      id: 1,
      user: "Leslie Alexander",
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...",
    },
    {
      id: 2,
      user: "Leslie Alexander",
      question: "Fringilla a cras vitae orci?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...",
    },
    {
      id: 3,
      user: "Leslie Alexander",
      question: "Egestas duis id nisl sed ante?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...",
    },
  ];

  const navigate = useNavigate()

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        

        <h2 className="text-2xl sm:text-xl font-semibold text-black rounded-lg flex items-center">
          <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />
          Update FAQ
        </h2>

       

        <AlertDialog>
          <AlertDialogTrigger><Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-md shadow-md ">
            + Add FAQ
          </Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-[#01010B] lg:text-[2rem]'>Add new FAQ</AlertDialogTitle>
              <AlertDialogDescription>
                <form action="" className="flex flex-col gap-4">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm text-[#5B5B5F] font-medium">Question</label>
                    <input type="text" placeholder="How to apply for a Campaign?" className="border p-2 bg-[#E6E6E7] rounded-sm" />
                  </div>

                  <div className="flex flex-col gap-2">



                    <label htmlFor="" className="text-sm text-[#5B5B5F] font-medium">Answer</label>
                    <textarea rows="4" placeholder="Answer" className="border p-2 bg-[#E6E6E7] rounded-sm" ></textarea>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="">

              <div className="w-full flex flex-row gap-3">
                <AlertDialogCancel className="flex-1/2 text-[#0E7A60] lg:text-[1rem] border border-[#0E7A60] hover:text-[#0E7A60] hover:border-[#0E7A60] hover:bg-transparent font-intertext"><button className="">Cancel</button></AlertDialogCancel>
                <AlertDialogAction className="flex-1/2 text-white bg-[#0E7A60] hover:bg-[#0E7A60] font-intertext"><button className="">Submit</button></AlertDialogAction>
              </div>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* FAQ Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Questions</th>
              <th className="py-3 px-4 border-b">Answer</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {faqs.map((faq, index) => (
              <tr
                key={faq.id}
                className={`hover:bg-[#0E7A601A] ${index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="py-3 px-4 border-b">{faq.id}</td>
                <td className="py-3 px-4 border-b">{faq.user}</td>
                <td className="py-3 px-4 border-b text-gray-700">
                  {faq.answer}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <div className="space-x-3">
                    <Link to={`/dashboard/settings/editfaq/${faq.id}`}>
                      <button className="text-[#017783] hover:text-[#015a63]">
                        <Edit className="h-5 w-5" />
                      </button>
                    </Link>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Faq;