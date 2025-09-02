"use client";

import React, { useEffect } from "react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function CustomDialog({
  open,
  onOpenChange,
  children,
  className,
  showCloseButton = true,
}: CustomDialogProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      // Don't lock body scroll - let it behave normally
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog Content */}
      <div
        className={cn(
          "relative z-10 bg-background rounded-lg border shadow-lg p-6 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-auto",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

interface CustomDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomDialogHeader({
  children,
  className,
}: CustomDialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CustomDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomDialogTitle({
  children,
  className,
}: CustomDialogTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}
