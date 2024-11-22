import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { fn } from "@storybook/test";
import { Icons } from "./Icons";
import React, { useState } from "react";

const meta: Meta<typeof Sidebar> = {
  title: "Example/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    width: { control: "select", options: ["sm", "md", "lg"] },
    position: { control: "select", options: ["left", "right"] },
    theme: { control: "select", options: ["light", "dark"] },
    type: { control: "select", options: ["admin", "seller"] },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleableSidebar: Story = {
  render: (args) => {
    const SidebarWrapper: React.FC = () => {
      const [isOpen, setIsOpen] = useState(true);

      const handleToggle = () => setIsOpen((prev) => !prev);

      return <Sidebar {...args} isOpen={isOpen} onClose={handleToggle} />;
    };

    return <SidebarWrapper />;
  },
  args: {
    width: "md",
    position: "left",
    theme: "dark",
    type: "admin",
    headerTitle: "Toggleable Sidebar",
    sections: [
      {
        title: "Dashboard",
        options: [
          { label: "Overview", icon: Icons.home },
          { label: "Analytics", icon: Icons.chart },
        ],
      },
      {
        title: "Products",
        options: [
          { label: "All Products", icon: Icons.cart },
          { label: "Add New", icon: Icons.plus },
        ],
      },
      {
        title: "Orders",
        options: [
          { label: "All Orders", icon: Icons.cart },
          { label: "Pending", icon: Icons.clock },
        ],
      },
    ],
  },
};
