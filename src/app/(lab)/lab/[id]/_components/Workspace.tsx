"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";

// Type definitions for better clarity
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
  // State management hooks
  const { items, setItems } = useWorkspaceStore();
  const { addHistory, undo, redo, resetHistory } = useHistoryStore();

  const workspaceRef = useRef<HTMLDivElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reactionEquation, setReactionEquation] = useState<string | null>(null);
  const [positionLock, setPositionLock] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    chemical: DraggableItem;
    targetInstrument: DraggableItem;
  } | null>(null);
  const [inputQuantity, setInputQuantity] = useState<number>(0);

  // Toolbox state
  const [toolBoxVisible, setToolBoxVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [toolboxTimeout, setToolboxTimeout] = useState<number | null>(null);

  // Drag and drop handling
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  // Opens a modal for a chemical-instrument interaction
  const openModal = (chemical: DraggableItem, targetInstrument: DraggableItem) => {
    setModalData({ chemical, targetInstrument });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setInputQuantity(0);
    setIsModalOpen(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (positionLock || !workspaceRef.current) return;

    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - workspaceRect.left;
    const y = e.clientY - workspaceRect.top;

    const dragData = e.dataTransfer.getData("application/json");

    const { type, data: itemData } = JSON.parse(dragData);

    if (!type || !itemData) {
      throw new Error("Missing required fields in drag data.");
    }

    if (type === "chemical") {
      const targetInstrument = items.find((item) => x >= item.position.x && x <= item.position.x + item.size && y >= item.position.y && y <= item.position.y + item.size && item.type === "instrument");

      if (targetInstrument) {
        setPositionLock(true);
        openModal({ ...itemData, position: { x, y } }, targetInstrument);
        return;
      }
    }

    const newItem: DraggableItem = {
      id: `${type}-${Date.now()}`,
      name: itemData.name,
      position: { x, y },
      size: 100,
      icon: itemData.icon,
      type,
      color: itemData.color || "#ccc",
    };
    // @ts-ignore
    setItems([...items, newItem]);
    addHistory([...items, newItem]);
  };

  // Checks for collision between two items
  const checkCollision = (item1: DraggableItem, item2: DraggableItem): boolean => {
    const distance = Math.sqrt(Math.pow(item1.position.x + item1.size / 2 - (item2.position.x + item2.size / 2), 2) + Math.pow(item1.position.y + item1.size / 2 - (item2.position.y + item2.size / 2), 2));

    const combinedRadius = (item1.size + item2.size) / 2;
    return distance < combinedRadius;
  };

  // Triggers interaction logic between chemical and instrument
  const handleInteraction = (chemical: DraggableItem, targetInstrument: DraggableItem) => {
    const quantity = chemical.quantity || 1;

    const updatedItems = items.map((item) =>
      item.id === targetInstrument.id
        ? {
            ...item,
            currentChemicals: [
              ...(item.currentChemicals || []),
              {
                name: chemical.name,
                quantity: inputQuantity,
                color: chemical.color,
              },
            ],
          }
        : item,
    );
    // @ts-ignore
    setItems(updatedItems);
    closeModal();

    // GSAP Animation
    const pipetteSelector = `#pipette-${chemical.id}`;
    const instrumentSelector = `#instrument-${targetInstrument.id}`;
    const reactionCircleSelector = `#chemical-reaction-${targetInstrument.id}`;

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

    const startX = pipetteRect.left - workspaceRect.left;
    const startY = pipetteRect.top - workspaceRect.top;
    const targetTopMiddleX = instrumentRect.left - workspaceRect.left + instrumentRect.width / 2 - pipetteRect.width / 2;
    const targetTopMiddleY = instrumentRect.top - workspaceRect.top - pipetteRect.height * 0.6;
    const targetCenterX = instrumentRect.left - workspaceRect.left + instrumentRect.width / 2 - pipetteRect.width / 2;
    const targetCenterY = instrumentRect.top - workspaceRect.top + instrumentRect.height / 2 - pipetteRect.height / 2;

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
        "-=0.5",
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
    setPositionLock(false);
  };

  // Start a chemical reaction using API
  const startReaction = async (instrumentId: string) => {
    setIsLoading(true);
    const instrument = items.find((item) => item.id === instrumentId);
    if (!instrument || !instrument.currentChemicals?.length) {
      toast.error("No chemicals in the instrument");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reactions/reaction`, { chemicals: instrument.currentChemicals });

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
        const updatedItems = items.map((item) => (item.id === instrumentId ? { ...item, color: data.products[0].color, currentChemicals: [] } : item));
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

  // Handles drag end events
  const handleDragEnd = (e: React.MouseEvent) => {
    if (!selectedItemId || !workspaceRef.current) return;

    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - workspaceRect.left;
    const y = e.clientY - workspaceRect.top;

    const draggedItem = items.find((item) => item.id === selectedItemId);

    if (draggedItem) {
      const targetInstrument = items.find((item) => item.type === "instrument" && checkCollision({ ...draggedItem, position: { x, y } }, item));

      if (targetInstrument) {
        openModal(draggedItem, targetInstrument);
        return;
      }

      const updatedItems = items.map((item) => (item.id === selectedItemId ? { ...item, position: { x, y } } : item));

      setItems(updatedItems);
      addHistory(updatedItems);
    }

    setSelectedItemId(null);
  };

  // Other utility functions (resize, remove, reset, etc.)
  const handleResize = (id: string, increment: number) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, size: Math.max(10, item.size + increment) } : item));
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

  // Modal submit handler
  const handleModalSubmit = () => {
    if (inputQuantity <= 0) {
      toast.error("Please enter a valid quantity greater than zero.");
      return;
    }

    if (!modalData) {
      toast.error("No valid data for submission.");
      return;
    }

    setPositionLock(false);
    handleInteraction(modalData.chemical, modalData.targetInstrument);

    closeModal();
  };

  // Effects and animations
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (reactionEquation) {
      timer = setTimeout(() => {
        setReactionEquation(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [reactionEquation]);

  // Toolbox visibility handlers
  const showToolbox = (id: string) => {
    if (toolboxTimeout) {
      clearTimeout(toolboxTimeout);
    }
    setToolBoxVisible((prev) => ({ ...prev, [id]: true }));
  };

  const hideToolbox = (id: string) => {
    const timeout = setTimeout(() => {
      setToolBoxVisible((prev) => ({ ...prev, [id]: false }));
    }, 400);
    setToolboxTimeout(timeout as unknown as number);
  };

  const cancelHideToolbox = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (toolboxTimeout) {
      clearTimeout(toolboxTimeout);
      setToolboxTimeout(null);
    }
    setToolBoxVisible((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col h-full">
      <ActionBar undo={undo} redo={redo} clearWorkspace={resetWorkspace} />
      <div className="relative flex-1 bg-gradient-to-r from-[#171717] via-[#171717] to-[#171717] border-t border-gray-200 overflow-hidden" ref={workspaceRef} onDragOver={handleDragOver} onDrop={handleDrop}>
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
            onClick={() => showToolbox(item.id)}
            onDoubleClick={() => handleResize(item.id, 50)}
            onMouseEnter={() => showToolbox(item.id)}
            onMouseLeave={() => hideToolbox(item.id)}
          >
            <div className="flex flex-col items-center">
              {item.type === "instrument" ? (
                <div className="relative inline-block">
                  <Image id={`instrument-${item.id}`} className="" src={item.icon || "/instruments/beaker.svg"} alt={`${item.name} icon`} width={item.size} height={item.size} />
                  <div id={`chemical-reaction-${item.id}`} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"></div>
                </div>
              ) : (
                <div>
                  <Image id={`pipette-${item.id}`} src={"/instruments/pipette.svg"} alt={`${item.name} icon`} width={item.size} height={item.size} />
                </div>
              )}

              <div className="flex flex-col items-center">
                {toolBoxVisible[item.id] && (
                  <div className="absolute flex items-center gap-2 p-2 rounded" onMouseEnter={(e) => cancelHideToolbox(e, item.id)} onMouseLeave={() => hideToolbox(item.id)}>
                    <Button onClick={() => handleRemove(item.id)} className="bg-transparent text-red-600 hover:text-red-800 text-xs hover:bg-muted rounded-full">
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                    {item.type === "instrument" && (
                      <Button onClick={() => startReaction(item.id)} className="bg-transparent text-green-600 hover:text-green-800 text-xs hover:bg-muted rounded-full">
                        {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResize(item.id, 50);
                      }}
                      className="bg-transparent text-blue-600 hover:text-blue-800 text-xs hover:bg-muted rounded-full"
                    >
                      <ScalingIcon className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && modalData && (
        <div className="z-5 flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black/50">
          <div className="bg-black p-6 w-full max-w-md rounded-md">
            <h3 className="text-lg font-semibold text-white mb-4">Enter Quantity of {modalData.chemical.name}:</h3>
            <Input type="number" value={inputQuantity} onChange={(e) => setInputQuantity(Number(e.target.value))} min={1} placeholder="Quantity" className="text-white p-2 w-full rounded-md" />
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="destructive" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleModalSubmit} variant="default">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {reactionEquation && <ReactionEquationBox equation={reactionEquation} />}
    </div>
  );
};

export default Workspace;
