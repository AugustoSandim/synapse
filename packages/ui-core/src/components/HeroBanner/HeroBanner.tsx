import React from "react";
import { HeroBannerProps } from "./types";
import styles from "./HeroBanner.module.css";

/** Allows http(s) absolute URLs and relative paths for SDUI-safe navigation. */
function isSafeActionUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../") ||
    trimmed.startsWith("#")
  ) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  id,
  title,
  badge,
  action,
}) => {
  const safeUrl = action?.url && isSafeActionUrl(action.url) ? action.url : null;
  const actionLabel = action?.label ?? "Watch Now";

  return (
    <article id={id} className={styles.banner}>
      <div className={styles.content}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <h2 className={styles.title}>{title}</h2>
        {safeUrl && (
          <a
            href={safeUrl}
            className={styles.actionButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actionLabel}
          </a>
        )}
      </div>
    </article>
  );
};
