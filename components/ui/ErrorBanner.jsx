"use client";

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error_banner" role="alert">
      <p className="error_banner_text">{message}</p>
      {onDismiss && (
        <button type="button" onClick={onDismiss} className="error_banner_dismiss" aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
}
