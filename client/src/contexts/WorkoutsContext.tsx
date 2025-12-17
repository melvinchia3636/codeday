import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import {
  useWorkoutTypesQuery,
  useWorkoutsQuery,
  useCreateWorkoutMutation,
  useCreateWorkoutTypeMutation,
  useUpdateWorkoutTypeMutation,
  useDeleteWorkoutTypeMutation,
} from "../hooks/useWorkoutQueries";
import type {
  Workout,
  CreateWorkoutDto,
  WorkoutType,
  CreateWorkoutTypeDto,
  UpdateWorkoutTypeDto,
} from "../lib/workout";

interface WorkoutsContextValue {
  // Data
  workoutTypes: WorkoutType[];
  workouts: Workout[];
  filteredWorkouts: Workout[];

  // Filter state
  selectedTypeFilter: string | null;
  setSelectedTypeFilter: (typeId: string | null) => void;

  // Loading states
  isLoading: boolean;
  isLoadingWorkouts: boolean;
  isCreatingWorkout: boolean;
  isCreatingType: boolean;
  isUpdatingType: boolean;
  isDeletingType: boolean;

  // Actions
  createWorkout: (data: CreateWorkoutDto) => void;
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
  const { data: workouts = [], isLoading: isLoadingWorkouts } =
    useWorkoutsQuery();

  // Filter state
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(
    null
  );

  // Compute filtered workouts
  const filteredWorkouts = useMemo(() => {
    if (!selectedTypeFilter) return workouts;
    const filterLower = selectedTypeFilter.toLowerCase();
    return workouts.filter((w) => w.type.toLowerCase() === filterLower);
  }, [workouts, selectedTypeFilter]);

  // Mutations
  const createWorkoutMutation = useCreateWorkoutMutation();
  const createTypeMutation = useCreateWorkoutTypeMutation();
  const updateTypeMutation = useUpdateWorkoutTypeMutation();
  const deleteTypeMutation = useDeleteWorkoutTypeMutation();

  // Actions
  const createWorkout = (data: CreateWorkoutDto) => {
    createWorkoutMutation.mutate(data);
  };

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
    workouts,
    filteredWorkouts,

    // Filter state
    selectedTypeFilter,
    setSelectedTypeFilter,

    // Loading states
    isLoading,
    isLoadingWorkouts,
    isCreatingWorkout: createWorkoutMutation.isPending,
    isCreatingType: createTypeMutation.isPending,
    isUpdatingType: updateTypeMutation.isPending,
    isDeletingType: deleteTypeMutation.isPending,

    // Actions
    createWorkout,
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
