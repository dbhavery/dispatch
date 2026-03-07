/**
 * BlockSidebar Component
 * Displays available blocks organized by category for drag-and-drop
 */

import { useState } from 'react';
import { BLOCK_CATEGORIES, BLOCK_TYPES } from '../../utils/blockRegistry';
import styles from './BlockSidebar.module.css';

function BlockSidebar({ onDragStart, onAddBlock }) {
  const [expandedCategory, setExpandedCategory] = useState('layout');
  const [searchQuery, setSearchQuery] = useState('');

  // Get blocks filtered by search
  const getFilteredBlocks = () => {
    const allBlocks = Object.values(BLOCK_TYPES);
    if (!searchQuery.trim()) return allBlocks;

    const query = searchQuery.toLowerCase();
    return allBlocks.filter(block =>
      block.label.toLowerCase().includes(query) ||
      block.description.toLowerCase().includes(query)
    );
  };

  // Group blocks by category
  const getBlocksByCategory = (category) => {
    return getFilteredBlocks().filter(block => block.category === category);
  };

  // Handle drag start
  const handleDragStart = (e, blockType) => {
    e.dataTransfer.setData('blockType', blockType);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart?.(blockType);
  };

  // Handle click to add (alternative to drag)
  const handleClick = (blockType) => {
    onAddBlock?.(blockType);
  };

  // Render block icon
  const renderIcon = (iconPath) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      className={styles.blockIcon}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
  );

  const filteredBlocks = getFilteredBlocks();
  const hasSearchResults = searchQuery.trim() && filteredBlocks.length > 0;

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>BLOCKS</h3>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.categories}>
        {/* Show flat list when searching */}
        {hasSearchResults ? (
          <div className={styles.searchResults}>
            <span className={styles.resultsCount}>
              {filteredBlocks.length} block{filteredBlocks.length !== 1 ? 's' : ''} found
            </span>
            <div className={styles.blockGrid}>
              {filteredBlocks.map(block => (
                <div
                  key={block.type}
                  className={styles.blockItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.type)}
                  onClick={() => handleClick(block.type)}
                  title={block.description}
                >
                  <div className={styles.blockIconWrapper}>
                    {renderIcon(block.icon)}
                  </div>
                  <span className={styles.blockLabel}>{block.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : searchQuery.trim() ? (
          <div className={styles.noResults}>
            <p>No blocks found</p>
            <button
              className={styles.clearBtn}
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          </div>
        ) : (
          /* Show categorized blocks */
          Object.entries(BLOCK_CATEGORIES).map(([categoryKey, category]) => {
            const categoryBlocks = getBlocksByCategory(categoryKey);
            if (categoryBlocks.length === 0) return null;

            const isExpanded = expandedCategory === categoryKey;

            return (
              <div key={categoryKey} className={styles.category}>
                <button
                  className={styles.categoryHeader}
                  onClick={() => setExpandedCategory(isExpanded ? null : categoryKey)}
                  aria-expanded={isExpanded}
                >
                  <span className={styles.categoryLabel}>{category.label}</span>
                  <span className={styles.categoryCount}>{categoryBlocks.length}</span>
                  <svg
                    className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isExpanded && (
                  <div className={styles.blockGrid}>
                    {categoryBlocks.map(block => (
                      <div
                        key={block.type}
                        className={styles.blockItem}
                        draggable
                        onDragStart={(e) => handleDragStart(e, block.type)}
                        onClick={() => handleClick(block.type)}
                        title={block.description}
                      >
                        <div className={styles.blockIconWrapper}>
                          {renderIcon(block.icon)}
                        </div>
                        <span className={styles.blockLabel}>{block.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className={styles.footer}>
        <p className={styles.hint}>
          Drag blocks to canvas or click to add
        </p>
      </div>
    </div>
  );
}

export default BlockSidebar;
