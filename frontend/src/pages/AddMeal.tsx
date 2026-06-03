import { useState, useMemo } from "react";
import { Search, Plus, ArrowRight, X, Flame } from "lucide-react";
import { DUMMY_FOODS, FoodItem } from "@/lib/dummy-foods";

type AddedFood = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calculatedKcal: number;
};

export default function AddMeal() {
  const [activeTab, setActiveTab] = useState<"search" | "custom">("search");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom Food Form State
  const [customName, setCustomName] = useState("");
  const [customKcal, setCustomKcal] = useState<number | "">("");

  // Selected Food from Search for portion adjustment
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [inputAmount, setInputAmount] = useState<number | "">("");

  // Added Foods List
  const [addedFoods, setAddedFoods] = useState<AddedFood[]>([]);

  // Derived state
  const totalCalories = addedFoods.reduce((acc, curr) => acc + curr.calculatedKcal, 0);
  
  const filteredFoods = useMemo(() => {
    return DUMMY_FOODS.filter((food) => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handlers
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setInputAmount(food.baseAmount);
  };

  const handleAddSelectedFood = () => {
    if (!selectedFood || !inputAmount) return;
    
    const amount = Number(inputAmount);
    const calculatedKcal = (selectedFood.baseKcal / selectedFood.baseAmount) * amount;

    setAddedFoods((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(),
        name: selectedFood.name,
        amount,
        unit: selectedFood.unit,
        calculatedKcal: Math.round(calculatedKcal),
      }
    ]);
    
    setSelectedFood(null);
    setInputAmount("");
    setSearchQuery("");
  };

  const handleAddCustomFood = () => {
    if (!customName.trim() || !customKcal) return;

    setAddedFoods((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(),
        name: customName,
        amount: 1,
        unit: "회",
        calculatedKcal: Number(customKcal),
      }
    ]);
    
    setCustomName("");
    setCustomKcal("");
  };

  const handleRemoveFood = (id: string) => {
    setAddedFoods((prev) => prev.filter(f => f.id !== id));
  };

  return (
    <div className="flex-1 bg-black text-white pb-24 font-sans selection:bg-neon-500 selection:text-black">
      <main className="max-w-md mx-auto px-5 pt-8">
        
        {/* Top Controls: Tabs & Total */}
        <div className="flex flex-col gap-5 mb-8">
          
          {/* Total Kcal Widget */}
          <div className="bg-neon-500 text-black px-5 py-4 rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(212,255,0,0.15)]">
            <div>
              <p className="text-xs font-bold opacity-70 leading-none mb-1.5 uppercase tracking-wider">Total Kcal</p>
              <div className="text-3xl font-black tracking-tighter leading-none">
                {Math.round(totalCalories)}
              </div>
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-neon-500" />
            </div>
          </div>

          {/* Segmented Control for Tabs */}
          <div className="flex bg-[#111111] p-1.5 rounded-[20px] w-full border border-zinc-800/50">
            <button 
              onClick={() => setActiveTab("search")}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                activeTab === "search" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-white"
              }`}
            >
              Search
            </button>
            <button 
              onClick={() => setActiveTab("custom")}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${
                activeTab === "custom" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-white"
              }`}
            >
              Custom
            </button>
          </div>

        </div>

        {/* Added Foods Grid */}
        {addedFoods.length > 0 && (
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-3">
              {addedFoods.map((food) => (
                <div key={food.id} className="bg-[#111111] rounded-2xl p-5 flex items-center justify-between group hover:bg-[#1a1a1a] transition-colors relative overflow-hidden border border-zinc-800/50">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-0.5">{food.name}</h3>
                    <p className="text-sm text-zinc-400 font-medium">{food.amount}{food.unit}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black text-neon-500 tracking-tighter">
                      {food.calculatedKcal} <span className="text-xs text-zinc-500 uppercase font-bold">kcal</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveFood(food.id)}
                      className="w-8 h-8 bg-black hover:bg-red-500 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab Content: Search */}
        {activeTab === "search" && (
          <div className="animate-in fade-in duration-500">
            <div className="relative mb-5">
              <input 
                type="text" 
                placeholder="Search foods..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-800/50 rounded-2xl py-4 pl-5 pr-14 text-base font-bold outline-none focus:border-neon-500 transition-all text-white placeholder:text-zinc-600"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-neon-500 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-black" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredFoods.length === 0 ? (
                <div className="py-10 text-center text-zinc-600 font-bold text-base">
                  No foods found.
                </div>
              ) : (
                filteredFoods.map(food => (
                  <button 
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    className="w-full flex items-center justify-between p-4 bg-[#111111] border border-zinc-800/50 hover:border-zinc-700 hover:bg-[#1a1a1a] rounded-2xl transition-all group"
                  >
                    <div className="text-left">
                      <p className="text-base font-bold tracking-tight text-white mb-0.5">{food.name}</p>
                      <p className="text-xs text-zinc-500 font-medium">{food.baseAmount}{food.unit} <span className="mx-1.5">•</span> {food.baseKcal} kcal</p>
                    </div>
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-neon-500 transition-colors shrink-0 border border-zinc-800 group-hover:border-neon-500">
                      <Plus className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Custom Input */}
        {activeTab === "custom" && (
          <div className="bg-[#111111] border border-zinc-800/50 rounded-2xl p-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold mb-6 tracking-tighter text-white">Create custom.</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-zinc-500 font-bold mb-2 uppercase tracking-widest text-xs">Food Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chicken Salad" 
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 px-4 text-base font-bold outline-none focus:border-neon-500 transition-all text-white placeholder:text-zinc-700"
                />
              </div>
              <div>
                <label className="block text-zinc-500 font-bold mb-2 uppercase tracking-widest text-xs">Total Calories</label>
                <input 
                  type="number" 
                  placeholder="e.g. 450" 
                  value={customKcal}
                  onChange={(e) => setCustomKcal(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 px-4 text-base font-bold outline-none focus:border-neon-500 transition-all text-white placeholder:text-zinc-700"
                />
              </div>
            </div>
            <button 
              onClick={handleAddCustomFood}
              disabled={!customName.trim() || !customKcal}
              className="w-full bg-neon-500 hover:bg-[#bce600] disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-base py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,255,0,0.1)] disabled:shadow-none"
            >
              Add to Meal <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </main>

      {/* Portion Calculator Modal */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedFood(null)}
          />
          
          <div className="bg-[#111111] border border-zinc-800 w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl flex flex-col gap-6 items-center animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedFood(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black hover:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-full text-center mt-2">
              <h3 className="text-2xl font-black text-white mb-1.5 tracking-tighter leading-tight pr-6 pl-6">{selectedFood.name}</h3>
              <p className="text-zinc-500 font-bold text-sm mb-6">Base: {selectedFood.baseAmount}{selectedFood.unit} / {selectedFood.baseKcal}kcal</p>
              
              <div className="flex flex-col items-center justify-center gap-3 mb-2">
                <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs">How much?</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value ? Number(e.target.value) : "")}
                    className="w-24 bg-black border border-zinc-800 rounded-xl py-3 px-3 text-center text-2xl font-black text-white outline-none focus:border-neon-500 transition-all"
                  />
                  <span className="text-lg font-bold text-zinc-500">{selectedFood.unit}</span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="bg-neon-500 rounded-2xl p-5 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(212,255,0,0.1)] border border-neon-600/20">
                <div className="text-black/60 font-bold text-xs mb-1 uppercase tracking-widest">Result</div>
                <div className="text-4xl font-black text-black tracking-tighter flex items-baseline gap-1">
                  {inputAmount 
                    ? Math.round((selectedFood.baseKcal / selectedFood.baseAmount) * Number(inputAmount)) 
                    : 0}
                  <span className="text-sm font-bold text-black/80 uppercase">kcal</span>
                </div>
              </div>

              <button 
                onClick={handleAddSelectedFood}
                disabled={!inputAmount || Number(inputAmount) <= 0}
                className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-base py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Confirm <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
