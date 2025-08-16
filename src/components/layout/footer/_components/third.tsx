/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { sendContact } from "@/lib/actions/sendContact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Third() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if message is empty
    if (!message.trim()) {
      setShowErrorDialog(true);
      return;
    }

    setIsLoading(true);

    try {
      // Use the contact server action
      const result = await sendContact(email, message);

      if (result.success) {
        setShowSuccessDialog(true);
        setEmail("");
        setMessage("");
      } else {
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Message send failed:", error);
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full space-y-5 py-10 lg:w-[30%] lg:pb-0 lg:pr-4 lg:pt-4">
        <form
          onSubmit={handleSubmit}
          style={{ direction: "rtl" }}
          className="flex flex-col gap-2"
          dir="rtl"
        >
          <div className="flex items-center gap-3">
            <MdEmail className="mt-2 text-xl text-[#C18F59]" />
            <h3 className="font-tajawal text-lg">تواصل</h3>
          </div>
          <div className="flex w-full items-center rounded border border-[#474747] bg-[#C4C4C426] px-2 py-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              style={{ direction: "rtl" }}
              placeholder=" بريدك الإلكتروني"
              className="-mt-[2px] w-full bg-transparent text-right placeholder:font-tajawal placeholder:text-sm placeholder:text-gray-500 focus:border-amber-600 focus:outline-none disabled:opacity-50"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="w-full mt-[18px] resize-none rounded-[2px] border border-gray-700 bg-[#474747] px-2 placeholder:font-tajawal placeholder:text-sm placeholder:text-gray-500 disabled:opacity-50"
            placeholder="اكتب رسالتك إلى إدارة الموقع"
            rows={12}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-[34px] font-tajawal flex w-fit items-center gap-5 justify-self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 text-lg text-white disabled:opacity-50 hover:bg-[#A08650] transition-colors"
          >
            {isLoading ? "جاري الإرسال..." : "إرسال"}
            <span className="mt-1">
              <LeftArrowIcon height={12} width={12} dark={false} />
            </span>
          </button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="mx-4 w-[300px] py-10 px-10 border-none">
          <DialogHeader>
            <DialogTitle className=" sr-only text-center font-tajawal text-xl font-bold text-[#D4AF37]">
              تم إرسال رسالتك
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="font-tajawal text-gray-300 text-sm">
              {" "}
              استلمنا تعليقك. شكراً لمشاركتك.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="mx-4 w-[300px] py-10 px-10 border-none">
          <DialogHeader>
            <DialogTitle className="text-center font-tajawal text-xl font-bold text-red-500">
              معذرة
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="font-tajawal text-gray-300">
              لا يمكنك إرسال رسالة فارغة
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
