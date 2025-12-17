/**
 * Seed Script for CodeDay Health App
 *
 * Creates a new account and seeds 5 days of data for:
 * - Nutrition (meals and meal items)
 * - Workouts
 * - Hydration (water logs)
 *
 * Last day of data: 17/12/2025
 */

import PocketBase from 'pocketbase';

// Configuration
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

// Seed user credentials
const SEED_USER = {
  username: 'seeduser',
  email: 'seeduser@example.com',
  password: 'SeedUser123!',
  passwordConfirm: 'SeedUser123!',
  name: 'Seed User',
  emailVisibility: true,
};

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

// Generate dates for 5 days ending on 17/12/2025
function generateDates() {
  const dates = [];
  // Last day is December 17, 2025
  const endDate = new Date('2025-12-17');

  for (let i = 4; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

// Format date as YYYY-MM-DD HH:mm:ss
function formatTimestamp(date, hours = 12, minutes = 0) {
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
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate meals for a day
function generateMealsForDay(date, foodTypes) {
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  const meals = [];

  mealTypes.forEach((mealType, index) => {
    // Pick 1-2 random foods for each meal
    const numItems = randomBetween(1, 4);
    const items = [];
    const usedFoods = new Set();

    for (let i = 0; i < numItems; i++) {
      let foodIndex;
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
    const mealHours = { breakfast: 8, lunch: 12, dinner: 19, snack: 15 };

    meals.push({
      type: mealType,
      items: items,
      timestamp: formatTimestamp(date, mealHours[mealType], randomBetween(0, 30)),
    });
  });

  return meals;
}

// Generate workouts for a day
function generateWorkoutsForDay(date) {
  const workouts = [];
  // 1-2 workouts per day
  const numWorkouts = randomBetween(1, 2);

  for (let i = 0; i < numWorkouts; i++) {
    const type = WORKOUT_TYPES[randomBetween(0, WORKOUT_TYPES.length - 1)];
    const durationMin = randomBetween(15, 45);

    // Calories per minute based on workout type
    const caloriesPerMin = {
      hiit: 15,
      running: 12,
      swimming: 11,
      cycling: 10,
      weights: 6,
      yoga: 3,
      walking: 4,
    };

    // Intensity multipliers
    const intensity = {
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
function generateWaterLogsForDay(date) {
  const logs = [];
  // 6-10 water logs per day (every 1-2 hours during waking hours)
  const numLogs = randomBetween(6, 10);

  const hours = [];
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
      timestamp: ts,
    });
  });

  return logs;
}

async function seed() {
  console.log('🌱 Starting seed script...\n');

  const pb = new PocketBase(POCKETBASE_URL);

  try {
    // Check PocketBase health
    await pb.health.check();
    console.log('✅ Connected to PocketBase at', POCKETBASE_URL);
  } catch (error) {
    console.error('❌ Failed to connect to PocketBase:', error.message);
    process.exit(1);
  }

  let userId;

  // Step 1: Create or login user
  console.log('\n📝 Creating/logging in user...');
  try {
    // Try to create new user
    const user = await pb.collection('users').create(SEED_USER);
    userId = user.id;
    console.log(`✅ Created new user: ${SEED_USER.email} (ID: ${userId})`);

    // Login with the new user
    await pb.collection('users').authWithPassword(SEED_USER.email, SEED_USER.password);
    console.log('✅ Logged in successfully');
  } catch (error) {
    if (error.status === 400) {
      // User might already exist, try to login
      console.log('ℹ️  User might exist, attempting login...');
      try {
        const auth = await pb
          .collection('users')
          .authWithPassword(SEED_USER.email, SEED_USER.password);
        userId = auth.record.id;
        console.log(`✅ Logged in as existing user (ID: ${userId})`);
      } catch (loginError) {
        console.error('❌ Failed to login:', loginError.message);
        process.exit(1);
      }
    } else {
      console.error('❌ Failed to create user:', error.message);
      process.exit(1);
    }
  }

  // Step 2: Create food types (meal_items)
  console.log('\n🍎 Creating food types (meal_items)...');
  const timestampFoodTypes = [];

  for (const food of FOOD_TYPES) {
    try {
      // Check if food type already exists for this user
      const existing = await pb.collection('meal_items').getList(1, 1, {
        filter: `userId="${userId}" && foodId="${food.foodId}"`,
      });

      if (existing.items.length > 0) {
        console.log(`  ⏭️  Food type "${food.foodId}" already exists`);
        timestampFoodTypes.push(existing.items[0]);
      } else {
        const timestamp = await pb.collection('meal_items').create({
          ...food,
          userId,
        });
        timestampFoodTypes.push(timestamp);
        console.log(`  ✅ Created food type: ${food.foodId}`);
      }
    } catch (error) {
      console.error(`  ❌ Failed to create food type ${food.foodId}:`, error.message);
    }
  }

  // Step 3: Create user settings
  console.log('\n⚙️  Creating user settings...');
  try {
    // Check if settings already exist for this user
    const existingSettings = await pb.collection('settings').getList(1, 1, {
      filter: `userId="${userId}"`,
    });

    if (existingSettings.items.length > 0) {
      console.log('  ⏭️  Settings already exist for this user');
    } else {
      await pb.collection('settings').create({
        userId,
        dietCalorieTarget: 2000,
        hydroTargetMl: 2500,
        hydroIntervalMin: 60,
        expectedMealsPerDay: 4,
        timezone: 'Asia/Singapore',
      });
      console.log('  ✅ Created user settings');
    }
  } catch (error) {
    console.error('  ❌ Failed to create settings:', error.message);
  }

  // Generate dates
  const dates = generateDates();
  console.log(
    `\n📅 Seeding data for dates: ${dates.map((d) => d.toISOString().split('T')[0]).join(', ')}`
  );

  // Step 3: Seed data for each day
  for (const date of dates) {
    const dateStr = date.toISOString().split('T')[0];
    console.log(`\n📆 Seeding data for ${dateStr}...`);

    // Seed meals
    console.log('  🍽️  Creating meals...');
    const meals = generateMealsForDay(date, timestampFoodTypes);
    for (const meal of meals) {
      try {
        await pb.collection('meals').create({
          ...meal,
          userId,
        });
        console.log(`    ✅ Created ${meal.type} with ${meal.items.length} items`);
      } catch (error) {
        console.error(`    ❌ Failed to create ${meal.type}:`, error.message);
      }
    }

    // Seed workouts
    console.log('  🏋️  Creating workouts...');
    const workouts = generateWorkoutsForDay(date);
    for (const workout of workouts) {
      try {
        await pb.collection('workouts').create({
          ...workout,
          userId,
        });
        console.log(
          `    ✅ Created ${workout.type} workout (${workout.durationMin} min, ${workout.caloriesBurned} cal)`
        );
      } catch (error) {
        console.error(`    ❌ Failed to create workout:`, error.message);
      }
    }

    // Seed water logs
    console.log('  💧 Creating water logs...');
    const waterLogs = generateWaterLogsForDay(date);
    let totalMl = 0;
    for (const log of waterLogs) {
      try {
        await pb.collection('water_logs').create({
          ...log,
          userId,
        });
        totalMl += log.amountMl;
      } catch (error) {
        console.error(`    ❌ Failed to create water log:`, error.message);
      }
    }
    console.log(`    ✅ Created ${waterLogs.length} water logs (${totalMl}ml total)`);
  }

  console.log('\n✨ Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`  - User: ${SEED_USER.email}`);
  console.log(`  - Password: ${SEED_USER.password}`);
  console.log(`  - Food types timestamp: ${timestampFoodTypes.length}`);
  console.log(`  - Days seeded: ${dates.length}`);
  console.log(
    `  - Date range: ${dates[0].toISOString().split('T')[0]} to ${dates[dates.length - 1].toISOString().split('T')[0]}`
  );
}

// Run the seed function
seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
