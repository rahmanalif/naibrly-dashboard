// import { Button } from "@/components/ui/button";
// import { Edit } from "lucide-react";
// import { Link } from "react-router-dom";

// const AboutUs = () => {
//   // Dummy paragraphs (these can later be fetched from an API or CMS)
//   const aboutParagraphs = [
//     "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.",
//     "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.",
//     "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magna convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultrices nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.",
//   ];

//   return (
//     <div className="font-sans pr-5">
//       {/* Header */}
//       <h2 className="text-xl sm:text-2xl font-bold mb-5 text-white bg-[#017783] p-5 rounded-md">
//         About Us
//       </h2>

//       {/* Edit Button */}
//       <div className="flex justify-end p-4">
//         <Link to="/dashboard/settings/editabout">
//           <Button className="bg-[#017783] hover:bg-[#015a63] text-white rounded-full flex items-center space-x-1 shadow-md">
//             <Edit className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//         </Link>
//       </div>

//       {/* About Content */}
//       <div className="space-y-6 px-3">
//         {aboutParagraphs.map((paragraph, index) => (
//           <p key={index} className="text-gray-700 leading-relaxed text-justify">
//             {paragraph}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


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

const AboutUs = () => {
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
    <div className="font-sans p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-black px-5 py-3 rounded-md">
          Update FAQ
        </h2> */}

        <h2 className="text-2xl sm:text-xl font-semibold text-black p-5 rounded-lg flex items-center">
          <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />
          Update FAQ
        </h2>

        {/* <Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-md shadow-md">
          + Add FAQ
        </Button> */}

        <AlertDialog>
          <AlertDialogTrigger><Button className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white rounded-md shadow-md">
            + Add FAQ
          </Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add new FAQ</AlertDialogTitle>
              <AlertDialogDescription>
                <form action="" className="flex flex-col gap-4">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Question</label>
                    <input type="text" placeholder="How to apply for a Campaign?" className="border p-2 bg-gray-100" />
                  </div>

                  <div className="flex flex-col gap-2">



                    <label htmlFor="">Answer</label>
                    <textarea rows="4" placeholder="Answer" className="bg-gray-100 p-5"></textarea>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel><button className="w-full">Cancel</button></AlertDialogCancel>
              <AlertDialogAction><button className="w-full">Suubmit</button></AlertDialogAction>
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
                className={`hover:bg-gray-100 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"
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

export default AboutUs;
