import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, Percent } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const monthlyRevenue = [
  { month: "Oct", commission: 28000, subscription: 15000 },
  { month: "Nov", commission: 35000, subscription: 18000 },
  { month: "Dec", commission: 52000, subscription: 22000 },
  { month: "Jan", commission: 42000, subscription: 25000 },
  { month: "Feb", commission: 48000, subscription: 28000 },
  { month: "Mar", commission: 61000, subscription: 32000 },
];

const transactions = [
  { id: "TXN001", vendor: "Beach Shack Stay", amount: "₹2,400", commission: "₹120", date: "Mar 28" },
  { id: "TXN002", vendor: "Kerala Houseboat Co.", amount: "₹9,000", commission: "₹450", date: "Mar 27" },
  { id: "TXN003", vendor: "Mountain Guide Raj", amount: "₹3,000", commission: "₹150", date: "Mar 27" },
  { id: "TXN004", vendor: "Rishikesh Rafting", amount: "₹2,400", commission: "₹120", date: "Mar 26" },
  { id: "TXN005", vendor: "Jaipur Street Eats", amount: "₹800", commission: "₹40", date: "Mar 26" },
];

const AdminRevenue = () => (
  <div className="space-y-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-foreground">Revenue & Monetization</h1>
      <p className="text-sm text-muted-foreground">Track commissions, subscriptions, and transactions</p>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Revenue", value: "₹4,52,000", icon: DollarSign, color: "from-emerald-500 to-green-600" },
        { label: "Commission (5%)", value: "₹2,66,000", icon: Percent, color: "from-primary to-amber-500" },
        { label: "Subscriptions", value: "₹1,40,000", icon: CreditCard, color: "from-violet-500 to-purple-600" },
        { label: "Growth", value: "+18%", icon: TrendingUp, color: "from-blue-500 to-blue-600" },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
            <s.icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <h3 className="font-display font-bold text-foreground mb-4">Revenue Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
          <Bar dataKey="commission" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Commission" />
          <Bar dataKey="subscription" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Subscription" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-display font-bold text-foreground">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Transaction ID</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Vendor</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Amount</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Commission</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="p-4 text-sm font-mono text-muted-foreground">{t.id}</td>
                <td className="p-4 text-sm font-medium text-foreground">{t.vendor}</td>
                <td className="p-4 text-sm font-semibold text-foreground">{t.amount}</td>
                <td className="p-4 text-sm text-primary font-semibold">{t.commission}</td>
                <td className="p-4 text-sm text-muted-foreground">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
);

export default AdminRevenue;
