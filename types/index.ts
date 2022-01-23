export * from "./menu-type";
export type SnackbarType = {
  message: string;
  onClose?: () => void;
  type: "error" | "success" | "warning" | "info";
};
