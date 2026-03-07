/**
 * Website Editor - Site Content Manager for dispatch.app
 * Edit all content, pricing, and media for the Dispatch landing page
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SITE_CONTENT } from './data/siteContent';
import styles from './WebsiteEditor.module.css';

// Section tabs
const TABS = [
  { id: 'hero', label: 'Hero', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
  { id: 'features', label: 'Features', icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'howItWorks', label: 'How It Works', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id: 'pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'cta', label: 'CTA', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { id: 'franchise', label: 'Franchise', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'footer', label: 'Footer', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z' },
  { id: 'brand', label: 'Brand', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: 'media', label: 'Media Library', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

function WebsiteEditor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(SITE_CONTENT);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Update nested content
  const updateContent = (path, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
    setIsDirty(true);
  };

  // Update array item
  const updateArrayItem = (arrayPath, index, field, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let arr = newContent;
      for (const key of keys) {
        arr = arr[key];
      }
      if (field.includes('.')) {
        const fieldKeys = field.split('.');
        let obj = arr[index];
        for (let i = 0; i < fieldKeys.length - 1; i++) {
          obj = obj[fieldKeys[i]];
        }
        obj[fieldKeys[fieldKeys.length - 1]] = value;
      } else {
        arr[index][field] = value;
      }
      return newContent;
    });
    setIsDirty(true);
  };

  // Update array item's nested array (like bullets)
  const updateNestedArray = (arrayPath, index, nestedField, nestedIndex, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let arr = newContent;
      for (const key of keys) {
        arr = arr[key];
      }
      const fieldKeys = nestedField.split('.');
      let obj = arr[index];
      for (let i = 0; i < fieldKeys.length - 1; i++) {
        obj = obj[fieldKeys[i]];
      }
      obj[fieldKeys[fieldKeys.length - 1]][nestedIndex] = value;
      return newContent;
    });
    setIsDirty(true);
  };

  // Add item to nested array
  const addToNestedArray = (arrayPath, index, nestedField, defaultValue = '') => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let arr = newContent;
      for (const key of keys) {
        arr = arr[key];
      }
      const fieldKeys = nestedField.split('.');
      let obj = arr[index];
      for (let i = 0; i < fieldKeys.length - 1; i++) {
        obj = obj[fieldKeys[i]];
      }
      obj[fieldKeys[fieldKeys.length - 1]].push(defaultValue);
      return newContent;
    });
    setIsDirty(true);
  };

  // Remove from nested array
  const removeFromNestedArray = (arrayPath, index, nestedField, nestedIndex) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let arr = newContent;
      for (const key of keys) {
        arr = arr[key];
      }
      const fieldKeys = nestedField.split('.');
      let obj = arr[index];
      for (let i = 0; i < fieldKeys.length - 1; i++) {
        obj = obj[fieldKeys[i]];
      }
      obj[fieldKeys[fieldKeys.length - 1]].splice(nestedIndex, 1);
      return newContent;
    });
    setIsDirty(true);
  };

  // Save content
  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Save to API/database
      // For now, just log and show success
      console.log('[WebsiteEditor] Saving content:', content);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsDirty(false);
      setSaveMessage({ type: 'success', text: 'Changes saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  // Export content as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dispatch-site-content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render icon
  const renderIcon = (path, className = '') => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );

  // Render section based on active tab
  const renderSection = () => {
    switch (activeTab) {
      case 'hero':
        return renderHeroSection();
      case 'features':
        return renderFeaturesSection();
      case 'howItWorks':
        return renderHowItWorksSection();
      case 'pricing':
        return renderPricingSection();
      case 'cta':
        return renderCtaSection();
      case 'franchise':
        return renderFranchiseSection();
      case 'footer':
        return renderFooterSection();
      case 'brand':
        return renderBrandSection();
      case 'media':
        return renderMediaLibrary();
      default:
        return null;
    }
  };

  // ==========================================
  // HERO SECTION EDITOR
  // ==========================================
  const renderHeroSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Hero Section</h2>
        <p className={styles.sectionDesc}>Main headline and call-to-action at the top of the page</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>HEADLINE</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Main Title</span>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateContent('hero.title', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Accent Text (highlighted)</span>
            <input
              type="text"
              value={content.hero.titleAccent}
              onChange={(e) => updateContent('hero.titleAccent', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>SUBTITLE</label>
        <textarea
          value={content.hero.subtitle}
          onChange={(e) => updateContent('hero.subtitle', e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>CALL-TO-ACTION BUTTONS</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Primary Button Text</span>
            <input
              type="text"
              value={content.hero.primaryCta.text}
              onChange={(e) => updateContent('hero.primaryCta.text', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Primary Button URL</span>
            <input
              type="text"
              value={content.hero.primaryCta.url}
              onChange={(e) => updateContent('hero.primaryCta.url', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Secondary Button Text</span>
            <input
              type="text"
              value={content.hero.secondaryCta.text}
              onChange={(e) => updateContent('hero.secondaryCta.text', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>STATS</label>
        <div className={styles.statsGrid}>
          {content.hero.stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateArrayItem('hero.stats', index, 'value', e.target.value)}
                className={styles.statValue}
                placeholder="Value"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateArrayItem('hero.stats', index, 'label', e.target.value)}
                className={styles.statLabel}
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==========================================
  // FEATURES SECTION EDITOR
  // ==========================================
  const renderFeaturesSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Features Section</h2>
        <p className={styles.sectionDesc}>Four feature cards highlighting key benefits</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>SECTION HEADER</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Title</span>
            <input
              type="text"
              value={content.featuresSection.title}
              onChange={(e) => updateContent('featuresSection.title', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Subtitle</span>
            <input
              type="text"
              value={content.featuresSection.subtitle}
              onChange={(e) => updateContent('featuresSection.subtitle', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {content.features.map((feature, index) => (
        <div key={feature.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemNumber}>Feature {index + 1}</span>
            <span className={styles.itemId}>{feature.id}</span>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Icon Path</span>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Title</span>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Short Description</span>
            <input
              type="text"
              value={feature.description}
              onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Modal Heading</span>
            <input
              type="text"
              value={feature.details.heading}
              onChange={(e) => updateArrayItem('features', index, 'details.heading', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Bullet Points</span>
            {feature.details.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className={styles.bulletRow}>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateNestedArray('features', index, 'details.bullets', bulletIndex, e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFromNestedArray('features', index, 'details.bullets', bulletIndex)}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => addToNestedArray('features', index, 'details.bullets', 'New bullet point')}
            >
              + Add Bullet
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // ==========================================
  // HOW IT WORKS SECTION EDITOR
  // ==========================================
  const renderHowItWorksSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionDesc}>Three-step process explanation</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>SECTION HEADER</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Title</span>
            <input
              type="text"
              value={content.howItWorksSection.title}
              onChange={(e) => updateContent('howItWorksSection.title', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Subtitle</span>
            <input
              type="text"
              value={content.howItWorksSection.subtitle}
              onChange={(e) => updateContent('howItWorksSection.subtitle', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {content.steps.map((step, index) => (
        <div key={step.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemNumber}>Step {step.number}</span>
            <span className={styles.itemId}>{step.id}</span>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field} style={{ maxWidth: '80px' }}>
              <span className={styles.fieldHint}>Number</span>
              <input
                type="text"
                value={step.number}
                onChange={(e) => updateArrayItem('steps', index, 'number', e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Title</span>
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateArrayItem('steps', index, 'title', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Short Description</span>
            <input
              type="text"
              value={step.description}
              onChange={(e) => updateArrayItem('steps', index, 'description', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Modal Heading</span>
            <input
              type="text"
              value={step.details.heading}
              onChange={(e) => updateArrayItem('steps', index, 'details.heading', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Bullet Points</span>
            {step.details.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className={styles.bulletRow}>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateNestedArray('steps', index, 'details.bullets', bulletIndex, e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFromNestedArray('steps', index, 'details.bullets', bulletIndex)}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => addToNestedArray('steps', index, 'details.bullets', 'New bullet point')}
            >
              + Add Bullet
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // ==========================================
  // PRICING SECTION EDITOR
  // ==========================================
  const renderPricingSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Pricing Section</h2>
        <p className={styles.sectionDesc}>Subscription plans and pricing</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>SECTION HEADER</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Title</span>
            <input
              type="text"
              value={content.pricingSection.title}
              onChange={(e) => updateContent('pricingSection.title', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Subtitle</span>
            <input
              type="text"
              value={content.pricingSection.subtitle}
              onChange={(e) => updateContent('pricingSection.subtitle', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      {content.pricing.map((tier, index) => (
        <div key={tier.id} className={`${styles.itemCard} ${tier.highlight ? styles.highlighted : ''}`}>
          <div className={styles.itemHeader}>
            <span className={styles.itemNumber}>{tier.name} Plan</span>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={tier.highlight}
                onChange={(e) => updateArrayItem('pricing', index, 'highlight', e.target.checked)}
              />
              <span>Highlight as Popular</span>
            </label>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Plan Name</span>
              <input
                type="text"
                value={tier.name}
                onChange={(e) => updateArrayItem('pricing', index, 'name', e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Price</span>
              <input
                type="number"
                step="0.01"
                value={tier.price}
                onChange={(e) => updateArrayItem('pricing', index, 'price', parseFloat(e.target.value))}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Period</span>
              <input
                type="text"
                value={tier.period}
                onChange={(e) => updateArrayItem('pricing', index, 'period', e.target.value)}
                className={styles.input}
                placeholder="/week, /month, etc."
              />
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Description</span>
            <input
              type="text"
              value={tier.description}
              onChange={(e) => updateArrayItem('pricing', index, 'description', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Features List</span>
            {tier.features.map((feature, featureIndex) => (
              <div key={featureIndex} className={styles.bulletRow}>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...tier.features];
                    newFeatures[featureIndex] = e.target.value;
                    updateArrayItem('pricing', index, 'features', newFeatures);
                  }}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => {
                    const newFeatures = tier.features.filter((_, i) => i !== featureIndex);
                    updateArrayItem('pricing', index, 'features', newFeatures);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                const newFeatures = [...tier.features, 'New feature'];
                updateArrayItem('pricing', index, 'features', newFeatures);
              }}
            >
              + Add Feature
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // ==========================================
  // CTA SECTION EDITOR
  // ==========================================
  const renderCtaSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>CTA Section</h2>
        <p className={styles.sectionDesc}>Call-to-action banner between sections</p>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>TITLE</label>
          <input
            type="text"
            value={content.cta.title}
            onChange={(e) => updateContent('cta.title', e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>SUBTITLE</label>
          <input
            type="text"
            value={content.cta.subtitle}
            onChange={(e) => updateContent('cta.subtitle', e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>BUTTON TEXT</label>
            <input
              type="text"
              value={content.cta.buttonText}
              onChange={(e) => updateContent('cta.buttonText', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>BUTTON URL</label>
            <input
              type="text"
              value={content.cta.buttonUrl}
              onChange={(e) => updateContent('cta.buttonUrl', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // FRANCHISE SECTION EDITOR
  // ==========================================
  const renderFranchiseSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Franchise Section</h2>
        <p className={styles.sectionDesc}>Franchise opportunities and investor info</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>SECTION HEADER</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Prefix ("Own a")</span>
            <input
              type="text"
              value={content.franchiseSection.prefix}
              onChange={(e) => updateContent('franchiseSection.prefix', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Suffix ("Franchise")</span>
            <input
              type="text"
              value={content.franchiseSection.suffix}
              onChange={(e) => updateContent('franchiseSection.suffix', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldHint}>Subtitle</span>
          <input
            type="text"
            value={content.franchiseSection.subtitle}
            onChange={(e) => updateContent('franchiseSection.subtitle', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      {content.franchiseCards.map((card, index) => (
        <div key={card.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemNumber}>Card {index + 1}</span>
            <span className={styles.itemId}>{card.id}</span>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Icon Path</span>
              <input
                type="text"
                value={card.icon}
                onChange={(e) => updateArrayItem('franchiseCards', index, 'icon', e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Title</span>
              <input
                type="text"
                value={card.title}
                onChange={(e) => updateArrayItem('franchiseCards', index, 'title', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Description</span>
            <textarea
              value={card.description}
              onChange={(e) => updateArrayItem('franchiseCards', index, 'description', e.target.value)}
              className={styles.textarea}
              rows={2}
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldHint}>Link Text</span>
            <input
              type="text"
              value={card.linkText}
              onChange={(e) => updateArrayItem('franchiseCards', index, 'linkText', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // ==========================================
  // FOOTER SECTION EDITOR
  // ==========================================
  const renderFooterSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Footer</h2>
        <p className={styles.sectionDesc}>Footer links and copyright</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>COPYRIGHT TEXT</label>
        <input
          type="text"
          value={content.brand.copyright}
          onChange={(e) => updateContent('brand.copyright', e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>FOOTER COLUMNS</label>
        {content.footer.columns.map((column, colIndex) => (
          <div key={colIndex} className={styles.itemCard}>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Column Title</span>
              <input
                type="text"
                value={column.title}
                onChange={(e) => updateArrayItem('footer.columns', colIndex, 'title', e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldHint}>Links</span>
              {column.links.map((link, linkIndex) => (
                <div key={linkIndex} className={styles.bulletRow}>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const newLinks = [...column.links];
                      newLinks[linkIndex] = { ...link, label: e.target.value };
                      updateArrayItem('footer.columns', colIndex, 'links', newLinks);
                    }}
                    className={styles.input}
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const newLinks = [...column.links];
                      newLinks[linkIndex] = { ...link, href: e.target.value };
                      updateArrayItem('footer.columns', colIndex, 'links', newLinks);
                    }}
                    className={styles.input}
                    placeholder="URL"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================
  // BRAND SECTION EDITOR
  // ==========================================
  const renderBrandSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Brand Settings</h2>
        <p className={styles.sectionDesc}>Global brand elements used across the site</p>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>BRAND NAME</label>
          <input
            type="text"
            value={content.brand.name}
            onChange={(e) => updateContent('brand.name', e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>TAGLINE</label>
          <input
            type="text"
            value={content.brand.tagline}
            onChange={(e) => updateContent('brand.tagline', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>LOGO PATHS</label>
        <div className={styles.field}>
          <span className={styles.fieldHint}>Dark Theme Logo</span>
          <input
            type="text"
            value={content.brand.logos.dark}
            onChange={(e) => updateContent('brand.logos.dark', e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldHint}>Light Theme Logo</span>
          <input
            type="text"
            value={content.brand.logos.light}
            onChange={(e) => updateContent('brand.logos.light', e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldHint}>White Logo (for colored backgrounds)</span>
          <input
            type="text"
            value={content.brand.logos.white}
            onChange={(e) => updateContent('brand.logos.white', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>NAVIGATION</label>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Sign In URL</span>
            <input
              type="text"
              value={content.navigation.signInUrl}
              onChange={(e) => updateContent('navigation.signInUrl', e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldHint}>Sign Up URL</span>
            <input
              type="text"
              value={content.navigation.signUpUrl}
              onChange={(e) => updateContent('navigation.signUpUrl', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // MEDIA LIBRARY
  // ==========================================
  const renderMediaLibrary = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Media Library</h2>
        <p className={styles.sectionDesc}>Manage images, logos, icons, and videos</p>
      </div>

      <div className={styles.mediaCategories}>
        <div className={styles.mediaCategory}>
          <h3 className={styles.mediaCategoryTitle}>Logos</h3>
          <div className={styles.mediaGrid}>
            <div className={styles.mediaItem}>
              <img src="/logos/dispatch-logo.svg" alt="Dark Logo" />
              <span>Dark Theme</span>
            </div>
            <div className={styles.mediaItem}>
              <img src="/logos/dispatch-logo-light-transparent.svg" alt="Light Logo" />
              <span>Light Theme</span>
            </div>
            <div className={styles.mediaItem}>
              <img src="/logos/dispatch-logo-white-transparent.svg" alt="White Logo" />
              <span>White</span>
            </div>
          </div>
        </div>

        <div className={styles.mediaCategory}>
          <h3 className={styles.mediaCategoryTitle}>Icons</h3>
          <div className={styles.mediaGrid}>
            {[
              { path: '/icons/home-delivery.svg', name: 'Home Delivery' },
              { path: '/icons/clock.svg', name: 'Clock' },
              { path: '/icons/savings.svg', name: 'Savings' },
              { path: '/icons/safety.svg', name: 'Safety' },
              { path: '/icons/franchise.svg', name: 'Franchise' },
              { path: '/icons/chart.svg', name: 'Chart' },
            ].map(icon => (
              <div key={icon.path} className={styles.mediaItem}>
                <img src={icon.path} alt={icon.name} />
                <span>{icon.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.uploadSection}>
          <h3 className={styles.mediaCategoryTitle}>Upload New Media</h3>
          <div className={styles.uploadZone}>
            <input type="file" id="mediaUpload" className={styles.uploadInput} multiple />
            <label htmlFor="mediaUpload" className={styles.uploadLabel}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Click to upload or drag files here</span>
              <span className={styles.uploadHint}>PNG, JPG, SVG, MP4 up to 10MB</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.editor}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1 className={styles.headerTitle}>SITE CONTENT EDITOR</h1>
          <span className={styles.headerSubtitle}>dispatch.app</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn} onClick={handleExport}>
            Export JSON
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!isDirty || saving}
          >
            {saving ? 'Saving...' : isDirty ? 'Save Changes' : 'Saved'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Sidebar Tabs */}
        <div className={styles.sidebar}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {renderIcon(tab.icon, styles.tabIcon)}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {renderSection()}
        </div>
      </div>

      {/* Toast Message */}
      {saveMessage && (
        <div className={`${styles.toast} ${styles[saveMessage.type]}`}>
          {saveMessage.text}
        </div>
      )}
    </div>
  );
}

export default WebsiteEditor;
