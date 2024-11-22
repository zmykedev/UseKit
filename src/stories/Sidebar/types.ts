export interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  width?: "sm" | "md" | "lg";
  position?: "left" | "right";
  theme?: "light" | "dark";
  className?: string;
  type?: "admin" | "seller";
  headerTitle: string;
  sections: SidebarSection[];
  bgColor?: string; // Color de fondo del sidebar
  textColor?: string; // Color de texto
  borderColor?: string; // Color del borde
  iconColor?: string; // Color de los íconos
  activeItemColor?: string; // Color del ítem activo
}

interface SidebarSection {
  title: string;
  options: SidebarOption[];
}

interface SidebarOption {
  label: string;
  icon?: React.ReactNode;
  notificationCount?: number;
  isNew?: boolean;
  onClick?: () => void;
}
