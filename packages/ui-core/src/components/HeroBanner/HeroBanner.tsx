import React from "react";
import { HeroBannerProps } from "./types";
import styles from "./HeroBanner.module.css";

export const HeroBanner: React.FC<HeroBannerProps> = ({
  id,
  title,
  badge,
  actionUrl,
  actionLabel = "Watch Now",
}) => {
  return (
    <article id={id} className={styles.banner}>
      <div className={styles.content}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <h2 className={styles.title}>{title}</h2>
        {actionUrl && (
          <a
            href={actionUrl}
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
