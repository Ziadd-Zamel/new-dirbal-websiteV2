"use client";

import { useAccessibilityReset } from "@/lib/hooks/useAccessibilityReset";
import AccessibilityButton from "./accessibility-button";

export default function AccessibilityWrapper() {
  // This hook will reset accessibility settings on every page navigation
  useAccessibilityReset();

  return <AccessibilityButton />;
}
