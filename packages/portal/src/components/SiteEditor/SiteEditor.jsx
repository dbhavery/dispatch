/**
 * Dispatch Site Editor
 * Drag-and-drop WYSIWYG editor for portal content management
 * Allows editing text, images, pricing tables, and module layouts
 * Created: 2026-01-26
 */

import { useState, useCallback } from 'react';
import styles from './SiteEditor.module.css';

// Module types available for drag-and-drop
const MODULE_TYPES = [
  { id: 'text', label: 'Text Block', icon: 'T' },
  { id: 'heading', label: 'Heading', icon: 'H' },
  { id: 'image', label: 'Image', icon: '🖼' },
  { id: 'pricing', label: 'Pricing Table', icon: '$' },
  { id: 'button', label: 'Button', icon: '▢' },
  { id: 'divider', label: 'Divider', icon: '—' },
];

// Default content for new modules
const getDefaultContent = (type) => {
  switch (type) {
    case 'text':
      return { text: 'Enter your text here...' };
    case 'heading':
      return { text: 'Heading Text', level: 'h2' };
    case 'image':
      return { src: '', alt: 'Image description' };
    case 'pricing':
      return {
        tiers: [
          { name: 'Basic', price: 49, features: ['Feature 1', 'Feature 2'] },
          { name: 'Premium', price: 89, features: ['All Basic features', 'Premium support'] },
        ]
      };
    case 'button':
      return { text: 'Click Here', url: '#', variant: 'primary' };
    case 'divider':
      return { style: 'gradient' };
    default:
      return {};
  }
};

