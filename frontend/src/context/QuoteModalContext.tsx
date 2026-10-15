"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuoteModalContextType {
  isOpen: boolean;
  selectedProduct: string;
  openQuoteModal: (productSlugOrName?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openQuoteModal = (productSlugOrName?: string) => {
    if (productSlugOrName) {
      setSelectedProduct(productSlugOrName);
    }
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        selectedProduct,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
