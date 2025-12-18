import PocketBase from 'pocketbase';

/**
 * Seed Service
 * Seeds example data for new users
 */

// Food types/items to prepopulate (per 100g)
const FOOD_TYPES = [
  { foodId: 'chicken_breast', protein: 31, carbs: 0, fat: 3.6, quantity: 100 },
  { foodId: 'brown_rice', protein: 2.6, carbs: 23, fat: 0.9, quantity: 100 },
  { foodId: 'salmon', protein: 25, carbs: 0, fat: 13, quantity: 100 },
  { foodId: 'eggs', protein: 13, carbs: 1.1, fat: 11, quantity: 100 },
  { foodId: 'oatmeal', protein: 13.2, carbs: 68, fat: 6.5, quantity: 100 },
  { foodId: 'banana', protein: 1.1, carbs: 23, fat: 0.3, quantity: 100 },
  { foodId: 'greek_yogurt', protein: 10, carbs: 3.6, fat: 0.7, quantity: 100 },
  { foodId: 'broccoli', protein: 2.8, carbs: 7, fat: 0.4, quantity: 100 },
  { foodId: 'almonds', protein: 21, carbs: 22, fat: 49, quantity: 100 },
  { foodId: 'sweet_potato', protein: 1.6, carbs: 20, fat: 0.1, quantity: 100 },
  { foodId: 'tuna', protein: 29, carbs: 0, fat: 0.6, quantity: 100 },
  { foodId: 'avocado', protein: 2, carbs: 9, fat: 15, quantity: 100 },
];

// Workout types with their intensity
const WORKOUT_TYPES = ['running', 'weights', 'yoga', 'cycling', 'swimming', 'hiit', 'walking'];

interface FoodType {
  id: string;
  foodId: string;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
}

interface MealItem {
  foodId: string;
  mealItemId: string;
  quantity: number;
}

interface Meal {
  type: string;
  items: MealItem[];
  timestamp: string;
}

interface Workout {
  type: string;
  durationMin: number;
  caloriesBurned: number;
  effortUnits: number;
  timestamp: string;
}

interface WaterLog {
  amountMl: number;
  timestamp: string;
}

