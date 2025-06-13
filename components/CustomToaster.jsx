"use client"

import { Toaster as HotToaster, ToastBar, toast } from "react-hot-toast"
import { CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react"

export default function CustomToaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "0",
          maxWidth: "450px",
          width: "100%",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-3 p-3 w-full">
              <div className="flex-shrink-0">
                {t.type === "success" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {t.type === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                {t.type === "loading" && (
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                )}
                {t.type === "blank" && icon}
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-0">
                {t.type === "error" && (
                  <span className="text-sm font-medium text-nowrap text-red-500">
                    Error:
                  </span>
                )}
                <p className="text-[15px] truncate">
                  {typeof message === "string" ? message : message}
                </p>
              </div>

              {t.type !== "loading" && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </HotToaster>
  )
}
