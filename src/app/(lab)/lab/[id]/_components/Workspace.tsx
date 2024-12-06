"use client";

import React, { useRef, useState } from "react";
import { useWorkspaceStore } from "@/hooks/workspaceStore";
import { useHistoryStore } from "@/hooks/historyStore";
import ActionBar from "./Actionbar";
import { Loader, PlayIcon, ScalingIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { gsap } from "gsap";
import { toast } from "sonner";
import ReactionEquationBox from "./ReactionEquationBox";

type Chemical = {
  name: string;
  quantity: number;
  color: string;
};

type DraggableItem = {
  id: string;
  name: string;
  position: { x: number; y: number };
  size: number;
  color?: string;
  icon?: string;
  formula?: string;
  description?: string;
  quantity?: number;
  currentChemicals?: Chemical[];
  maxChemicals?: number;
  type?: string;
};
const Workspace: React.FC = () => {
  const { items, setItems } = useWorkspaceStore();
  const { addHistory, undo, redo, resetHistory } = useHistoryStore();
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reactionEquation, setReactionEquation] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (workspaceRef.current) {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const x = e.clientX - workspaceRect.left;
      const y = e.clientY - workspaceRect.top;

      const { type, data: itemData } = JSON.parse(
        e.dataTransfer.getData("application/json")
      );

      if (!type || !itemData) throw new Error("Invalid data");

      if (type === "chemical") {
        const targetInstrument = items.find(
          (item) =>
            x >= item.position.x &&
            x <= item.position.x + item.size &&
            y >= item.position.y &&
            y <= item.position.y + item.size &&
            item.type === "instrument"
        );

        if (targetInstrument) {
          handleInteraction(
            { ...itemData, position: { x, y } },
            targetInstrument
          );
          return;
        }
      }

      const newItem: DraggableItem = {
        id: `${type}-${Date.now()}`,
        name: itemData.name,
        position: { x, y },
        size: 50,
        icon: itemData.icon,
        type,
        color: itemData.color || "#ccc",
      };
      // @ts-expect-error ignore
      setItems([...items, newItem]);
      addHistory([...items, newItem]);
    }
  };

  const checkCollision = (
    item1: DraggableItem,
    item2: DraggableItem
  ): boolean => {
    const margin = 10;
    return (
      item1.position.x + item1.size > item2.position.x - margin &&
      item1.position.x < item2.position.x + item2.size + margin &&
      item1.position.y + item1.size > item2.position.y - margin &&
      item1.position.y < item2.position.y + item2.size + margin
    );
  };

  const handleInteraction = (
    chemical: DraggableItem,
    targetInstrument: DraggableItem
  ) => {
    const quantity = parseFloat(
      prompt(`Enter quantity of ${chemical.name}:`, "1") || "1"
    );

    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === targetInstrument.id
        ? {
            ...item,
            currentChemicals: [
              ...(item.currentChemicals || []),
              { name: chemical.name, quantity, color: chemical.color },
            ],
          }
        : item
    );

    // @ts-expect-error ignore
    setItems(updatedItems);

    // GSAP Animation
    const pipetteSelector = `#pipette-${chemical.id}`;
    const instrumentSelector = `#instrument-${targetInstrument.id}`;
    const reactionCircleSelector = `#chemical-reaction-${targetInstrument.id}`;

    // Get element references for positions
    const pipetteElement = document.querySelector(pipetteSelector);
    const instrumentElement = document.querySelector(instrumentSelector);

    if (!pipetteElement || !instrumentElement) {
      console.error("Pipette or instrument element not found.");
      return;
    }

    const pipetteRect = pipetteElement.getBoundingClientRect();
    const instrumentRect = instrumentElement.getBoundingClientRect();

    const workspaceRect = workspaceRef.current?.getBoundingClientRect();

    if (!workspaceRect) {
      console.error("Workspace rect not found.");
      return;
    }

    // Calculate relative positions dynamically
    const startX = pipetteRect.left - workspaceRect.left;
    const startY = pipetteRect.top - workspaceRect.top;

    const targetTopMiddleX =
      instrumentRect.left -
      workspaceRect.left +
      instrumentRect.width / 2 -
      pipetteRect.width / 2;
    const targetTopMiddleY =
      instrumentRect.top - workspaceRect.top - pipetteRect.height * 0.6; // Adjust dynamically based on pipette height

    const targetCenterX =
      instrumentRect.left -
      workspaceRect.left +
      instrumentRect.width / 2 -
      pipetteRect.width / 2; // Center dynamically
    const targetCenterY =
      instrumentRect.top -
      workspaceRect.top +
      instrumentRect.height / 2 -
      pipetteRect.height / 2; // Adjust for pipette height

    // GSAP Animation
    gsap.set(pipetteSelector, { x: 0, y: 0, rotation: 0 });
    const pipetteTimeline = gsap.timeline();

    pipetteTimeline
      .to(pipetteSelector, {
        x: targetTopMiddleX - startX,
        y: targetTopMiddleY - startY,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(pipetteSelector, { rotation: -45, duration: 0.5 })
      .to(pipetteSelector, {
        y: targetCenterY - startY,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        reactionCircleSelector,
        {
          scale: 1.2,
          opacity: 0.8,
          backgroundColor: chemical.color,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(pipetteSelector, {
        x: targetTopMiddleX - startX,
        y: targetTopMiddleY - startY,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(pipetteSelector, { rotation: 0, duration: 0.5 })
      .to(pipetteSelector, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

    gsap.to(reactionCircleSelector, {
      boxShadow: `0px 0px 15px 5px ${chemical.color}`,
      duration: 0.5,
      repeat: 1,
      yoyo: true,
    });

    toast.success(`${chemical.name} added to ${targetInstrument.name}`);
  };

  const startReaction = async (instrumentId: string) => {
    setIsLoading(true);
    const instrument = items.find((item) => item.id === instrumentId);
    if (!instrument || !instrument.currentChemicals?.length) {
      toast.error("No chemicals in the instrument");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reactions/reaction`,
        { chemicals: instrument.currentChemicals }
      );

      const { success, data, message } = response.data;

      if (!success) {
        toast.error(message || "Reaction failed");
        setIsLoading(false);
        return;
      }
      console.log(data);
      setReactionEquation(data.equation || "No equation provided");
      toast.success("Reaction successful");

      if (data.products && data.products.length > 0) {
        const updatedItems = items.map((item) =>
          item.id === instrumentId
            ? { ...item, color: data.products[0].color, currentChemicals: [] }
            : item
        );
        setItems(updatedItems);
        addHistory(updatedItems);

        // Reaction animation
        const reactionCircle = `#chemical-reaction-${instrument.id}`;
        const productColors = data.products.map((p: any) => p.color);

        gsap.timeline().to(reactionCircle, {
          scale: 1.5,
          duration: 1,
          repeat: productColors.length,
          yoyo: true,
          backgroundColor: productColors[0],
          onComplete: () => {
            // Cycle through product colors
            productColors.forEach((color: string, index: number) => {
              setTimeout(() => {
                gsap.to(reactionCircle, {
                  backgroundColor: color,
                  duration: 0.5,
                });
              }, index * 1000);
            });
          },
        });
      } else {
        toast.info("No reaction occurred");
      }
    } catch (error) {
      console.error("Reaction failed:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (e: React.MouseEvent) => {
    if (selectedItemId && workspaceRef.current) {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const x = e.clientX - workspaceRect.left;
      const y = e.clientY - workspaceRect.top;

      const updatedItems = items.map((item) =>
        item.id === selectedItemId ? { ...item, position: { x, y } } : item
      );

      setItems(updatedItems);
      addHistory(updatedItems);

      const draggedItem = updatedItems.find(
        (item) => item.id === selectedItemId
      );

      if (draggedItem && draggedItem.type === "chemical") {
        const targetInstrument = updatedItems.find(
          (item) =>
            item.type === "instrument" && checkCollision(draggedItem, item)
        );

        if (targetInstrument) {
          handleInteraction(draggedItem, targetInstrument);
        }
      }

      setSelectedItemId(null);
    }
  };

  const handleResize = (id: string, increment: number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, size: Math.max(10, item.size + increment) }
        : item
    );
    setItems(updatedItems);
  };

  const handleRemove = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    addHistory(updatedItems);
  };

  const resetWorkspace = () => {
    setItems([]);
    resetHistory();
  };

  return (
    <div className="flex flex-col h-[93vh]">
      <ActionBar undo={undo} redo={redo} clearWorkspace={resetWorkspace} />
      <div
        className="relative flex-1 bg-gray-50 border-t border-gray-200 overflow-hidden"
        ref={workspaceRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute flex items-center justify-center bg-transparent cursor-move transition-all duration-200 ease-in-out"
            style={{
              top: item.position.y,
              left: item.position.x,
              width: item.size,
              height: item.size,
            }}
            draggable
            onDragStart={() => setSelectedItemId(item.id)}
            onDragEnd={handleDragEnd}
            onDoubleClick={() => handleResize(item.id, 50)}
          >
            <div className="flex flex-col items-center">
              {item.type === "instrument" ? (
                <div className="relative inline-block">
                  <Image
                    id={`instrument-${item.id}`}
                    className=""
                    src={item.icon || "/instruments/beaker.svg"}
                    alt={`${item.name} icon`}
                    width={item.size}
                    height={item.size}
                  />
                  <div
                    id={`chemical-reaction-${item.id}`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                  ></div>
                </div>
              ) : (
                <div>
                  <Image
                    id={`pipette-${item.id}`}
                    src={"/instruments/pipette.svg"}
                    alt={`${item.name} icon`}
                    width={item.size}
                    height={item.size}
                  />
                </div>
              )}

              <div className="">
                <Button
                  onClick={() => handleRemove(item.id)}
                  className="mt-1 text-red-600 hover:text-red-800 text-xs"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
                {item.type === "instrument" && (
                  <Button
                    onClick={() => startReaction(item.id)}
                    className="mt-1 text-green-600 hover:text-green-800 text-xs"
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <PlayIcon className="w-4 h-4" />
                    )}
                  </Button>
                )}

                <Button
                  className="mt-1 text-blue-600 hover:text-blue-800 text-xs"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize(item.id, 50);
                  }}
                >
                  <ScalingIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reactionEquation && (
      <ReactionEquationBox equation={reactionEquation} />
      )}
    </div>
  );
};

export default Workspace;
