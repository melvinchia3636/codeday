import { useState } from "react";
import { Icon } from "@iconify/react";
import { CyberpunkModal } from "./CyberpunkModal";
import { AuthLoadingOverlay } from "./AuthFeedback/AuthLoadingOverlay";
import { createBugReport } from "../lib/bugReport";

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BugReportModal({ isOpen, onClose }: BugReportModalProps) {
  const [description, setDescription] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setError(null);
    setShowLoading(true);

    try {
      await createBugReport({
        description: description.trim(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    } catch (err) {
      console.error("Failed to submit bug report:", err);
      setError("Failed to submit bug report. Please try again.");
      setShowLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    if (!error) {
      setSubmitted(true);
      // Reset and close after showing success
      setTimeout(() => {
        setDescription("");
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    if (!showLoading) {
      setDescription("");
      setSubmitted(false);
      setError(null);
      onClose();
    }
  };

  return (
    <>
      <AuthLoadingOverlay
        isVisible={showLoading}
        message="TRANSMITTING_BUG_REPORT..."
        color="pink"
        onComplete={handleLoadingComplete}
      />

      <CyberpunkModal
        isVisible={isOpen && !showLoading}
        onClose={handleClose}
        title="REPORT_BUG"
        titleIcon="pixelarticons:bug"
        color="red"
        isLoading={false}
        statusText="BUG_TRACKER_ACTIVE"
      >
        {submitted ? (
          <div className="text-center py-6">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-2 bg-green-500/30 blur-lg animate-pulse" />
              <Icon
                icon="pixelarticons:check"
                className="relative w-16 h-16 text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
              />
            </div>
            <p className="text-green-400 font-bold tracking-wider text-lg mb-2">
              BUG_REPORT_SUBMITTED
            </p>
            <p className="text-zinc-400 text-sm">
              Thank you for your feedback!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs text-pink-400/70 tracking-widest mb-2">
                <span className="w-1.5 h-1.5 bg-pink-400" />
                DESCRIPTION
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the bug you encountered..."
                className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all resize-none h-32"
                required
              />
            </div>

            <div className="bg-zinc-800/50 border border-pink-500/20 p-3">
              <p className="text-xs text-zinc-400 mb-2 flex items-center gap-2">
                <Icon
                  icon="pixelarticons:info-box"
                  className="w-4 h-4 text-pink-400"
                />
                AUTO_INCLUDED_DATA:
              </p>
              <ul className="text-xs text-zinc-500 space-y-1 ml-6">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400" />
                  Current page URL
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400" />
                  Browser information
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-400" />
                  Timestamp
                </li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/40 p-3 flex items-center gap-2">
                <Icon
                  icon="pixelarticons:alert"
                  className="w-4 h-4 text-red-400"
                />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-zinc-800/50 border-2 border-zinc-600 px-4 py-3 text-zinc-400 font-bold tracking-wider hover:bg-zinc-700/50 hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
              >
                <Icon icon="pixelarticons:close" className="w-5 h-5" />
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!description.trim()}
                className="flex-1 bg-pink-500/20 border-2 border-pink-500 px-4 py-3 text-pink-400 font-bold tracking-wider hover:bg-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon icon="pixelarticons:mail" className="w-5 h-5" />
                SUBMIT
              </button>
            </div>
          </form>
        )}
      </CyberpunkModal>
    </>
  );
}
