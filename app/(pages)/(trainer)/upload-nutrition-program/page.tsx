"use client";
import { useState } from "react";
import { useCreateNutritionPlanMutation } from "../../../redux/features/nutritionApi";
import InputField from "../../../components/InputField"; // Import your custom InputField component

export default function NutritionForm({ trainerId }: { trainerId: number }) {
  const [name, setName] = useState("");
  const [meals, setMeals] = useState([
    { type: "", meal: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
  ]);
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [createNutritionPlan] = useCreateNutritionPlanMutation();

  const addMeal = () => {
    setMeals([...meals, { type: "", meal: "", calories: 0, protein: 0, carbs: 0, fats: 0 }]);
  };

  const removeMeal = (index: number) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  const updateMeal = (index: number, key: string, value: string | number) => {
    const updatedMeals = [...meals];
    updatedMeals[index][key] = key === "calories" || key === "protein" || key === "carbs" || key === "fats"
      ? Number(value) || 0  // Ensure numeric values
      : value;
    setMeals(updatedMeals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send `mealPlan` as an array instead of an object
    await createNutritionPlan({
      trainerId,
      name,
      mealPlan: meals, // Now an array matching backend expectations
      nutritionInformation: nutritionInfo,
    });

    // Reset form
    setName("");
    setMeals([{ type: "", meal: "", calories: 0, protein: 0, carbs: 0, fats: 0 }]);
    setNutritionInfo("");
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">Create Meal Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Plan Name" type="text" name="planName" value={name} onChange={(e) => setName(e.target.value)} />

        {meals.map((meal, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg shadow space-y-2 relative">
            <h3 className="text-lg font-semibold text-orange-400">Meal {index + 1}</h3>
            <InputField
              label="Meal Type (e.g., Breakfast, Lunch)"
              type="text"
              name="type"
              value={meal.type}
              onChange={(e) => updateMeal(index, "type", e.target.value)}
            />
            <InputField label="Meal Name" type="text" name="meal" value={meal.meal} onChange={(e) => updateMeal(index, "meal", e.target.value)} />
            <InputField
              label="Calories"
              type="number"
              name="calories"
              value={meal.calories}
              onChange={(e) => updateMeal(index, "calories", e.target.value)}
            />
            <InputField
              label="Protein (g)"
              type="number"
              name="protein"
              value={meal.protein}
              onChange={(e) => updateMeal(index, "protein", e.target.value)}
            />
            <InputField
              label="Carbs (g)"
              type="number"
              name="carbs"
              value={meal.carbs}
              onChange={(e) => updateMeal(index, "carbs", e.target.value)}
            />
            <InputField
              label="Fats (g)"
              type="number"
              name="fats"
              value={meal.fats}
              onChange={(e) => updateMeal(index, "fats", e.target.value)}
            />

            {meals.length > 1 && (
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => removeMeal(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={addMeal}>
          + Add Meal
        </button>

        <textarea
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Additional Nutrition Information"
          value={nutritionInfo}
          onChange={(e) => setNutritionInfo(e.target.value)}
          required
        />

        <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg font-semibold">
          Save Meal Plan
        </button>
      </form>
    </div>
  );
}
