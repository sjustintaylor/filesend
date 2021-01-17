import { create } from "@storybook/theming/create";
import "assets/css/responsive.scss";
import "assets/css/colors.css";
import "assets/css/typography.css";
import "assets/css/resets.css";
import "./main.js";
const theme = create({
  base: "light",
  // appBg: "#F7F7FC",
  // appContentBg: "#F7F7FC",

  // Typography
  fontBase: '"Poppins", sans-serif',
  fontCode: "monospace",
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  theme: theme,
  layout: "fullscreen",
};
