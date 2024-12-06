import { Button } from "@/components/ui/button";
import { Eraser, MaximizeIcon, MinimizeIcon, Redo2, Undo2 } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFullscreen } from "@/hooks/useFullscreen";


type ActionBarProps = {
  undo: () => void;
  redo: () => void;
  clearWorkspace: () => void;
};

const ActionBar: React.FC<ActionBarProps> = ({
  undo,
  redo,
  clearWorkspace,
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  return (
    <div className="flex items-center justify-between p-1 bg-black/95 text-white shadow-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="text-sm font-semibold" onClick={toggleFullscreen}>
            {isFullscreen ? (
            <>
              <MinimizeIcon />
            </>
          ) : (
            <>
              <MaximizeIcon />
            </>
          )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-transparent text-sm text-slate-200">
          {isFullscreen ? (
            <>
              <p>Exit Fullscreen</p>
            </>
          ) : (
            <>
              <p>Fullscreen</p>
            </>
          )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={undo}
                className="text-sm font-semibold"
              >
                <Undo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-transparent text-sm text-slate-200">
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={redo}
                className="text-sm font-semibold rounded"
              >
                <Redo2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-transparent text-sm text-slate-200">
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                onClick={clearWorkspace}
                className="text-sm font-semibold"
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-transparent text-sm text-red-600">
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionBar;
