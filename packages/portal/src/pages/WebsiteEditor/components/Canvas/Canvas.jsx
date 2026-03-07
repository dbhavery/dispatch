/**
 * Canvas Component
 * Main editing area for the Website Editor
 * Handles block rendering, selection, and drag-drop reordering
 */

import { useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { getBlockDefinition } from '../../utils/blockRegistry';
import styles from './Canvas.module.css';

function Canvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onDrop,
  dragOverIndex,
  onDragOver,
  onDragLeave,
}) {
  const canvasRef = useRef(null);
  const [draggingBlockId, setDraggingBlockId] = useState(null);

  // Handle drag start for reordering existing blocks
  const handleBlockDragStart = (e, blockId, index) => {
    setDraggingBlockId(blockId);
    e.dataTransfer.setData('blockId', blockId);
    e.dataTransfer.setData('fromIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag end
  const handleBlockDragEnd = () => {
    setDraggingBlockId(null);
  };

  // Handle drag over for drop zones
  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = e.dataTransfer.types.includes('blocktype') ? 'copy' : 'move';
    onDragOver?.(index);
  };

  // Handle drop
  const handleDrop = (e, toIndex) => {
    e.preventDefault();

    const blockType = e.dataTransfer.getData('blockType');
    const blockId = e.dataTransfer.getData('blockId');
    const fromIndex = e.dataTransfer.getData('fromIndex');

    if (blockType) {
      // New block from sidebar
      onDrop?.(blockType, toIndex);
    } else if (blockId && fromIndex !== '') {
      // Reordering existing block
      const from = parseInt(fromIndex, 10);
      if (from !== toIndex && from !== toIndex - 1) {
        onMoveBlock?.(from, toIndex > from ? toIndex - 1 : toIndex);
      }
    }

    onDragLeave?.();
    setDraggingBlockId(null);
  };

  // Render block preview based on type
  const renderBlockPreview = (block) => {
    const definition = getBlockDefinition(block.type);
    if (!definition) return <div className={styles.unknownBlock}>Unknown block type</div>;

    // Simplified preview renderers for each block type
    switch (block.type) {
      case 'hero':
        return (
          <div
            className={styles.heroPreview}
            style={{ backgroundColor: block.props.backgroundColor }}
          >
            <div className={styles.heroContent} style={{ textAlign: block.props.textAlignment }}>
              <h2 className={styles.heroTitle}>{block.props.title}</h2>
              {block.props.subtitle && (
                <p className={styles.heroSubtitle}>{block.props.subtitle}</p>
              )}
              {block.props.ctaText && (
                <button className={styles.heroCta}>{block.props.ctaText}</button>
              )}
            </div>
          </div>
        );

      case 'sectionHeader':
        return (
          <div className={styles.sectionHeaderPreview} style={{ textAlign: block.props.alignment }}>
            <h3 className={styles.sectionTitle}>{block.props.title}</h3>
            {block.props.subtitle && (
              <p className={styles.sectionSubtitle}>{block.props.subtitle}</p>
            )}
          </div>
        );

      case 'separator':
        return (
          <div className={styles.separatorPreview}>
            <hr
              className={styles.separator}
              style={{
                borderStyle: block.props.style,
                borderColor: block.props.color,
              }}
            />
          </div>
        );

      case 'featureGrid':
        return (
          <div
            className={styles.featureGridPreview}
            style={{ gridTemplateColumns: `repeat(${block.props.columns}, 1fr)` }}
          >
            {block.props.features?.slice(0, 6).map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>✓</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        );

      case 'stepsGrid':
        return (
          <div
            className={`${styles.stepsPreview} ${block.props.layout === 'vertical' ? styles.stepsVertical : ''}`}
          >
            {block.props.steps?.slice(0, 4).map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        );

      case 'ctaSection':
        return (
          <div
            className={styles.ctaPreview}
            style={{ backgroundColor: block.props.backgroundColor }}
          >
            <h3 className={styles.ctaTitle}>{block.props.title}</h3>
            <p className={styles.ctaDesc}>{block.props.description}</p>
            <button className={`${styles.ctaButton} ${styles[block.props.buttonStyle]}`}>
              {block.props.buttonText}
            </button>
          </div>
        );

      case 'image':
        return (
          <div className={styles.imagePreview} style={{ textAlign: block.props.alignment }}>
            {block.props.src ? (
              <img
                src={block.props.src}
                alt={block.props.alt}
                className={`${styles.image} ${styles[`image${block.props.size}`]}`}
              />
            ) : (
              <div className={`${styles.imagePlaceholder} ${styles[`image${block.props.size}`]}`}>
                <span>No image selected</span>
              </div>
            )}
            {block.props.caption && (
              <p className={styles.imageCaption}>{block.props.caption}</p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className={styles.videoPreview}>
            {block.props.url ? (
              <div className={styles.videoWrapper}>
                <div className={styles.videoPlaceholder}>
                  <span>Video: {block.props.url}</span>
                </div>
              </div>
            ) : (
              <div className={styles.videoEmpty}>
                <span>No video URL</span>
              </div>
            )}
          </div>
        );

      case 'richText':
        return (
          <div
            className={styles.richTextPreview}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.props.content) }}
          />
        );

      case 'header':
        return (
          <div className={styles.headerPreview}>
            <div className={styles.headerLogo}>{block.props.logoText}</div>
            <nav className={styles.headerNav}>
              {block.props.navLinks?.slice(0, 4).map((link, i) => (
                <span key={i} className={styles.navLink}>{link.label}</span>
              ))}
            </nav>
            <button className={styles.headerCta}>{block.props.ctaText}</button>
          </div>
        );

      case 'footer':
        return (
          <div className={styles.footerPreview}>
            <div className={styles.footerColumns}>
              {block.props.columns?.slice(0, 3).map((col, i) => (
                <div key={i} className={styles.footerColumn}>
                  <h5 className={styles.footerColTitle}>{col.title}</h5>
                  {col.links?.slice(0, 3).map((link, j) => (
                    <span key={j} className={styles.footerLink}>{link.label}</span>
                  ))}
                </div>
              ))}
            </div>
            <p className={styles.footerCopyright}>{block.props.copyright}</p>
          </div>
        );

      default:
        return (
          <div className={styles.genericPreview}>
            <span className={styles.blockType}>{definition.label}</span>
          </div>
        );
    }
  };

  // Render block wrapper with controls
  const renderBlock = (block, index) => {
    const isSelected = selectedBlockId === block.id;
    const isDragging = draggingBlockId === block.id;
    const definition = getBlockDefinition(block.type);

    return (
      <div key={block.id} className={styles.blockWrapper}>
        {/* Drop zone before block */}
        <div
          className={`${styles.dropZone} ${dragOverIndex === index ? styles.dropZoneActive : ''}`}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={onDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        />

        {/* Block */}
        <div
          className={`${styles.block} ${isSelected ? styles.blockSelected : ''} ${isDragging ? styles.blockDragging : ''}`}
          onClick={() => onSelectBlock?.(block.id)}
          draggable
          onDragStart={(e) => handleBlockDragStart(e, block.id, index)}
          onDragEnd={handleBlockDragEnd}
        >
          {/* Block controls */}
          <div className={styles.blockControls}>
            <span className={styles.blockLabel}>{definition?.label || block.type}</span>
            <div className={styles.controlButtons}>
              <button
                className={styles.controlBtn}
                onClick={(e) => { e.stopPropagation(); onMoveBlock?.(index, index - 1); }}
                disabled={index === 0}
                title="Move up"
              >
                ↑
              </button>
              <button
                className={styles.controlBtn}
                onClick={(e) => { e.stopPropagation(); onMoveBlock?.(index, index + 1); }}
                disabled={index === blocks.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button
                className={styles.controlBtn}
                onClick={(e) => { e.stopPropagation(); onDuplicateBlock?.(block.id); }}
                title="Duplicate"
              >
                ⧉
              </button>
              <button
                className={`${styles.controlBtn} ${styles.deleteBtn}`}
                onClick={(e) => { e.stopPropagation(); onDeleteBlock?.(block.id); }}
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>

          {/* Block preview */}
          <div className={styles.blockContent}>
            {renderBlockPreview(block)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.canvas} ref={canvasRef}>
      <div className={styles.canvasInner}>
        {blocks.length === 0 ? (
          <div
            className={`${styles.emptyState} ${dragOverIndex === 0 ? styles.emptyStateActive : ''}`}
            onDragOver={(e) => handleDragOver(e, 0)}
            onDragLeave={onDragLeave}
            onDrop={(e) => handleDrop(e, 0)}
          >
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>Start Building</h3>
            <p className={styles.emptyText}>
              Drag blocks from the sidebar or click to add them here
            </p>
          </div>
        ) : (
          <>
            {blocks.map((block, index) => renderBlock(block, index))}

            {/* Final drop zone */}
            <div
              className={`${styles.dropZone} ${styles.dropZoneFinal} ${dragOverIndex === blocks.length ? styles.dropZoneActive : ''}`}
              onDragOver={(e) => handleDragOver(e, blocks.length)}
              onDragLeave={onDragLeave}
              onDrop={(e) => handleDrop(e, blocks.length)}
            >
              <span>Drop here to add at end</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Canvas;
