/**
 * PropertiesPanel Component
 * Edit properties of the selected block
 */

import { useState } from 'react';
import { getBlockDefinition } from '../../utils/blockRegistry';
import styles from './PropertiesPanel.module.css';

function PropertiesPanel({ block, onUpdate, onDelete, onDuplicate }) {
  const [expandedArrays, setExpandedArrays] = useState({});

  if (!block) {
    return (
      <div className={styles.panel}>
        <div className={styles.emptyState}>
          <p>Select a block to edit its properties</p>
        </div>
      </div>
    );
  }

  const definition = getBlockDefinition(block.type);
  if (!definition) {
    return (
      <div className={styles.panel}>
        <div className={styles.emptyState}>
          <p>Unknown block type</p>
        </div>
      </div>
    );
  }

  // Handle property change
  const handleChange = (key, value) => {
    onUpdate?.({ [key]: value });
  };

  // Handle array item change
  const handleArrayItemChange = (arrayKey, index, itemKey, value) => {
    const currentArray = [...(block.props[arrayKey] || [])];
    currentArray[index] = { ...currentArray[index], [itemKey]: value };
    handleChange(arrayKey, currentArray);
  };

  // Add array item
  const handleAddArrayItem = (arrayKey, itemSchema) => {
    const currentArray = [...(block.props[arrayKey] || [])];
    const newItem = {};
    Object.keys(itemSchema).forEach(key => {
      newItem[key] = '';
    });
    currentArray.push(newItem);
    handleChange(arrayKey, currentArray);
  };

  // Remove array item
  const handleRemoveArrayItem = (arrayKey, index) => {
    const currentArray = [...(block.props[arrayKey] || [])];
    currentArray.splice(index, 1);
    handleChange(arrayKey, currentArray);
  };

  // Handle string array change
  const handleStringArrayChange = (key, index, value) => {
    const currentArray = [...(block.props[key] || [])];
    currentArray[index] = value;
    handleChange(key, currentArray);
  };

  // Add string to array
  const handleAddStringToArray = (key) => {
    const currentArray = [...(block.props[key] || [])];
    currentArray.push('');
    handleChange(key, currentArray);
  };

  // Remove string from array
  const handleRemoveStringFromArray = (key, index) => {
    const currentArray = [...(block.props[key] || [])];
    currentArray.splice(index, 1);
    handleChange(key, currentArray);
  };

  // Toggle array expansion
  const toggleArrayExpanded = (key) => {
    setExpandedArrays(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Render form field based on type
  const renderField = (key, fieldDef, value) => {
    switch (fieldDef.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className={styles.input}
            placeholder={fieldDef.label}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className={styles.textarea}
            placeholder={fieldDef.label}
            rows={3}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className={styles.select}
          >
            {fieldDef.options.map(opt => (
              <option key={opt} value={opt}>
                {typeof opt === 'string' ? opt.charAt(0).toUpperCase() + opt.slice(1) : opt}
              </option>
            ))}
          </select>
        );

      case 'toggle':
        return (
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
            <span className={styles.toggleSlider} />
          </label>
        );

      case 'color':
        return (
          <div className={styles.colorField}>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className={styles.input}
              placeholder="var(--gray-900) or #hex"
            />
          </div>
        );

      case 'image':
        return (
          <div className={styles.imageField}>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className={styles.input}
              placeholder="Image URL or /uploads/..."
            />
            {value && (
              <div className={styles.imagePreview}>
                <img src={value} alt="Preview" />
              </div>
            )}
          </div>
        );

      case 'richtext':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className={`${styles.textarea} ${styles.richTextArea}`}
            placeholder="Enter HTML content..."
            rows={6}
          />
        );

      case 'array':
        const isExpanded = expandedArrays[key] !== false;
        const items = value || [];
        return (
          <div className={styles.arrayField}>
            <button
              className={styles.arrayToggle}
              onClick={() => toggleArrayExpanded(key)}
            >
              <span>{isExpanded ? '▼' : '▶'}</span>
              <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </button>
            {isExpanded && (
              <div className={styles.arrayItems}>
                {items.map((item, index) => (
                  <div key={index} className={styles.arrayItem}>
                    <div className={styles.arrayItemHeader}>
                      <span className={styles.arrayItemIndex}>#{index + 1}</span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemoveArrayItem(key, index)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                    <div className={styles.arrayItemFields}>
                      {Object.entries(fieldDef.itemSchema).map(([itemKey, itemFieldDef]) => (
                        <div key={itemKey} className={styles.field}>
                          <label className={styles.fieldLabel}>{itemFieldDef.label}</label>
                          {itemFieldDef.type === 'textarea' ? (
                            <textarea
                              value={item[itemKey] || ''}
                              onChange={(e) => handleArrayItemChange(key, index, itemKey, e.target.value)}
                              className={styles.textarea}
                              rows={2}
                            />
                          ) : (
                            <input
                              type="text"
                              value={item[itemKey] || ''}
                              onChange={(e) => handleArrayItemChange(key, index, itemKey, e.target.value)}
                              className={styles.input}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  className={styles.addBtn}
                  onClick={() => handleAddArrayItem(key, fieldDef.itemSchema)}
                >
                  + Add Item
                </button>
              </div>
            )}
          </div>
        );

      case 'stringArray':
        const stringItems = value || [];
        return (
          <div className={styles.stringArrayField}>
            {stringItems.map((item, index) => (
              <div key={index} className={styles.stringArrayItem}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleStringArrayChange(key, index, e.target.value)}
                  className={styles.input}
                />
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveStringFromArray(key, index)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() => handleAddStringToArray(key)}
            >
              + Add Item
            </button>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className={styles.input}
          />
        );
    }
  };

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{definition.label}</h3>
        <p className={styles.description}>{definition.description}</p>
      </div>

      {/* Properties Form */}
      <div className={styles.form}>
        {Object.entries(definition.schema).map(([key, fieldDef]) => (
          <div key={key} className={styles.field}>
            <label className={styles.fieldLabel}>
              {fieldDef.label}
              {fieldDef.required && <span className={styles.required}>*</span>}
            </label>
            {renderField(key, fieldDef, block.props[key])}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={() => onDuplicate?.(block.id)}
        >
          Duplicate Block
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete?.(block.id)}
        >
          Delete Block
        </button>
      </div>
    </div>
  );
}

export default PropertiesPanel;
