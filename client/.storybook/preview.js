import { create } from "@storybook/theming/create";
const theme = create({
  base: "light",
  appBg: "#F7F7FC",
  // appContentBg: "#F7F7FC",
  // Typography
  fontBase: '"Poppins", sans-serif',
  fontCode: "monospace",
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  theme: theme,
};
