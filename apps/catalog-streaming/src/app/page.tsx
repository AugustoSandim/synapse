import { SDUIScreenSchema } from "@synapse/sdui-engine";
import { CatalogScreen } from "@/components/CatalogScreen";

// Mock de payload que viria do backend / Edge
const mockScreenPayload = {
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

export default function HomePage() {
  // Runtime validation ensuring the contract integrity
  const parsed = SDUIScreenSchema.safeParse(mockScreenPayload);

  if (!parsed.success) {
    return (
      <main style={{ padding: 32 }}>
        <h1>Error in Screen Contract</h1>
        <pre>{JSON.stringify(parsed.error.format(), null, 2)}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <CatalogScreen root={parsed.data.root} />
    </main>
  );
}
