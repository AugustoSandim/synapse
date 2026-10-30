import { SDUIScreenSchema } from "@synapse/sdui-engine";
import { CatalogScreen } from "@/components/CatalogScreen";
import { mockScreenPayload } from "@/mocks";

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
