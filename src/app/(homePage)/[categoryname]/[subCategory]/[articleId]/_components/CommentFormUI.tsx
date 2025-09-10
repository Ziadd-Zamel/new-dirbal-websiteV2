"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { sendMessage } from "@/lib/actions/sendMessage";
import {
  CustomDialog,
  CustomDialogHeader,
  CustomDialogTitle,
} from "@/components/ui/custom-dialog";

interface SavedUserData {
  email: string;
  name: string;
}

const CommentForm = ({ uuid }: { uuid: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const STORAGE_KEY = "commentFormUserData";

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData: SavedUserData = JSON.parse(savedData);
        setEmail(parsedData.email || "");
        setName(parsedData.name || "");
        setIsChecked(true); // If data exists, checkbox should be checked
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  // Save data to localStorage when checkbox is checked and form is submitted
  const saveUserData = () => {
    if (isChecked && email.trim()) {
      try {
        const dataToSave: SavedUserData = {
          email: email.trim(),
          name: name.trim(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  // Remove data from localStorage when checkbox is unchecked
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (!newCheckedState) {
      // If unchecking, remove saved data
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Error removing saved data:", error);
      }
    }
  };

  const handleCloseErrorDialog = (open: boolean) => {
    setShowErrorDialog(open);
    if (!open) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if comment and email are provided
    if (!comment.trim() || !email.trim()) {
      setErrorMessage("يرجى التأكد من إدخال التعليق والبريد الإلكتروني");
      setShowErrorDialog(true);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("يرجى إدخال بريد إلكتروني صحيح");
      setShowErrorDialog(true);
      return;
    }

    setIsLoading(true);

    try {
      // Use the sendMessage server action
      const result = await sendMessage(email, comment, name, uuid);

      if (result.success) {
        // Save user data if checkbox is checked
        saveUserData();

        setShowSuccessDialog(true);
        setComment(""); // Only clear comment, keep user data if saved

        // Only clear user data if checkbox is not checked
        if (!isChecked) {
          setEmail("");
          setName("");
        }
      } else {
        setErrorMessage("حدث خطأ في إرسال التعليق. يرجى المحاولة مرة أخرى");
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Comment send failed:", error);
      setErrorMessage(
        "حدث خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى"
      );
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ direction: "rtl" }}
        className="mb-10 mt-24 w-full rounded-lg text-right text-white light:text-black"
      >
        <h2 className="flex items-center gap-2 text-md font-semibold font-tajawal">
          <FaRegComment className="text-[#D9A760]" /> أضف تعليقاً
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
            className="mt-4 h-44 w-full bg-[#F2F2F2] light:bg-white p-3 text-base placeholder:text-base font-tajawal text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
            placeholder="نص التعليق"
            required
          />

          <div className="mt-4 flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-1/2 bg-[#F2F2F2] light:bg-white text-base placeholder:text-base font-tajawal p-2 text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
              placeholder="البريد الإلكتروني"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-1/2 bg-[#F2F2F2] light:bg-white text-base placeholder:text-base font-tajawal p-2 text-black placeholder:font-tajawal focus:outline-none disabled:opacity-50"
              placeholder="الاسم (اختياري)"
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="saveData"
              checked={isChecked}
              onChange={handleCheckboxChange}
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
      <CustomDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      >
        <CustomDialogHeader>
          <CustomDialogTitle className="text-center font-tajawal text-xl font-medium text-[#B5975C]">
            شكراً لك
          </CustomDialogTitle>
        </CustomDialogHeader>
        <div className="text-center">
          <p className="font-tajawal text-gray-300 light:text-black py-8 text-sm">
            تم إرسال تعليقك بنجاح. شكراً لمشاركتك معنا!
          </p>
        </div>
      </CustomDialog>

      {/* Error Dialog */}
      <CustomDialog
        open={showErrorDialog}
        onOpenChange={handleCloseErrorDialog}
      >
        <CustomDialogHeader>
          <CustomDialogTitle className="text-center font-tajawal text-xl font-medium text-red-500">
            تنبيه
          </CustomDialogTitle>
        </CustomDialogHeader>
        <div className="text-center py-8">
          <p className="font-tajawal text-gray-300 text-sm">{errorMessage}</p>
        </div>
      </CustomDialog>
    </>
  );
};

export default CommentForm;
