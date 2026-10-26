import React, { createContext, ReactNode, useContext } from "react";

export type ComponentRegistryMap = Record<string, React.ComponentType<any>>;

const RegistryContext = createContext<ComponentRegistryMap>({});

export const SDUIProvider: React.FC<{
  registry: ComponentRegistryMap;
  children: ReactNode;
}> = ({ registry, children }) => {
  return (
    <RegistryContext.Provider value={registry}>
      {children}
    </RegistryContext.Provider>
  );
};

export const useSDUIRegistry = () => useContext(RegistryContext);

export const FallbackUnknownNode: React.FC<{ type: string; id: string }> = ({
  type,
  id,
}) => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        role="alert"
        aria-live="polite"
        style={{
          border: "1px dashed #E50914",
          padding: "8px",
          margin: "4px 0",
          fontSize: "12px",
          color: "#E50914",
          borderRadius: "4px",
        }}
      >
        [SDUI Warning] Component not registered: <strong>{type}</strong> (id:{" "}
        {id})
      </div>
    );
  }
  return null;
};
