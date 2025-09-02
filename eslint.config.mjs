import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",
      // Disable unused expression warnings
      "@typescript-eslint/no-unused-expressions": "off",
      // Disable React hooks exhaustive deps warnings
      "react-hooks/exhaustive-deps": "off",
      // Disable ts-ignore/ts-expect-error warnings
      "@typescript-eslint/ban-ts-comment": "off",
      // Disable explicit any warnings
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
