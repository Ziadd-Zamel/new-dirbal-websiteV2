"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { sendMessage } from "@/lib/actions/sendMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CommentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if comment and email are provided
    if (!comment.trim() || !email.trim()) {
      setShowErrorDialog(true);
      return;
    }

    setIsLoading(true);

    try {
      // Use the sendMessage server action
      const result = await sendMessage(email, comment, name);

      if (result.success) {
        setShowSuccessDialog(true);
        setComment("");
        setEmail("");
        setName("");
      } else {
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Comment send failed:", error);
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ direction: "rtl" }}
        className="mb-10 mt-24 w-full rounded-lg text-right text-white"
      >
        <h2 className="flex items-center gap-2 text-md font-semibold font-tajawal">
          <FaRegComment className="text-[#D9A760]" /> أضف تعليقاً
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
            className="mt-4 h-44 w-full bg-[#F2F2F2] p-3 text-base placeholder:text-base font-tajawal text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
            placeholder="نص التعليق"
            required
          />

          <div className="mt-4 flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-1/2 bg-[#F2F2F2] text-base placeholder:text-base font-tajawal p-2 text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
              placeholder="البريد الإلكتروني"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-1/2 bg-[#F2F2F2] text-base placeholder:text-base font-tajawal p-2 text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
              placeholder="الاسم (اختياري)"
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="saveData"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              disabled={isLoading}
              className="h-4 w-4 disabled:opacity-50"
            />
            <label htmlFor="saveData" className="font-tajawal text-sm">
              احفظ بياناتي على هذا المتصفح لتعليقات قادمة
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !comment.trim() || !email.trim()}
            className="mt-5 flex w-fit items-center gap-2 self-end justify-self-start rounded-[2px] bg-[#B5975C] px-2 py-1 font-tajawal text-sm text-white hover:bg-[#C18F59] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "جاري الإرسال..." : "تعليق"}
            <span className="">
              <LeftArrowIcon height={10} width={10} dark={false} />
            </span>
          </button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="mx-4 w-[350px] border-none py-10 px-10">
          <DialogHeader>
            <DialogTitle className="text-center font-tajawal text-xl font-medium text-[#B5975C]">
              شكراً لك
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="font-tajawal text-gray-300 text-sm">
              تم إرسال تعليقك بنجاح. شكراً لمشاركتك معنا!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="mx-4 w-[350px] border-none py-10 px-10">
          <DialogHeader>
            <DialogTitle className="text-center font-tajawal text-xl font-medium text-red-500">
              تنبيه
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="font-tajawal text-gray-300 text-sm">
              يرجى التأكد من إدخال التعليق والبريد الإلكتروني
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentForm;
