import { useState, useEffect } from "react";

const defaultHabits = ["Drink Water", "Exercise", "Read"];

function App() {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("habits");
    return stored ? JSON.parse(stored) : defaultHabits.map(name => ({ name, completed: false }));
  });
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].completed = !updated[index].completed;
    setHabits(updated);
  };

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, { name: newHabit.trim(), completed: false }]);
    setNewHabit("");
  };

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">HabitFlow</h1>
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={addHabit}>Add</button>
        </div>
        {habits.length === 0 ? (
          <p className="text-center text-gray-500">No habits yet.</p>
        ) : (
          habits.map((habit, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded ${
                habit.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(index)}
                />
                <span className={habit.completed ? "line-through" : ""}>{habit.name}</span>
              </div>
              <button onClick={() => deleteHabit(index)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;