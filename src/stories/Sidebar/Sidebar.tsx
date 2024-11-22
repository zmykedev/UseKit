import React, { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { SidebarProps } from "./types";

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  width = "md",
  position = "left",
  theme = "light",
  className,
  type = "seller",
  headerTitle,
  sections,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const widthClasses = {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    collapsed: "w-20",
  };

  const themeClasses = {
    light: "bg-white text-gray-800",
    dark: "bg-gray-800 text-white",
  };

  const typeClasses = {
    admin: "border-l-4 border-blue-500",
    seller: "border-l-4 border-green-500",
  };

  return (
    <div
      className={`
          fixed top-0 bottom-0 
          ${position === "left" ? "left-0" : "right-0"}
          ${isOpen ? widthClasses[width] : widthClasses.collapsed} 
          ${themeClasses[theme]}
          ${typeClasses[type]}
          transition-transform duration-300 ease-in-out
          flex flex-col
          shadow-xl
          z-50
          ${className ?? ""}
        `}
    >
      {/* Header Sidebar */}
      <div className="flex items-center flex-row justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && <h1 className="text-2xl font-bold">{headerTitle}</h1>}
        <button
          onClick={onClose} // Cambia entre expandido y colapsado
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon className={`h-6 w-6 ${!isOpen ? "rotate-180" : ""}`} />{" "}
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`${!isOpen ? "w-full text-center" : ""}`}
          >
            {/* Título de la Sección (solo en versión expandida) */}
            {isOpen && (
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-lg font-semibold text-left mb-2"
              >
                <span>{section.title}</span>

                <ChevronDownIcon
                  className={`h-6 w-6 transition-transform duration-300 ${
                    openSections[section.title] ? "-rotate-180" : ""
                  }`}
                />
              </button>
            )}

            {/* Opciones de la Sección (iconos en la parte inferior cuando está contraído) */}
            {openSections[section.title] || !isOpen ? (
              <div
                className={`${
                  isOpen ? "pl-4 space-y-2" : "flex flex-col items-center"
                }`}
              >
                {section.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.onClick}
                    className={`flex items-center space-x-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md ${
                      !isOpen ? "justify-center" : ""
                    }`}
                  >
                    {option.icon && (
                      <span className="text-xl">{option.icon}</span>
                    )}
                    {isOpen && <span>{option.label}</span>}
                    {option.notificationCount && isOpen && (
                      <span className="ml-auto text-xs text-white bg-red-500 rounded-full px-2 py-1">
                        {option.notificationCount}
                      </span>
                    )}
                    {option.isNew && isOpen && (
                      <span className="ml-auto text-xs text-white bg-green-500 rounded-full px-2 py-1">
                        New
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
