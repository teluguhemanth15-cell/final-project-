import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Brain, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAI = () => {
  const { toast } = useToast();
  const [budgetWeight, setBudgetWeight] = useState([70]);
  const [adventureWeight, setAdventureWeight] = useState([50]);
  const [hiddenGemWeight, setHiddenGemWeight] = useState([60]);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Tourfinco AI, a budget travel planner for India. Always prioritize affordable options. Include hidden gems and local food recommendations. Provide day-wise itineraries with cost breakdowns."
  );

  const handleSave = () => {
    toast({ title: "Settings saved", description: "AI configuration has been updated." });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">AI Control Panel</h1>
        <p className="text-sm text-muted-foreground">Modify AI behavior and budget logic</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">AI Parameters</h3>
            <p className="text-xs text-muted-foreground">Adjust how the AI generates trip plans</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Budget Optimization Weight</label>
              <span className="text-sm font-bold text-primary">{budgetWeight[0]}%</span>
            </div>
            <Slider value={budgetWeight} onValueChange={setBudgetWeight} min={0} max={100} step={5} />
            <p className="text-xs text-muted-foreground mt-1">Higher = more aggressive budget optimization</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Adventure Quotient</label>
              <span className="text-sm font-bold text-primary">{adventureWeight[0]}%</span>
            </div>
            <Slider value={adventureWeight} onValueChange={setAdventureWeight} min={0} max={100} step={5} />
            <p className="text-xs text-muted-foreground mt-1">Balance between tourist spots and offbeat experiences</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Hidden Gems Priority</label>
              <span className="text-sm font-bold text-primary">{hiddenGemWeight[0]}%</span>
            </div>
            <Slider value={hiddenGemWeight} onValueChange={setHiddenGemWeight} min={0} max={100} step={5} />
            <p className="text-xs text-muted-foreground mt-1">How often to include lesser-known spots</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-4">
        <h3 className="font-bold text-foreground">System Prompt</h3>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={6}
          className="w-full rounded-xl bg-muted border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </motion.div>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 rounded-xl">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
        <Button variant="outline" className="rounded-xl">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset Defaults
        </Button>
      </div>
    </div>
  );
};

export default AdminAI;
