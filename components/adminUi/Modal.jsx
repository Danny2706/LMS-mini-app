"use client";

import { Loader, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "default",
  size = "default",
  isDeleting,
}) => {
  const getConfirmButtonStyle = () => {
    switch (confirmColor) {
      case "red":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "green":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "sm:max-w-[425px]";
      case "lg":
        return "sm:max-w-[700px]";
      case "xl":
        return "sm:max-w-[900px]";
      default:
        return "sm:max-w-[550px]";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn("gap-0 p-0 bg-white dark:bg-gray-900", getSizeClass())}
      >
        <DialogHeader className="p-6 pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold leading-none tracking-tight">
              {title}
            </DialogTitle>
          </div>
          {message && (
            <DialogDescription className="text-base text-muted-foreground">
              {message}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="px-6 py-4 space-y-4">{children}</div>}

        <DialogFooter className="p-6 pt-4 border-t">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button className={getConfirmButtonStyle()} onClick={onConfirm}>
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin w-5 h-5" />
                    <span>Confirming...</span>
                  </div>
                ) : (
                  confirmText
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
