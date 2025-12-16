import { createContext, useContext, type ReactNode } from "react";
import {
  useWorkoutTypesQuery,
  useCreateWorkoutTypeMutation,
  useUpdateWorkoutTypeMutation,
  useDeleteWorkoutTypeMutation,
} from "../hooks/useWorkoutQueries";
import type {
  WorkoutType,
  CreateWorkoutTypeDto,
  UpdateWorkoutTypeDto,
} from "../lib/workout";

interface WorkoutsContextValue {
  // Data
  workoutTypes: WorkoutType[];

  // Loading states
  isLoading: boolean;
  isCreatingType: boolean;
  isUpdatingType: boolean;
  isDeletingType: boolean;

  // Actions
  createType: (data: CreateWorkoutTypeDto) => void;
  updateType: (id: string, data: UpdateWorkoutTypeDto) => void;
  deleteType: (id: string) => void;
}

const WorkoutsContext = createContext<WorkoutsContextValue | null>(null);

interface WorkoutsProviderProps {
  children: ReactNode;
}

export function WorkoutsProvider({ children }: WorkoutsProviderProps) {
  // Fetch data
  const { data: workoutTypes = [], isLoading } = useWorkoutTypesQuery();

  // Mutations
  const createTypeMutation = useCreateWorkoutTypeMutation();
  const updateTypeMutation = useUpdateWorkoutTypeMutation();
  const deleteTypeMutation = useDeleteWorkoutTypeMutation();

  // Actions
  const createType = (data: CreateWorkoutTypeDto) => {
    createTypeMutation.mutate(data);
  };

  const updateType = (id: string, data: UpdateWorkoutTypeDto) => {
    updateTypeMutation.mutate({ id, data });
  };

  const deleteType = (id: string) => {
    deleteTypeMutation.mutate(id);
  };

  const value: WorkoutsContextValue = {
    // Data
    workoutTypes,

    // Loading states
    isLoading,
    isCreatingType: createTypeMutation.isPending,
    isUpdatingType: updateTypeMutation.isPending,
    isDeletingType: deleteTypeMutation.isPending,

    // Actions
    createType,
    updateType,
    deleteType,
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts(): WorkoutsContextValue {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutsProvider");
  }
  return context;
}
