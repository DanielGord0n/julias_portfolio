"use client";

import dynamic from "next/dynamic";

const ModelViewer = dynamic(
  () => import("./model-viewer").then((m) => m.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <span className="label text-muted">Loading 3D model…</span>
      </div>
    ),
  },
);

export function ModelStage({
  src,
  label,
  note,
}: {
  src: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="relative aspect-[16/10] min-h-[360px] w-full overflow-hidden border border-line bg-paper-2">
      <ModelViewer src={src} />

      <div className="pointer-events-none absolute left-4 top-4">
        <span className="label rounded-full border border-line bg-paper/80 px-3 py-1.5 backdrop-blur-sm">
          {label}
        </span>
      </div>

      {note && (
        <div className="pointer-events-none absolute bottom-4 right-4">
          <span className="flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-xs text-muted backdrop-blur-sm">
            <span aria-hidden>⟲</span> {note}
          </span>
        </div>
      )}
    </div>
  );
}
