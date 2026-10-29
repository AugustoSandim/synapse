"use client";

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
      <ul className={styles.track} tabIndex={0}>
        {items.map((item) => (
          <li key={item.id}>
            <article
              className={styles.card}
              aria-label={`${item.title}, duration: ${item.duration || "N/A"} `}
            >
              <h4 className={styles.cardTitle}>{item.title}</h4>
              {item.duration && (
                <span className={styles.cardDuration}>{item.duration}</span>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
