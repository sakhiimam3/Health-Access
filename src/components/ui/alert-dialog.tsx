// src/components/ui/alert-dialog.tsx
import React from "react";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  loading?: boolean;
  onCancel?: () => void;
  onAction?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  actionText = "OK",
  loading,
  onCancel,
  onAction,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && <p className="mb-4 text-gray-600">{description}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            disabled={loading}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              onAction?.();
              onOpenChange(false);
            }}
            disabled={loading}
            type="button"
          >
            {loading ? "Processing..." : actionText}
          </button>
        </div>
      </div>
    </div>
  );
};