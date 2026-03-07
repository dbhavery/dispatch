/**
 * usePageEditor Hook
 * State management for the Website Editor
 */

import { useState, useCallback, useRef } from 'react';
import { createBlock } from '../utils/blockRegistry';

const MAX_HISTORY = 50;

export function usePageEditor(initialBlocks = []) {
  // Page state
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Drag state
  const [draggedBlockType, setDraggedBlockType] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // History for undo/redo
  const historyRef = useRef([initialBlocks]);
  const historyIndexRef = useRef(0);

  // Get selected block
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  // Push state to history
  const pushHistory = useCallback((newBlocks) => {
    const currentIndex = historyIndexRef.current;
    const newHistory = historyRef.current.slice(0, currentIndex + 1);
    newHistory.push(newBlocks);
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    } else {
      historyIndexRef.current = newHistory.length - 1;
    }
    historyRef.current = newHistory;
  }, []);

  // Add block at index
  const addBlock = useCallback((type, index = blocks.length) => {
    const newBlock = createBlock(type);
    if (!newBlock) return null;

    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
    setIsDirty(true);
    pushHistory(newBlocks);
    return newBlock;
  }, [blocks, pushHistory]);

  // Update block props
  const updateBlock = useCallback((blockId, updates) => {
    const newBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          props: { ...block.props, ...updates }
        };
      }
      return block;
    });
    setBlocks(newBlocks);
    setIsDirty(true);
    pushHistory(newBlocks);
  }, [blocks, pushHistory]);

  // Delete block
  const deleteBlock = useCallback((blockId) => {
    const newBlocks = blocks.filter(b => b.id !== blockId);
    setBlocks(newBlocks);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    setIsDirty(true);
    pushHistory(newBlocks);
  }, [blocks, selectedBlockId, pushHistory]);

  // Duplicate block
  const duplicateBlock = useCallback((blockId) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return null;

    const original = blocks[index];
    const duplicate = {
      ...original,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      props: { ...original.props }
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, duplicate);
    setBlocks(newBlocks);
    setSelectedBlockId(duplicate.id);
    setIsDirty(true);
    pushHistory(newBlocks);
    return duplicate;
  }, [blocks, pushHistory]);

  // Move block up/down
  const moveBlock = useCallback((blockId, direction) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(newIndex, 0, moved);
    setBlocks(newBlocks);
    setIsDirty(true);
    pushHistory(newBlocks);
  }, [blocks, pushHistory]);

  // Reorder blocks (drag and drop)
  const reorderBlocks = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    setBlocks(newBlocks);
    setIsDirty(true);
    pushHistory(newBlocks);
  }, [blocks, pushHistory]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      setBlocks(historyRef.current[historyIndexRef.current]);
      setIsDirty(true);
    }
  }, []);

  // Redo
  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      setBlocks(historyRef.current[historyIndexRef.current]);
      setIsDirty(true);
    }
  }, []);

  // Check if can undo/redo
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  // Reset dirty state (after save)
  const markClean = useCallback(() => {
    setIsDirty(false);
  }, []);

  // Load blocks (from API)
  const loadBlocks = useCallback((newBlocks) => {
    setBlocks(newBlocks);
    setSelectedBlockId(null);
    setIsDirty(false);
    historyRef.current = [newBlocks];
    historyIndexRef.current = 0;
  }, []);

  // Drag handlers for sidebar blocks
  const handleDragStart = useCallback((blockType) => {
    setDraggedBlockType(blockType);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedBlockType && dragOverIndex !== null) {
      addBlock(draggedBlockType, dragOverIndex);
    }
    setDraggedBlockType(null);
    setDragOverIndex(null);
  }, [draggedBlockType, dragOverIndex, addBlock]);

  const handleDragOver = useCallback((index) => {
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  return {
    // State
    blocks,
    selectedBlockId,
    selectedBlock,
    isDirty,
    draggedBlockType,
    dragOverIndex,

    // Block operations
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    reorderBlocks,

    // Selection
    setSelectedBlockId,
    selectBlock: setSelectedBlockId,

    // History
    undo,
    redo,
    canUndo,
    canRedo,

    // Persistence
    markClean,
    loadBlocks,

    // Drag handlers
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
  };
}

export default usePageEditor;
