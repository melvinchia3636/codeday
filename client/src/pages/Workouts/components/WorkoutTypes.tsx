import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger } from "animejs";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";
import { useWorkouts } from "../../../contexts/WorkoutsContext";
import {
  defaultWorkoutTypes,
  colorMap,
  type WorkoutType,
} from "../../../lib/workout";
import { WorkoutTypeModal } from "./CreateWorkoutTypeModal";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { deleteWorkoutTypeModalConfig } from "../../../components/confirmModalConfigs";

export function WorkoutTypes() {
  const { typesRef } = useWorkoutsAnimationRefs();
  const {
    workoutTypes,
    createType,
    updateType,
    deleteType,
    isCreatingType,
    isUpdatingType,
  } = useWorkouts();

  // Animate type buttons when workoutTypes changes (including initial load)
  useEffect(() => {
    if (!typesRef.current) return;

    const types = typesRef.current.querySelectorAll(".type-btn");
    if (types.length > 0) {
      animate(types, {
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: stagger(50),
        duration: 400,
        ease: "outBack",
      });
    }
  }, [workoutTypes.length, typesRef]);
  const {
    workoutTypes,
    createType,
    updateType,
    deleteType,
    isCreatingType,
    isUpdatingType,
    isDeletingType,
  } = useWorkouts();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<WorkoutType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingType, setDeletingType] = useState<WorkoutType | null>(null);

  // Selection state for LogWorkout
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  // Show predefined defaults + custom user types
  const defaultDisplayTypes = defaultWorkoutTypes.map((t, i) => ({
    id: `default-${i}`,
    icon: t.icon,
    label: t.name,
    color: t.color,
    caloriesPerMinute: t.caloriesPerMinute,
    original: null as WorkoutType | null,
    isDefault: true,
  }));

  const customDisplayTypes = workoutTypes.map((t) => ({
    id: t.id,
    icon: t.icon,
    label: t.name,
    color: t.color,
    caloriesPerMinute: t.caloriesPerMinute,
    original: t,
    isDefault: false,
  }));

  const displayTypes = [...defaultDisplayTypes, ...customDisplayTypes];

  const handleModalConfirm = (data: {
    id?: string;
    name: string;
    icon: string;
    color: string;
    caloriesPerMinute: number;
  }) => {
    if (data.id) {
      // Edit mode
      updateType(data.id, {
        name: data.name,
        icon: data.icon,
        color: data.color,
        caloriesPerMinute: data.caloriesPerMinute,
      });
    } else {
      // Create mode
      createType(data);
    }
    setShowModal(false);
    setEditingType(null);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setEditingType(null);
  };

  const handleEdit = (type: WorkoutType) => {
    setEditingType(type);
    setShowModal(true);
    setContextMenu(null);
  };

  const handleDeleteClick = (type: WorkoutType) => {
    setDeletingType(type);
    setShowDeleteModal(true);
    setContextMenu(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingType) {
      deleteType(deletingType.id);
    }
    setShowDeleteModal(false);
    setDeletingType(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingType(null);
  };

  const handleContextMenu = (e: React.MouseEvent, typeId: string) => {
    e.preventDefault();
    // Only show context menu for custom types (not defaults)
    const type = displayTypes.find((t) => t.id === typeId);
    if (type?.original) {
      setContextMenu({ id: typeId, x: e.clientX, y: e.clientY });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const getColorRgba = (colorName: string) =>
    colorMap[colorName] || colorMap.pink;

  return (
    <>
      {/* Click outside to close context menu */}
      {contextMenu && (
        <div className="fixed inset-0 z-40" onClick={handleCloseContextMenu} />
      )}

      <div
        ref={typesRef}
        className="relative z-10 flex gap-3 mb-6 flex-wrap justify-center"
      >
        {displayTypes.map((t) => {
          const rgba = getColorRgba(t.color);
          const isSelected = selectedType === t.id;
          const isCustomType = !!t.original;

          return (
            <div key={t.id} className="relative">
              <button
                onClick={() =>
                  setSelectedType(t.id === selectedType ? null : t.id)
                }
                onContextMenu={(e) => handleContextMenu(e, t.id)}
                className="type-btn px-5 py-3 font-bold tracking-widest text-sm transition-all flex items-center gap-2 border-2"
                style={{
                  opacity: 0,
                  backgroundColor: isSelected ? `${rgba}0.2)` : `${rgba}0.1)`,
                  borderColor: isSelected ? `${rgba}1)` : `${rgba}0.4)`,
                  color: `${rgba}1)`,
                  boxShadow: isSelected ? `0 0 20px ${rgba}0.3)` : undefined,
                  transform: isSelected ? "scale(1.05)" : undefined,
                }}
              >
                <Icon icon={t.icon} className="w-5 h-5" />
                {t.label}
                {isCustomType && (
                  <Icon
                    icon="pixelarticons:chevron-down"
                    className="w-3 h-3 ml-1 opacity-50"
                  />
                )}
              </button>

              {/* Context Menu */}
              {contextMenu?.id === t.id && t.original && (
                <div
                  className="fixed z-50 bg-zinc-900 border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)] min-w-[140px]"
                  style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                  <button
                    onClick={() => handleEdit(t.original!)}
                    className="w-full px-4 py-2 text-left text-sm text-pink-400 hover:bg-pink-500/20 flex items-center gap-2 tracking-widest"
                  >
                    <Icon icon="pixelarticons:edit" className="w-4 h-4" />
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteClick(t.original!)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 flex items-center gap-2 tracking-widest"
                  >
                    <Icon icon="pixelarticons:trash" className="w-4 h-4" />
                    DELETE
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add new type button */}
        <button
          onClick={() => {
            setEditingType(null);
            setShowModal(true);
          }}
          className="type-btn px-5 py-3 bg-zinc-800/50 border-2 border-dashed border-fuchsia-500/40 text-fuchsia-400 font-bold tracking-widest text-sm hover:bg-fuchsia-500/10 hover:border-fuchsia-400 hover:scale-105 transition-all flex items-center gap-2 group"
          style={{ opacity: 0 }}
        >
          <Icon
            icon="pixelarticons:plus"
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
          />
          ADD_TYPE
        </button>
      </div>

      {/* Create/Edit Modal */}
      <WorkoutTypeModal
        isVisible={showModal}
        initialData={editingType || undefined}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        isLoading={isCreatingType || isUpdatingType}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isVisible={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        config={deleteWorkoutTypeModalConfig}
      />
    </>
  );
}
