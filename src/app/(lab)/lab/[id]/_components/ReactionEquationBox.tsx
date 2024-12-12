import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from "react";

type ReactionEquationBoxProps = {
  equation: string | null;
};

const ReactionEquationBox: React.FC<ReactionEquationBoxProps> = ({
  equation,
}) => {
  const words = equation || "No equation provided";
  return (
    <div className="fixed bottom-4 left-[38%] transform -translate-x-1/2 bg-transparent shadow-lg border border-gray-300 rounded-lg px-4 py-2 animate-floating">
      <div className="flex justify-center items-center">
        <TextGenerateEffect
          words={words}
          className="text-white text-center text-lg font-medium"
        />
      </div>
    </div>
  );
};

export default ReactionEquationBox;
