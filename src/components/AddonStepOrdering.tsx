import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DetailedContentItem } from './StepContentRenderer';

interface UseCase {
  id: string;
  title: string;
}

interface UseCaseStep {
  id: string;
  title: string;
  description: string;
  detailed_content?: DetailedContentItem[];
  order_index: number;
  category: string;
  is_custom: boolean;
}

interface AddonStep {
  step_id: string | null;
  step_order: number;
  source_use_case_id: string;
  source_use_case_title?: string;
  custom_step_title?: string;
  custom_step_description?: string;
  custom_step_content?: any;
  title?: string;
  description?: string;
  category?: string;
  is_custom?: boolean;
}

interface AddonStepOrderingProps {
  baseUseCase: UseCase;
  baseSteps: UseCaseStep[];
  addonUseCase: UseCase;
  addonSteps: UseCaseStep[];
  orderedSteps: AddonStep[];
  onStepsChange: (steps: AddonStep[]) => void;
}

interface SortableStepProps {
  step: AddonStep;
  index: number;
  onRemove: (index: number) => void;
}

function SortableStep({ step, index, onRemove }: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: step.step_id 
      ? `sortable-${step.step_id}` 
      : `sortable-custom-${index}-${step.custom_step_title || 'untitled'}`
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sourceColor = step.is_custom
    ? '#fff9c4' // Yellow for custom
    : step.source_use_case_title?.includes('+')
    ? '#e8f5e9' // Green for addon
    : '#e3f2fd'; // Blue for base

  const sourceLabel = step.is_custom
    ? 'Custom'
    : step.source_use_case_title || 'Unknown';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="sortable-step"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: sourceColor,
          border: '2px solid #ddd',
          borderRadius: '6px',
          marginBottom: '8px',
        }}
      >
        <div
          {...listeners}
          style={{
            cursor: 'grab',
            padding: '8px',
            marginRight: '12px',
            fontSize: '18px',
            color: '#666',
          }}
          title="Drag to reorder"
        >
          ⋮⋮
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              backgroundColor: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
            }}>
              #{index + 1}
            </span>
            <span style={{
              fontSize: '12px',
              padding: '2px 8px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '4px',
              color: '#666',
            }}>
              {sourceLabel}
            </span>
          </div>
          <div style={{ fontWeight: '600', color: '#333', marginBottom: '2px' }}>
            {step.title || step.custom_step_title}
          </div>
          <div style={{ fontSize: '14px', color: '#555' }}>
            {step.description || step.custom_step_description}
          </div>
        </div>

        <button
          onClick={() => onRemove(index)}
          style={{
            marginLeft: '12px',
            padding: '6px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          title="Remove step"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export function AddonStepOrdering({
  baseUseCase,
  baseSteps,
  addonUseCase,
  addonSteps,
  orderedSteps,
  onStepsChange,
}: AddonStepOrderingProps) {
  const [showCustomStepForm, setShowCustomStepForm] = useState(false);
  const [customStepTitle, setCustomStepTitle] = useState('');
  const [customStepDescription, setCustomStepDescription] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize ordered steps if empty
  if (orderedSteps.length === 0 && (baseSteps.length > 0 || addonSteps.length > 0)) {
    const initialSteps: AddonStep[] = [
      ...baseSteps.map((step, idx) => ({
        step_id: step.id,
        step_order: idx + 1,
        source_use_case_id: baseUseCase.id,
        source_use_case_title: baseUseCase.title,
        title: step.title,
        description: step.description,
        category: step.category,
        is_custom: false,
      })),
      ...addonSteps.map((step, idx) => ({
        step_id: step.id,
        step_order: baseSteps.length + idx + 1,
        source_use_case_id: addonUseCase.id,
        source_use_case_title: addonUseCase.title,
        title: step.title,
        description: step.description,
        category: step.category,
        is_custom: false,
      })),
    ];
    onStepsChange(initialSteps);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedSteps.findIndex((s, i) => {
        const id = s.step_id 
          ? `sortable-${s.step_id}` 
          : `sortable-custom-${i}-${s.custom_step_title || 'untitled'}`;
        return id === active.id;
      });
      
      const newIndex = orderedSteps.findIndex((s, i) => {
        const id = s.step_id 
          ? `sortable-${s.step_id}` 
          : `sortable-custom-${i}-${s.custom_step_title || 'untitled'}`;
        return id === over.id;
      });

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSteps = arrayMove(orderedSteps, oldIndex, newIndex);
        onStepsChange(newSteps);
      }
    }
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = orderedSteps.filter((_, i) => i !== index);
    onStepsChange(newSteps);
  };

  const handleAddCustomStep = () => {
    if (!customStepTitle.trim()) {
      alert('Please provide a title for the custom step');
      return;
    }

    const customStep: AddonStep = {
      step_id: null,
      step_order: orderedSteps.length + 1,
      source_use_case_id: baseUseCase.id,
      source_use_case_title: 'Custom',
      custom_step_title: customStepTitle,
      custom_step_description: customStepDescription,
      is_custom: true,
    };

    onStepsChange([...orderedSteps, customStep]);
    setCustomStepTitle('');
    setCustomStepDescription('');
    setShowCustomStepForm(false);
  };

  const handleAddStepFromBase = (step: UseCaseStep) => {
    const newStep: AddonStep = {
      step_id: step.id,
      step_order: orderedSteps.length + 1,
      source_use_case_id: baseUseCase.id,
      source_use_case_title: baseUseCase.title,
      title: step.title,
      description: step.description,
      category: step.category,
      is_custom: false,
    };
    onStepsChange([...orderedSteps, newStep]);
  };

  const handleAddStepFromAddon = (step: UseCaseStep) => {
    const newStep: AddonStep = {
      step_id: step.id,
      step_order: orderedSteps.length + 1,
      source_use_case_id: addonUseCase.id,
      source_use_case_title: addonUseCase.title,
      title: step.title,
      description: step.description,
      category: step.category,
      is_custom: false,
    };
    onStepsChange([...orderedSteps, newStep]);
  };

  const isStepInOrder = (stepId: string) => {
    return orderedSteps.some((s) => s.step_id === stepId);
  };

  return (
    <div>
      <h4 style={{ marginTop: 0, color: '#333', marginBottom: '16px' }}>
        Configure Step Order
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Base Use Case Steps */}
        <div>
          <h5 style={{
            margin: '0 0 12px 0',
            padding: '8px 12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '6px',
            color: '#0064d2',
          }}>
            📚 {baseUseCase.title} Steps
          </h5>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {baseSteps.map((step, idx) => (
              <div
                key={`base-${step.id}-${idx}`}
                style={{
                  padding: '8px 12px',
                  marginBottom: '6px',
                  backgroundColor: isStepInOrder(step.id) ? '#f0f0f0' : 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{step.title}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{step.description}</div>
                {!isStepInOrder(step.id) && (
                  <button
                    onClick={() => handleAddStepFromBase(step)}
                    style={{
                      marginTop: '6px',
                      padding: '4px 8px',
                      backgroundColor: '#0064d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    + Add to Path
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Addon Use Case Steps */}
        <div>
          <h5 style={{
            margin: '0 0 12px 0',
            padding: '8px 12px',
            backgroundColor: '#e8f5e9',
            borderRadius: '6px',
            color: '#388e3c',
          }}>
            📚 {addonUseCase.title} Steps
          </h5>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {addonSteps.map((step, idx) => (
              <div
                key={`addon-${step.id}-${idx}`}
                style={{
                  padding: '8px 12px',
                  marginBottom: '6px',
                  backgroundColor: isStepInOrder(step.id) ? '#f0f0f0' : 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{step.title}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{step.description}</div>
                {!isStepInOrder(step.id) && (
                  <button
                    onClick={() => handleAddStepFromAddon(step)}
                    style={{
                      marginTop: '6px',
                      padding: '4px 8px',
                      backgroundColor: '#388e3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    + Add to Path
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ordered Steps (Drag and Drop) */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '2px dashed #ddd',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h5 style={{ margin: 0, color: '#333' }}>
            🎯 Learning Path ({orderedSteps.length} steps)
          </h5>
          <button
            onClick={() => setShowCustomStepForm(!showCustomStepForm)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {showCustomStepForm ? '✕ Cancel' : '⭐ Add Custom Step'}
          </button>
        </div>

        {showCustomStepForm && (
          <div style={{
            padding: '16px',
            backgroundColor: '#fff9c4',
            borderRadius: '6px',
            marginBottom: '16px',
            border: '2px solid #ffc107',
          }}>
            <h6 style={{ margin: '0 0 12px 0', color: '#333' }}>Create Custom Step</h6>
            <input
              type="text"
              placeholder="Step Title *"
              value={customStepTitle}
              onChange={(e) => setCustomStepTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
            <textarea
              placeholder="Step Description"
              value={customStepDescription}
              onChange={(e) => setCustomStepDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            <button
              onClick={handleAddCustomStep}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              ✓ Add Step
            </button>
          </div>
        )}

        {orderedSteps.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px', margin: 0 }}>
            No steps added yet. Add steps from the lists above or create a custom step.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedSteps.map((s, i) => 
                s.step_id 
                  ? `sortable-${s.step_id}` 
                  : `sortable-custom-${i}-${s.custom_step_title || 'untitled'}`
              )}
              strategy={verticalListSortingStrategy}
            >
              {orderedSteps.map((step, index) => (
                <SortableStep
                  key={step.step_id 
                    ? `sortable-${step.step_id}` 
                    : `sortable-custom-${index}-${step.custom_step_title || 'untitled'}`
                  }
                  step={step}
                  index={index}
                  onRemove={handleRemoveStep}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '13px',
      }}>
        <strong>Color Legend:</strong>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#e3f2fd', border: '1px solid #ddd', borderRadius: '3px' }} />
            Base Steps
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#e8f5e9', border: '1px solid #ddd', borderRadius: '3px' }} />
            Addon Steps
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#fff9c4', border: '1px solid #ddd', borderRadius: '3px' }} />
            Custom Steps
          </span>
        </div>
      </div>
    </div>
  );
}
