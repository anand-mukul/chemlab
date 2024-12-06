"use client";
import * as React from "react";
import { SearchBar } from "./Searchbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Chemical, Instrument } from "@/types";
import { ChemicalCard, InstrumentCard } from "./Cards";
import { useDraggable } from "@dnd-kit/core";

export default function LabSidebar() {
  const [instruments, setInstruments] = React.useState<Instrument[]>([]);
  const [chemicals, setChemicals] = React.useState<Chemical[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [instrumentsRes, chemicalsRes] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/labs/instruments`
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/labs/chemicals`),
        ]);
        setInstruments(instrumentsRes.data.data);
        setChemicals(chemicalsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch sidebar data:", err);
        setError("Failed to load sidebar data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const filteredInstruments = React.useMemo(
    () =>
      instruments.filter((instrument) =>
        instrument.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [instruments, searchQuery]
  );

  const filteredChemicals = React.useMemo(
    () =>
      chemicals.filter((chemical) =>
        chemical.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [chemicals, searchQuery]
  );

  return (
    <div className="bg-black/95">
      <aside className="h-[90vh] p-4 rounded-lg mt-4">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
        </div>
        <Separator className="my-4" />
        {error && <p className="text-red-500">{error}</p>}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-3 gap-4">
            {filteredInstruments.map((instrument) => (
              <DraggableWrapper key={instrument._id} data={instrument}>
                <InstrumentCard key={instrument._id} instrument={instrument} />
              </DraggableWrapper>
            ))}
            {filteredChemicals.map((chemical) => (
              <DraggableWrapper key={chemical._id} data={chemical}>
                <ChemicalCard key={chemical._id} chemical={chemical} />
              </DraggableWrapper>
            ))}
          </div>
          {filteredInstruments.length === 0 &&
            filteredChemicals.length === 0 && (
              <p className="text-center text-white">No results found.</p>
            )}
        </ScrollArea>
      </aside>
    </div>
  );
}

const DraggableWrapper = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: data._id,
    data,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
