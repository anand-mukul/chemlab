import React from "react";
import Image from "next/image";
import { Chemical, Instrument } from "@/types";

const renderFormula = (formula: string) => {
    return formula.split(/(\d+)/).map((part, index) =>
      /\d/.test(part) ? <sub key={index}>{part}</sub> : part
    );
  };

const InstrumentCard = ({ instrument }: { instrument: Instrument }) => (
  <div
    aria-label={`Instrument: ${instrument.name}`}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({ type: "instrument", data: instrument })
      );
    }}
    className="flex flex-col items-center justify-around w-full h-[12vh] cursor-grab bg-slate-50 border rounded-lg hover:bg-slate-200"
  >
    <Image
      className="w-12 h-12"
      src={instrument.icon || "/placeholder.png"}
      alt={`${instrument.name} icon`}
      width={100}
      height={100}
      onDragStart={(e) => e.preventDefault()}
    />
    <span className="text-black text-[10px]">{instrument.name}</span>
  </div>
);

const ChemicalCard = ({ chemical }: { chemical: Chemical }) => (
  <div
    aria-label={`Chemical: ${chemical.name}`}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({ type: "chemical", data: chemical })
      );
    }}
    className="flex flex-col items-center justify-around w-full h-[12vh] bg-slate-50 border rounded-lg cursor-grab hover:bg-slate-200"
  >
    <Image
      className="w-12 h-12 rounded-full"
      src={chemical.icon || "/placeholder.png"}
      alt={`${chemical.name} icon`}
      width={100}
      height={100}
      onDragStart={(e) => e.preventDefault()}
    />
    <span className="text-black text-[10px]">{renderFormula(chemical.formula)}</span>
  </div>
);

export { InstrumentCard, ChemicalCard };
