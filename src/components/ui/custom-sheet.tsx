/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
  onAnimatedClose?: () => void; // Callback for animated close
}

export interface CustomSheetRef {
  closeWithAnimation: () => void;
}

export const CustomSheet = forwardRef<CustomSheetRef, CustomSheetProps>(
  (
    {
      open,
      onOpenChange,
      children,
      className,
      side = "right",
      showCloseButton = true,
      onAnimatedClose,
    },
    ref
  ) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
        onOpenChange(false);
        setIsClosing(false);
        onAnimatedClose?.(); // Call the callback after animation completes
      }, 300);
    }, [onOpenChange, onAnimatedClose]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      closeWithAnimation: handleClose,
    }));

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          handleClose();
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        setIsClosing(false);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, handleClose]);

    if (!open) return null;

    // Get positioning classes based on side
    const getPositionClasses = () => {
      switch (side) {
        case "right":
          return "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm";
        case "left":
          return "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm";
        case "top":
          return "inset-x-0 top-0 h-auto w-full";
        case "bottom":
          return "inset-x-0 bottom-0 h-auto w-full";
        default:
          return "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm";
      }
    };

    // Get animation classes based on side and state
    const getAnimationClasses = () => {
      if (isClosing) {
        // Closing animations - reverse of opening
        switch (side) {
          case "right":
            return "animate-out slide-out-to-right duration-300";
          case "left":
            return "animate-out slide-out-to-left duration-300";
          case "top":
            return "animate-out slide-out-to-top duration-300";
          case "bottom":
            return "animate-out slide-out-to-bottom duration-300";
          default:
            return "animate-out slide-out-to-right duration-300";
        }
      } else {
        // Opening animations
        switch (side) {
          case "right":
            return "animate-in slide-in-from-right duration-300";
          case "left":
            return "animate-in slide-in-from-left duration-300";
          case "top":
            return "animate-in slide-in-from-top duration-300";
          case "bottom":
            return "animate-in slide-in-from-bottom duration-300";
          default:
            return "animate-in slide-in-from-right duration-300";
        }
      }
    };

    return (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Sheet Content */}
        <div
          className={cn(
            "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition-all duration-300",
            getPositionClasses(),
            getAnimationClasses(),
            side === "right" && "border-l",
            side === "left" && "border-r",
            side === "top" && "border-b",
            side === "bottom" && "border-t",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              onClick={handleClose}
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
);

CustomSheet.displayName = "CustomSheet";

interface CustomSheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomSheetHeader({
  children,
  className,
}: CustomSheetHeaderProps) {
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

interface CustomSheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomSheetTitle({
  children,
  className,
}: CustomSheetTitleProps) {
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

interface CustomSheetContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomSheetContent({
  children,
  className,
}: CustomSheetContentProps) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}

interface CustomSheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}

export function CustomSheetTrigger({
  children,
  asChild,
  onClick,
}: CustomSheetTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props || {}),
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        // @ts-expect-error - We know this element can have onClick
        children.props?.onClick?.(e);
        onClick?.();
      },
    } as any);
  }

  return (
    <button onClick={onClick} className="cursor-pointer">
      {children}
    </button>
  );
}
