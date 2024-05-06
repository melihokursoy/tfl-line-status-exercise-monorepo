import type { A11yParameters } from "@storybook/addon-a11y";
import { Rule, getRules } from "axe-core";

const enabledTags = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
];

const enabledRules: Rule[] = getRules(enabledTags).map((ruleMetadata) => ({
  id: ruleMetadata.ruleId,
  enabled: true,
}));

const a11y: A11yParameters = {
  config: {
    rules: enabledRules,
  },
};
export const parameters = {
  layout: 'fullscreen',
  a11y,
  viewport: {
    viewports: {
      laptop: {
        name: 'laptop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
      tablet: {
        name: 'tablet',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      mobile: {
        name: 'mobile',
        styles: {
          width: '425px',
          height: '768px',
        },
      },
    },
    defaultViewport: 'laptop'
  },
  backgrounds: {
    default: 'Light',
    values: [
      { name: 'Light', value: '#ffffff' }],
  }
}