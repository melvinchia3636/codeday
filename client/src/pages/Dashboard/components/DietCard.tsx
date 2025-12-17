import { Icon } from "@iconify/react";
import { useEffect, useRef, useMemo } from "react";
import { animate, stagger, random } from "animejs";
import { Link } from "react-router";
import { useTodayMealsQuery } from "../../../hooks/useMealQueries";
import { useTodayMealItemsQuery } from "../../../hooks/useMealItemQueries";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { calculateCalories } from "../../../lib/mealItem";

export function DietCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const macrosRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const lastCaloriesRef = useRef<number>(0);

  const { settings } = useUserProfile();
  const { data: todayMeals = [] } = useTodayMealsQuery();
  const { data: foodLibrary = [] } = useTodayMealItemsQuery();

  const nutritionStats = useMemo(() => {
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let calories = 0;

    for (const meal of todayMeals) {
      if (!meal.items) continue;
      for (const item of meal.items) {
        const foodItem = foodLibrary.find((f) => f.id === item.foodId);
        if (foodItem) {
          const ratio = item.quantity / 100;
          protein += foodItem.protein * ratio;
          carbs += foodItem.carbs * ratio;
          fat += foodItem.fat * ratio;
          calories += calculateCalories(foodItem) * ratio;
        }
      }
    }

    const targetCalories = settings?.dietCalorieTarget || 2000;

    return {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      calories: Math.round(calories),
      targetCalories,
    };
  }, [todayMeals, foodLibrary, settings]);

  useEffect(() => {
    if (valueRef.current) {
      const startValue = lastCaloriesRef.current;
      const endValue = nutritionStats.calories;
      lastCaloriesRef.current = endValue;

      const counter = { value: startValue };
      animate(counter, {
        value: [startValue, endValue],
        duration: 1500,
        delay: 300,
        ease: "outExpo",
        onUpdate: function () {
          if (valueRef.current) {
            valueRef.current.innerHTML = Math.round(
              counter.value
            ).toLocaleString();
          }
        },
      });

      setTimeout(() => {
        if (valueRef.current) {
          animate(valueRef.current, {
            textShadow: [
              "0 0 0 transparent",
              "0 0 25px rgba(255,255,255,0.7)",
              "0 0 0 transparent",
            ],
            duration: 2000,
            ease: "inOutSine",
            loop: true,
          });
        }
      }, 2000);
    }

    if (macrosRef.current) {
      const macroItems = macrosRef.current.querySelectorAll(".macro-item");
      animate(macroItems, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.8, 1],
        delay: stagger(150, { start: 500 }),
        duration: 600,
        ease: "outBack",
      });
    }

    if (iconRef.current) {
      animate(iconRef.current, {
        rotate: [0, 360],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    if (orbRef.current) {
      animate(orbRef.current, {
        translateX: [0, random(-25, 25)],
        translateY: [0, random(-25, 25)],
        scale: [1, random(1.3, 1.6), 1],
        opacity: [0.1, 0.5, 0.1],
        duration: random(4000, 6000),
        ease: "inOutSine",
        loop: true,
      });
    }

    if (topLineRef.current) {
      animate(topLineRef.current, {
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          "0 0 5px rgba(168,85,247,0.3)",
          "0 0 20px rgba(168,85,247,0.8)",
          "0 0 5px rgba(168,85,247,0.3)",
        ],
        duration: 2500,
        ease: "inOutSine",
        loop: true,
      });
    }

    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 500,
          delay: 300 + i * 100,
          ease: "outBack",
        });
      }
    });

    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(168,85,247,0.5)",
          "rgba(236,72,153,0.6)",
          "rgba(168,85,247,0.5)",
        ],
        duration: 4500,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, [nutritionStats]);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(236,72,153,0.5)",
        duration: 300,
        ease: "outQuad",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1,
        boxShadow: "0 0 0 transparent",
        duration: 300,
        ease: "outQuad",
      });
    }
  };

  return (
    <Link to="/nutrition" className="block">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group bg-zinc-900/80 border-2 border-fuchsia-500/50 p-4 relative overflow-hidden transition-all duration-300 backdrop-blur-sm cursor-pointer"
      >
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        ></div>

        <div
          ref={hologramRef}
          className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(168,85,247,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"
          style={{ opacity: 0.05 }}
        ></div>

        <div
          ref={topLineRef}
          className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-fuchsia-500 via-pink-500 to-transparent"
        ></div>

        <div
          ref={orbRef}
          className="absolute -top-10 -right-10 w-20 h-20 bg-fuchsia-500/10 rounded-full blur-xl"
        ></div>

        <div
          ref={(el) => {
            if (el) cornersRef.current[0] = el;
          }}
          className="absolute top-1 left-1 w-3 h-3 border-l border-t border-fuchsia-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[1] = el;
          }}
          className="absolute top-1 right-1 w-3 h-3 border-r border-t border-fuchsia-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[2] = el;
          }}
          className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-fuchsia-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[3] = el;
          }}
          className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-fuchsia-500/50"
          style={{ opacity: 0 }}
        ></div>

        <div className="text-fuchsia-400 text-xs tracking-widest mb-2 flex items-center gap-2 relative z-10">
          <span ref={iconRef}>
            <Icon icon="pixelarticons:coin" className="w-4 h-4" />
          </span>
          NUTRITION.sys
        </div>

        <div
          ref={valueRef}
          className="text-4xl font-bold text-white mb-1 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          0
        </div>

        <div className="text-fuchsia-300/60 text-xs relative z-10">
          KCAL CONSUMED
        </div>

        <div
          ref={macrosRef}
          className="mt-3 grid grid-cols-3 gap-1 text-center relative z-10"
        >
          <div
            className="macro-item bg-zinc-800/50 p-1 border border-pink-500/20"
            style={{ opacity: 0 }}
          >
            <div className="text-pink-400 text-xs">P</div>
            <div className="text-white text-sm font-bold">
              {nutritionStats.protein}g
            </div>
          </div>
          <div
            className="macro-item bg-zinc-800/50 p-1 border border-cyan-500/20"
            style={{ opacity: 0 }}
          >
            <div className="text-cyan-400 text-xs">C</div>
            <div className="text-white text-sm font-bold">
              {nutritionStats.carbs}g
            </div>
          </div>
          <div
            className="macro-item bg-zinc-800/50 p-1 border border-fuchsia-500/20"
            style={{ opacity: 0 }}
          >
            <div className="text-fuchsia-400 text-xs">F</div>
            <div className="text-white text-sm font-bold">
              {nutritionStats.fat}g
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-fuchsia-300/40 border-t border-fuchsia-500/20 pt-2 relative z-10">
          ▸ GOAL: {nutritionStats.targetCalories.toLocaleString()} kcal
        </div>
      </div>
    </Link>
  );
}
