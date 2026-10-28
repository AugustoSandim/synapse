import React from "react";
import styles from "./MediaCarousel.module.css";
import { MediaCarouselProps } from "./types";

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  id,
  headline,
  items = [],
}) => {
  return (
    <section
      id={id}
      className={styles.carouselSection}
      aria-label={headline}
      role="region"
    >
      <h3 className={styles.headline}>{headline}</h3>
      <div className={styles.track} tabIndex={0} role="feed" aria-busy="false">
        {items.map((item) => (
          <article
            key={item.id}
            className={styles.card}
            tabIndex={0}
            aria-label={`${item.title}, duration: ${item.duration || "N/A"} `}
          >
            <h4 className={styles.cardTitle}>{item.title}</h4>
            {item.duration && (
              <span className={styles.cardDuration}>{item.duration}</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
