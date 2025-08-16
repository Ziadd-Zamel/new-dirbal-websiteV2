/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { SiViber } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Seconde() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setIsLoading(true);

    try {
      // Fake endpoint - replace with your actual endpoint
      const response = await fetch("/api//subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setShowDialog(true);
      if (response.ok) {
        setShowDialog(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col space-y-4 py-10 text-right lg:w-[30%] lg:pb-0 lg:pl-5 lg:pr-5 lg:pt-4">
        <div className="items-cente mb-2 flex justify-start">
          <h3 className="font-tajawal text-lg font-[500] uppercase">
            شارك الصفحة بواسطة :
          </h3>
        </div>
        <div className="flex w-full items-center justify-start gap-1 space-x-3">
          <FaFacebookF size={"25px"} />
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <SiMessenger size={"25px"} />
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <BsTwitterX size={"25px"} />
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <SiViber size={"25px"} />
          <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
          <FaWhatsapp size={"30px"} />
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
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="mx-4 w-[350px] border-none py-10 px-10">
          <DialogHeader>
            <DialogTitle className="text-center font-tajawal text-xl font-medium text-[#B5975C]">
              شكراً
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="font-tajawal text-gray-300 text-sm">
              اشتركتَ بنجاح في نشرة أخبار موقع د. دربال. بإذنه تعالى، ستصلك
              إشعارات الموضوعات الجديدة عبر حسابك على فيسبوك والبريد الإلكتروني.{" "}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
