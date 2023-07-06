// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import TopBar from "./TopBar";

const meta: Meta<typeof TopBar> = {
  component: TopBar,
};

type Story = StoryObj<typeof TopBar>;

export const Primary: Story = {};

export default meta;
