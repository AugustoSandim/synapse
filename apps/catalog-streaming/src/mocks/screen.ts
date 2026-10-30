export const mockScreenPayload = {
  screen: "home_streaming",
  version: "1.0.0",
  root: {
    id: "root-container",
    type: "Container",
    props: {
      direction: "vertical",
      spacing: "large",
    },
    children: [
      {
        id: "hero-1",
        type: "HeroBanner",
        props: {
          title: "Grand Final World Esports 2026",
          badge: "LIVE IN 4K",
          actionUrl: "#watch",
          actionLabel: "Watch Now",
        },
      },
      {
        id: "carousel-trending",
        type: "MediaCarousel",
        props: {
          headline: "Em Alta na Synapse",
          items: [
            { id: "1", title: "Cyber City: Protocol", duration: "45m" },
            { id: "2", title: "Deep Dive: WebAssembly", duration: "1h 10m" },
            { id: "3", title: "Extreme Observability", duration: "55m" },
            { id: "4", title: "Runtime Architecture", duration: "1h 30m" },
          ],
        },
      },
    ],
  },
};