// Generate dates for 5 days ending on today
function generateDates(): Date[] {
  const dates: Date[] = [];
  const endDate = new Date();

  for (let i = 4; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

// Format date as YYYY-MM-DD HH:mm:ss
function formatTimestamp(date: Date, hours: number = 12, minutes: number = 0): string {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  return `${year}-${month}-${day} ${h}:${m}:00`;
}

// Generate random number between min and max
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate meals for a day
function generateMealsForDay(date: Date, foodTypes: FoodType[]): Meal[] {
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const meals: Meal[] = [];

  mealTypes.forEach((mealType) => {
    // Pick 1-4 random foods for each meal
    const numItems = randomBetween(1, 4);
    const items: MealItem[] = [];
    const usedFoods = new Set<number>();

    for (let i = 0; i < numItems; i++) {
      let foodIndex: number;
      do {
        foodIndex = randomBetween(0, foodTypes.length - 1);
      } while (usedFoods.has(foodIndex));
      usedFoods.add(foodIndex);

      items.push({
        foodId: foodTypes[foodIndex].id,
        mealItemId: foodTypes[foodIndex].foodId,
        quantity: randomBetween(30, 100),
      });
    }

    // Different meal times
    const mealHours: Record<string, number> = { breakfast: 8, lunch: 12, dinner: 19, snack: 15 };

    meals.push({
      type: mealType,
      items: items,
      timestamp: formatTimestamp(date, mealHours[mealType], randomBetween(0, 30)),
    });
  });

  return meals;
}

// Generate workouts for a day
function generateWorkoutsForDay(date: Date): Workout[] {
  const workouts: Workout[] = [];
  // 1-2 workouts per day
  const numWorkouts = randomBetween(1, 2);

  for (let i = 0; i < numWorkouts; i++) {
    const type = WORKOUT_TYPES[randomBetween(0, WORKOUT_TYPES.length - 1)];
    const durationMin = randomBetween(15, 45);

    // Calories per minute based on workout type
    const caloriesPerMin: Record<string, number> = {
      hiit: 15,
      running: 12,
      swimming: 11,
      cycling: 10,
      weights: 6,
      yoga: 3,
      walking: 4,
    };

    // Intensity multipliers
    const intensity: Record<string, number> = {
      hiit: 2.5,
      running: 2.0,
      swimming: 2.0,
      cycling: 1.8,
      weights: 1.5,
      yoga: 0.8,
      walking: 0.5,
    };

    workouts.push({
      type,
      durationMin,
      caloriesBurned: Math.round(durationMin * (caloriesPerMin[type] || 5)),
      effortUnits: Math.round(durationMin * (intensity[type] || 1.0)),
      timestamp: formatTimestamp(date, randomBetween(6, 20), randomBetween(0, 59)),
    });
  }

  return workouts;
}

// Generate water logs for a day
function generateWaterLogsForDay(date: Date): WaterLog[] {
  const logs: WaterLog[] = [];
  // 6-10 water logs per day (every 1-2 hours during waking hours)
  const numLogs = randomBetween(6, 10);

  const hours: number[] = [];
  for (let h = 7; h <= 22; h++) {
    hours.push(h);
  }

  // Shuffle and pick hours
  const shuffled = hours.sort(() => Math.random() - 0.5);
  const selectedHours = shuffled.slice(0, numLogs).sort((a, b) => a - b);

  selectedHours.forEach((hour) => {
    const ts = formatTimestamp(date, hour, randomBetween(0, 59));
    logs.push({
      amountMl: randomBetween(150, 350), // 150ml to 350ml per drink
      timestamp: ts,
    });
  });

  return logs;
}

export class SeedService {
  private pb: PocketBase;

  constructor(pb: PocketBase) {
    this.pb = pb;
  }

  /**
   * Seeds example data for a newly registered user
   * Assumes the user is already authenticated in the PocketBase instance
   */
  async seedUserData(userId: string): Promise<void> {
    console.log(`🌱 Starting seed for user ${userId}...`);

    // Step 1: Create food types (meal_items)
    console.log('  🍎 Creating food types (meal_items)...');
    const createdFoodTypes: FoodType[] = [];

    for (const food of FOOD_TYPES) {
      try {
        const created = await this.pb.collection('meal_items').create({
          ...food,
          userId,
        });
        createdFoodTypes.push({
          id: created.id,
          foodId: food.foodId,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          quantity: food.quantity,
        });
        console.log(`    ✅ Created food type: ${food.foodId}`);
      } catch (error) {
        console.error(`    ❌ Failed to create food type ${food.foodId}:`, error);
      }
    }

    // Generate dates for 5 days ending today
    const dates = generateDates();
    console.log(
      `  📅 Seeding data for dates: ${dates.map((d) => d.toISOString().split('T')[0]).join(', ')}`
    );

    // Step 2: Seed data for each day
    for (const date of dates) {
      const dateStr = date.toISOString().split('T')[0];
      console.log(`  📆 Seeding data for ${dateStr}...`);

      // Seed meals
      if (createdFoodTypes.length > 0) {
        const meals = generateMealsForDay(date, createdFoodTypes);
        for (const meal of meals) {
          try {
            await this.pb.collection('meals').create({
              ...meal,
              userId,
            });
            console.log(`    ✅ Created ${meal.type} with ${meal.items.length} items`);
          } catch (error) {
            console.error(`    ❌ Failed to create ${meal.type}:`, error);
          }
        }
      }

      // Seed workouts
      const workouts = generateWorkoutsForDay(date);
      for (const workout of workouts) {
        try {
          await this.pb.collection('workouts').create({
            ...workout,
            userId,
          });
          console.log(
            `    ✅ Created ${workout.type} workout (${workout.durationMin} min, ${workout.caloriesBurned} cal)`
          );
        } catch (error) {
          console.error(`    ❌ Failed to create workout:`, error);
        }
      }

      // Seed water logs
      const waterLogs = generateWaterLogsForDay(date);
      let totalMl = 0;
      for (const log of waterLogs) {
        try {
          await this.pb.collection('water_logs').create({
            ...log,
            userId,
          });
          totalMl += log.amountMl;
        } catch (error) {
          console.error(`    ❌ Failed to create water log:`, error);
        }
      }
      console.log(`    ✅ Created ${waterLogs.length} water logs (${totalMl}ml total)`);
    }

    console.log(`  ✨ Seed completed for user ${userId}`);
  }
}
