"use client";

import { useDocumentViewer } from "@/components/ui/document-viewer";

/** Opens a video or PDF in the shared in-page viewer modal. */
export default function OpenInViewer({
  src,
  title,
  className,
  children,
}: {
  src: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { openDocument } = useDocumentViewer();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openDocument({ src, title })}
      className={className}
    >
      {children}
    </button>
  );
}
