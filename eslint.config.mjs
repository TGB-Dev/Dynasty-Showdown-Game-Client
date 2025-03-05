import { dirname } from "path";
import { fileURLToPath } from "url";
import prettierRecommended from "eslint-plugin-prettier/recommended"
import love from "eslint-config-love";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/components/ui/*"]
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  love,
  prettierRecommended,

  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    }
  }
];

export default eslintConfig;
