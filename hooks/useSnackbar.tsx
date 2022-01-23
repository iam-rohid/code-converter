import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Snackbar from "../components/Snackbar";
import { SnackbarType } from "../types";

type SnackbarContextType = {
  show: (snackbar: SnackbarType, dismissTime?: number) => void;
  dismiss: () => void;
  isShowing: boolean;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarShowing, setSnackbarShowing] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    message: "",
    type: "success",
  });
  const intervelRef = useRef<NodeJS.Timer>(null);

  useEffect(() => {
    return () => {};
  }, [snackbar]);

  const show = (snackbar: SnackbarType) => {
    dismiss();

    setSnackbar(snackbar);
    setSnackbarShowing(true);

    intervelRef.current = setInterval(() => {
      setSnackbarShowing(false);
    }, 3000);
  };

  const dismiss = () => {
    setSnackbarShowing(false);
    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }
  };

  const value: SnackbarContextType = {
    show,
    dismiss,
    isShowing: snackbarShowing,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbar && (
        <Snackbar
          snackbar={snackbar}
          className={`fixed z-10 bottom-10  transition-all duration-300 ${
            snackbarShowing ? "right-10" : "-right-[500px]"
          }`}
          onClose={dismiss}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw "Context not ready!";
  return context;
};

export default SnackbarProvider;
