"use client";

import { useAccessibilityReset } from "@/lib/hooks/useAccessibilityReset";
import AccessibilityButton from "./accessibility-button";

export default function AccessibilityWrapper() {
  useAccessibilityReset();

  return <AccessibilityButton />;
}
