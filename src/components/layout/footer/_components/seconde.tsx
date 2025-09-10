"use client";
import Image from "next/image";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger, SiViber } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import {
  CustomDialog as Dialog,
  CustomDialogHeader as DialogHeader,
  CustomDialogTitle as DialogTitle,
} from "@/components/ui/custom-dialog";
import { subscribe } from "@/lib/actions/subscribe";

export default function Seconde() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await subscribe(email);

      if (response && response.success) {
        setShowDialog(true);
        setEmail("");
      } else {
        // Handle error case - show error dialog
        console.error("Subscription failed:", response?.message);
        setErrorMessage(response?.message || "فشل في الاشتراك");
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      // Handle unexpected errors
      setErrorMessage("فشل في الاشتراك");
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Share website functionality
  const handleShareWebsite = (
    platform: "facebook" | "messenger" | "twitter" | "whatsapp" | "viber"
  ) => {
    const websiteUrl = window.location.origin;
    const websiteName = "موقع دربال";
    const websiteDescription =
      "موقع دربال - مصدر موثوق للمعلومات الإسلامية والقانونية";

    try {
      switch (platform) {
        case "facebook":
          const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            websiteUrl
          )}&quote=${encodeURIComponent(websiteDescription)}`;
          window.open(facebookShareUrl, "_blank", "width=626,height=436");
          break;

        case "messenger":
          const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            websiteUrl
          )}&redirect_uri=${encodeURIComponent(websiteUrl)}`;
          window.open(messengerUrl, "_blank", "width=626,height=436");
          break;

        case "twitter":
          const twitterText = `${websiteName} - ${websiteDescription}`;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            twitterText
          )}&url=${encodeURIComponent(websiteUrl)}`;
          window.open(twitterUrl, "_blank", "width=550,height=420");
          break;

        case "whatsapp":
          const whatsappText = `*${websiteName}*\n\n${websiteDescription}\n\n${websiteUrl}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
            whatsappText
          )}`;
          window.open(whatsappUrl, "_blank");
          break;

        case "viber":
          const viberText = `${websiteName} - ${websiteDescription} ${websiteUrl}`;
          const viberUrl = `viber://forward?text=${encodeURIComponent(
            viberText
          )}`;
          window.open(viberUrl, "_blank");
          break;
      }
    } catch (error) {
      console.error("Share error:", error);
    }

    setShowShareDropdown(false);
  };

  return (
    <>
      <div className="flex w-full lg:border-x-3 border-[#21262C] flex-col space-y-4 py-10 text-right lg:w-[30%] lg:pb-0 lg:pl-5 lg:pr-5 lg:pt-4">
        <div className="items-cente mb-2 flex justify-start">
          <h3 className="font-tajawal text-lg font-[500] uppercase">
            شارك الصفحة بواسطة :
          </h3>
        </div>
        <div className="flex w-full items-center justify-start gap-1 space-x-3">
          <div
            className="cursor-pointer transition-colors hover:text-[#B5975C]"
            onClick={() => handleShareWebsite("facebook")}
            title="مشاركة الصفحة على فيسبوك"
          >
            <FaFacebookF size={"25px"} />
          </div>
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <div
            className="cursor-pointer transition-colors hover:text-[#B5975C]"
            onClick={() => handleShareWebsite("messenger")}
            title="مشاركة الصفحة على ماسنجر"
          >
            <SiMessenger size={"25px"} />
          </div>
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <div
            className="cursor-pointer transition-colors hover:text-[#B5975C]"
            onClick={() => handleShareWebsite("twitter")}
            title="مشاركة الصفحة على تويتر"
          >
            <BsTwitterX size={"25px"} />
          </div>
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <div
            className="cursor-pointer transition-colors hover:text-[#B5975C]"
            onClick={() => handleShareWebsite("viber")}
            title="مشاركة الصفحة على فايبر"
          >
            <SiViber size={"25px"} />
          </div>
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <div
            className="cursor-pointer transition-colors hover:text-[#B5975C]"
            onClick={() => handleShareWebsite("whatsapp")}
            title="مشاركة الصفحة على واتساب"
          >
            <FaWhatsapp size={"30px"} />
          </div>
        </div>
        <div className="flex w-full justify-start">
          <div className="mb-1 mt-3 flex h-[2px] w-[80%] items-start justify-start bg-[#21262C] md:w-[40%] lg:w-full" />
        </div>
        <form className=" w-full mt-3" onSubmit={handleSubmit}>
          <p className="text-right font-tajawal text-lg">
            اشترك في نشرة أخبار الموقع
          </p>
          <p className="mt-2 text-right font-tajawal text-[14px]">
            لاستقبال إشعارات المواضيع الجديدة، يرجى الاشتراك
          </p>
          <div className="mt-4 flex w-full items-center rounded border border-[#474747] bg-[#C4C4C426] px-2 py-1">
            <input
              type="email"
              placeholder=" *بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="-mt-[2px] w-full text-sm text-gray-300 font-tajawal bg-transparent text-right placeholder:font-tajawal placeholder:text-sm focus:border-amber-600 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !email}
              className="disabled:opacity-50"
            >
              <Image
                src="/assets/send.svg"
                alt="send"
                width={20}
                height={20}
                className={isLoading ? "animate-pulse" : ""}
              />
            </button>
          </div>
        </form>
        <div className="flex w-full justify-start mt-[35px]">
          <Image
            src="/assets/QRCode.png"
            alt="logo"
            width={200}
            height={0}
            className="justify-self-end"
          />
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
        className="mx-4 w-[350px] border-none py-10 px-10"
      >
        <DialogHeader>
          <DialogTitle className="text-center font-tajawal text-xl font-medium text-[#B5975C]">
            شكراً
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="font-tajawal text-gray-300 light:text-black text-sm">
            اشتركتَ بنجاح في نشرة أخبار موقع د. دربال. بإذنه تعالى، ستصلك
            إشعارات الموضوعات الجديدة عبر حسابك على فيسبوك والبريد الإلكتروني.{" "}
          </p>
        </div>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        className="mx-4 w-[350px] border-none py-10 px-10"
      >
        <DialogHeader>
          <DialogTitle className="text-center font-tajawal text-xl font-medium text-red-500">
            خطأ
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="font-tajawal text-gray-300 light:text-black text-sm">
            {errorMessage}
          </p>
        </div>
      </Dialog>
    </>
  );
}