// Individual Module Editor Component
function ModuleEditor({ module, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (key, value) => {
    onUpdate({ ...module, content: { ...module.content, [key]: value } });
  };

  const renderEditor = () => {
    switch (module.type) {
      case 'text':
        return (
          <textarea
            value={module.content.text}
            onChange={(e) => handleContentChange('text', e.target.value)}
            className={styles.textareaInput}
            rows={4}
          />
        );
      case 'heading':
        return (
          <div className={styles.headingEditor}>
            <input
              type="text"
              value={module.content.text}
              onChange={(e) => handleContentChange('text', e.target.value)}
              className={styles.textInput}
            />
            <select
              value={module.content.level}
              onChange={(e) => handleContentChange('level', e.target.value)}
              className={styles.selectInput}
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </div>
        );
      case 'image':
        return (
          <div className={styles.imageEditor}>
            <input
              type="text"
              value={module.content.src}
              onChange={(e) => handleContentChange('src', e.target.value)}
              placeholder="Image URL"
              className={styles.textInput}
            />
            <input
              type="text"
              value={module.content.alt}
              onChange={(e) => handleContentChange('alt', e.target.value)}
              placeholder="Alt text"
              className={styles.textInput}
            />
          </div>
        );
      case 'button':
        return (
          <div className={styles.buttonEditor}>
            <input
              type="text"
              value={module.content.text}
              onChange={(e) => handleContentChange('text', e.target.value)}
              placeholder="Button text"
              className={styles.textInput}
            />
            <input
              type="text"
              value={module.content.url}
              onChange={(e) => handleContentChange('url', e.target.value)}
              placeholder="URL"
              className={styles.textInput}
            />
            <select
              value={module.content.variant}
              onChange={(e) => handleContentChange('variant', e.target.value)}
              className={styles.selectInput}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </div>
        );
      default:
        return <div className={styles.noEditor}>No editor available</div>;
    }
  };

  const renderPreview = () => {
    switch (module.type) {
      case 'text':
        return <p className={styles.previewText}>{module.content.text}</p>;
      case 'heading':
        const HeadingTag = module.content.level;
        return <HeadingTag className={styles.previewHeading}>{module.content.text}</HeadingTag>;
      case 'image':
        return module.content.src ? (
          <img src={module.content.src} alt={module.content.alt} className={styles.previewImage} />
        ) : (
          <div className={styles.imagePlaceholder}>Image: {module.content.alt || 'No image'}</div>
        );
      case 'pricing':
        return (
          <div className={styles.previewPricing}>
            {module.content.tiers.map((tier, i) => (
              <div key={i} className={styles.pricingTier}>
                <div className={styles.tierName}>{tier.name}</div>
                <div className={styles.tierPrice}>${tier.price}/mo</div>
              </div>
            ))}
          </div>
        );
      case 'button':
        return (
          <button className={`${styles.previewButton} ${styles[module.content.variant]}`}>
            {module.content.text}
          </button>
        );
      case 'divider':
        return <div className={styles.previewDivider} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.moduleCard} ${isEditing ? styles.moduleEditing : ''}`}>
      {/* Module Header */}
      <div className={styles.moduleHeader}>
        <div className={styles.moduleType}>
          <span className={styles.moduleIcon}>
            {MODULE_TYPES.find(t => t.id === module.type)?.icon}
          </span>
          <span>{MODULE_TYPES.find(t => t.id === module.type)?.label}</span>
        </div>
        <div className={styles.moduleActions}>
          <button
            onClick={() => onMoveUp()}
            disabled={isFirst}
            className={styles.actionBtn}
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => onMoveDown()}
            disabled={isLast}
            className={styles.actionBtn}
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`${styles.actionBtn} ${isEditing ? styles.actionBtnActive : ''}`}
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete()}
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      {/* Module Content */}
      <div className={styles.moduleContent}>
        {isEditing ? renderEditor() : renderPreview()}
      </div>
    </div>
  );
}

// Main Site Editor Component
export default function SiteEditor({ className = '' }) {
  const [modules, setModules] = useState([
    { id: '1', type: 'heading', content: { text: 'Fuel Delivered. No Hassle.', level: 'h1' } },
    { id: '2', type: 'text', content: { text: 'Skip the gas station. Get fuel delivered directly to your vehicle.' } },
    { id: '3', type: 'button', content: { text: 'Get Started', url: '/start', variant: 'primary' } },
  ]);
  const [draggedType, setDraggedType] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Generate unique ID
  const generateId = () => `module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add new module
  const addModule = useCallback((type) => {
    const newModule = {
      id: generateId(),
      type,
      content: getDefaultContent(type),
    };
    setModules(prev => [...prev, newModule]);
    setHasChanges(true);
  }, []);

  // Update module
  const updateModule = useCallback((id, updatedModule) => {
    setModules(prev => prev.map(m => m.id === id ? updatedModule : m));
    setHasChanges(true);
  }, []);

  // Delete module
  const deleteModule = useCallback((id) => {
    setModules(prev => prev.filter(m => m.id !== id));
    setHasChanges(true);
  }, []);

  // Move module up
  const moveModuleUp = useCallback((index) => {
    if (index === 0) return;
    setModules(prev => {
      const newModules = [...prev];
      [newModules[index - 1], newModules[index]] = [newModules[index], newModules[index - 1]];
      return newModules;
    });
    setHasChanges(true);
  }, []);

  // Move module down
  const moveModuleDown = useCallback((index) => {
    setModules(prev => {
      if (index === prev.length - 1) return prev;
      const newModules = [...prev];
      [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
      return newModules;
    });
    setHasChanges(true);
  }, []);

  // Handle drag start
  const handleDragStart = (type) => {
    setDraggedType(type);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedType(null);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedType) {
      addModule(draggedType);
    }
    setDraggedType(null);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Publish changes
  const handlePublish = () => {
    // In production, this would save to backend
    console.log('Publishing modules:', modules);
    setHasChanges(false);
    alert('Changes published successfully!');
  };

  return (
    <div className={`${styles.editor} ${className}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarTitle}>Site Editor</div>
        <button
          onClick={handlePublish}
          disabled={!hasChanges}
          className={`${styles.publishBtn} ${hasChanges ? styles.publishBtnActive : ''}`}
        >
          {hasChanges ? 'Publish Changes' : 'No Changes'}
        </button>
      </div>

      <div className={styles.editorLayout}>
        {/* Sidebar - Module Palette */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Modules</div>
          <div className={styles.modulePalette}>
            {MODULE_TYPES.map(type => (
              <div
                key={type.id}
                className={styles.paletteItem}
                draggable
                onDragStart={() => handleDragStart(type.id)}
                onDragEnd={handleDragEnd}
                onClick={() => addModule(type.id)}
              >
                <span className={styles.paletteIcon}>{type.icon}</span>
                <span className={styles.paletteLabel}>{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div
          className={`${styles.canvas} ${draggedType ? styles.canvasDragOver : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {modules.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Drag modules here or click to add</p>
            </div>
          ) : (
            <div className={styles.moduleList}>
              {modules.map((module, index) => (
                <ModuleEditor
                  key={module.id}
                  module={module}
                  onUpdate={(updated) => updateModule(module.id, updated)}
                  onDelete={() => deleteModule(module.id)}
                  onMoveUp={() => moveModuleUp(index)}
                  onMoveDown={() => moveModuleDown(index)}
                  isFirst={index === 0}
                  isLast={index === modules.length - 1}
                />
              ))}
            </div>
          )}

          {/* Drop zone indicator */}
          {draggedType && (
            <div className={styles.dropZone}>
              Drop here to add {MODULE_TYPES.find(t => t.id === draggedType)?.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
