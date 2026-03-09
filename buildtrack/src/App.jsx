import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#080c12", surface: "#0e1520", border: "#1a2d45", deep: "#060a0f",
  card: "#111827", text: "#e8f0fe", muted: "#7a9cc0", dim: "#3d5a7a",
  orange: "#f97316", blue: "#3b82f6", green: "#22c55e", red: "#ef4444",
  amber: "#f59e0b", purple: "#a855f7", cyan: "#06b6d4", yellow: "#eab308",
};
const IS = { width: "100%", background: C.deep, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "9px 12px", fontSize: 13, boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
const BP = (color = C.orange) => ({ display: "flex", alignItems: "center", gap: 6, background: color, color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" });

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const initTasks = [
  { id: "T001", name: "Foundation & Excavation", phase: "Foundation", status: "Completed", priority: "High", assignee: "James Otieno", start: "2026-01-10", due: "2026-01-28", progress: 100, notes: "Completed on schedule" },
  { id: "T002", name: "Concrete Column Pouring", phase: "Structure", status: "In Progress", priority: "High", assignee: "Peter Kamau", start: "2026-01-29", due: "2026-03-15", progress: 65, notes: "2nd floor columns remaining" },
  { id: "T003", name: "Electrical Rough-in", phase: "MEP", status: "In Progress", priority: "Medium", assignee: "David Mwangi", start: "2026-02-10", due: "2026-03-30", progress: 40, notes: "Ground floor done" },
  { id: "T004", name: "Plumbing Installation", phase: "MEP", status: "Pending", priority: "Medium", assignee: "Samuel Njoroge", start: "2026-03-01", due: "2026-04-15", progress: 10, notes: "Materials on order" },
  { id: "T005", name: "Roof Structure", phase: "Structure", status: "Pending", priority: "High", assignee: "Peter Kamau", start: "2026-03-20", due: "2026-04-30", progress: 0, notes: "Pending column completion" },
  { id: "T006", name: "Interior Plastering", phase: "Finishing", status: "Pending", priority: "Low", assignee: "Grace Wanjiku", start: "2026-05-01", due: "2026-06-15", progress: 0, notes: "After MEP sign-off" },
];
const initWorkers = [
  { id: "W001", name: "James Otieno", role: "Foreman", trade: "General", phone: "0712-001-001", rate: 1800, status: "Active", attendance: [1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1] },
  { id: "W002", name: "Peter Kamau", role: "Mason", trade: "Concrete", phone: "0712-002-002", rate: 1500, status: "Active", attendance: [1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,0,1,1,0,0,1,1] },
  { id: "W003", name: "David Mwangi", role: "Electrician", trade: "Electrical", phone: "0712-003-003", rate: 1600, status: "Active", attendance: [1,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1] },
  { id: "W004", name: "Samuel Njoroge", role: "Plumber", trade: "Plumbing", phone: "0712-004-004", rate: 1600, status: "On Leave", attendance: [1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0] },
  { id: "W005", name: "Grace Wanjiku", role: "Plasterer", trade: "Finishing", phone: "0712-005-005", rate: 1200, status: "Active", attendance: [1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1] },
  { id: "W006", name: "Ali Hassan", role: "Labourer", trade: "General", phone: "0712-006-006", rate: 900, status: "Active", attendance: [0,1,1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,1,0,0,0,1,1] },
];
const initMaterials = [
  { id: "M001", name: "OPC Cement (50kg bags)", category: "Concrete", unit: "Bags", qty: 240, minQty: 100, unitCost: 720, supplier: "Bamburi Cement", status: "In Stock", lastOrder: "2026-02-20" },
  { id: "M002", name: "Steel Reinforcement Y16", category: "Steel", unit: "Tonnes", qty: 4.2, minQty: 2, unitCost: 145000, supplier: "Steel & More Ltd", status: "In Stock", lastOrder: "2026-02-15" },
  { id: "M003", name: "River Sand", category: "Aggregates", unit: "Tonnes", qty: 18, minQty: 10, unitCost: 3500, supplier: "Quarry Direct", status: "In Stock", lastOrder: "2026-03-01" },
  { id: "M004", name: "Ballast (20mm)", category: "Aggregates", unit: "Tonnes", qty: 6, minQty: 8, unitCost: 4200, supplier: "Quarry Direct", status: "Low Stock", lastOrder: "2026-02-25" },
  { id: "M005", name: "BRC Mesh A142", category: "Steel", unit: "Sheets", qty: 45, minQty: 20, unitCost: 2800, supplier: "Steel & More Ltd", status: "In Stock", lastOrder: "2026-02-18" },
  { id: "M006", name: "2\" PVC Pipes", category: "Plumbing", unit: "Lengths", qty: 3, minQty: 30, unitCost: 450, supplier: "Plumb Kenya", status: "Critical", lastOrder: "2026-01-10" },
  { id: "M007", name: "2.5mm² Electric Cable", category: "Electrical", unit: "Metres", qty: 850, minQty: 200, unitCost: 85, supplier: "Kenwest Cables", status: "In Stock", lastOrder: "2026-02-28" },
];
const initBudget = [
  { id: "B001", category: "Labour", description: "Foreman — March wages", amount: 36000, type: "Expense", date: "2026-03-01", phase: "Structure", receipt: "RCP-001" },
  { id: "B002", category: "Materials", description: "Cement — 300 bags", amount: 216000, type: "Expense", date: "2026-03-02", phase: "Structure", receipt: "RCP-002" },
  { id: "B003", category: "Materials", description: "Steel Y16 — 3 tonnes", amount: 435000, type: "Expense", date: "2026-02-15", phase: "Foundation", receipt: "RCP-003" },
  { id: "B004", category: "Labour", description: "Masons — Feb wages", amount: 120000, type: "Expense", date: "2026-02-28", phase: "Foundation", receipt: "RCP-004" },
  { id: "B005", category: "Equipment", description: "Concrete mixer hire", amount: 45000, type: "Expense", date: "2026-02-20", phase: "Foundation", receipt: "RCP-005" },
  { id: "B006", category: "Contingency", description: "Client deposit received", amount: 2500000, type: "Income", date: "2026-01-15", phase: "—", receipt: "DEP-001" },
  { id: "B007", category: "Materials", description: "Electrical cables", amount: 72250, type: "Expense", date: "2026-03-01", phase: "MEP", receipt: "RCP-006" },
  { id: "B008", category: "Labour", description: "Electrician — Feb", amount: 32000, type: "Expense", date: "2026-02-28", phase: "MEP", receipt: "RCP-007" },
];
const TOTAL_BUDGET = 8500000;

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = p => p + Math.random().toString(36).slice(2, 6).toUpperCase();
const SC = {
  "Completed": C.green, "In Progress": C.blue, "Pending": C.amber, "Blocked": C.red,
  "Active": C.green, "On Leave": C.amber, "Inactive": C.dim,
  "In Stock": C.green, "Low Stock": C.amber, "Critical": C.red, "Out of Stock": C.red,
  "High": C.red, "Medium": C.amber, "Low": C.green,
  "Expense": C.red, "Income": C.green,
};
const Badge = ({ t, small }) => <span style={{ background: (SC[t] || C.dim) + "22", color: SC[t] || C.dim, border: `1px solid ${(SC[t] || C.dim)}44`, padding: small ? "1px 7px" : "3px 10px", borderRadius: 99, fontSize: small ? 10 : 11, fontWeight: 700, whiteSpace: "nowrap" }}>{t}</span>;
const SVG = ({ d, s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
const IC = {
  dash: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  task: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  worker: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  material: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  budget: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2",
  ai: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
  close: "M18 6L6 18M6 6l12 12",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  trend: "M23 6l-9.5 9.5-5-5L1 18",
  hard: "M2 20h20 M6 20V10l6-6 6 6v10 M12 20v-6",
  send: "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  spark: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const Field = ({ label, children }) => <div style={{ marginBottom: 13 }}><label style={{ display: "block", color: C.muted, fontSize: 10, marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>{children}</div>;
const Inp = p => <input style={IS} {...p} />;
const Sel = ({ children, ...p }) => <select style={IS} {...p}>{children}</select>;
const Txt = p => <textarea style={{ ...IS, resize: "vertical", minHeight: 68 }} {...p} />;

function Modal({ title, onClose, children, wide }) {
  return <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}>
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, width: "100%", maxWidth: wide ? 720 : 500, maxHeight: "90vh", overflow: "auto", padding: 26, margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: C.text, fontSize: 16, fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer" }}><SVG d={IC.close} /></button>
      </div>
      {children}
    </div>
  </div>;
}

function ProgressBar({ pct, color = C.orange, height = 6, showLabel = false }) {
  return <div style={{ position: "relative" }}>
    <div style={{ background: C.border, borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
    {showLabel && <span style={{ position: "absolute", right: 0, top: -18, fontSize: 11, color, fontWeight: 700 }}>{pct}%</span>}
  </div>;
}

function StatCard({ label, value, sub, icon, color, trend }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", flex: 1, minWidth: 150, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", right: -10, top: -10, width: 80, height: 80, background: color + "11", borderRadius: "50%" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
      <div>
        <div style={{ color: C.dim, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>
        <div style={{ color: C.text, fontSize: 26, fontWeight: 800, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{sub}</div>}
        {trend !== undefined && <div style={{ color: trend >= 0 ? C.green : C.red, fontSize: 11, marginTop: 4, fontWeight: 600 }}>{trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last month</div>}
      </div>
      <div style={{ background: color + "22", color, borderRadius: 10, padding: 9 }}><SVG d={icon} s={20} /></div>
    </div>
  </div>;
}

function SBar({ v, oc, ph }) {
  return <div style={{ position: "relative" }}>
    <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.dim }}><SVG d={IC.search} s={14} /></div>
    <input value={v} onChange={e => oc(e.target.value)} placeholder={ph || "Search…"} style={{ ...IS, paddingLeft: 32 }} />
  </div>;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ tasks, workers, materials, budget }) {
  const totalExp = budget.filter(b => b.type === "Expense").reduce((s, b) => s + b.amount, 0);
  const totalInc = budget.filter(b => b.type === "Income").reduce((s, b) => s + b.amount, 0);
  const overallProgress = Math.round(tasks.reduce((s, t) => s + t.progress, 0) / tasks.length);
  const activeWorkers = workers.filter(w => w.status === "Active").length;
  const criticalMats = materials.filter(m => m.status === "Critical" || m.status === "Low Stock").length;
  const budgetUsed = Math.round((totalExp / TOTAL_BUDGET) * 100);

  const phases = [...new Set(tasks.map(t => t.phase))];

  return <div>
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: "0 0 4px", fontSize: 24, fontWeight: 800 }}>Site Dashboard</h2>
      <p style={{ color: C.dim, margin: 0, fontSize: 12 }}>📍 Westlands Commercial Block — March 2026</p>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
      <StatCard label="Overall Progress" value={`${overallProgress}%`} icon={IC.trend} color={C.orange} sub="Across all phases" trend={8} />
      <StatCard label="Active Workers" value={activeWorkers} icon={IC.worker} color={C.blue} sub={`of ${workers.length} total`} />
      <StatCard label="Budget Used" value={`${budgetUsed}%`} icon={IC.budget} color={budgetUsed > 80 ? C.red : C.green} sub={`KES ${(totalExp / 1e6).toFixed(2)}M spent`} />
      <StatCard label="Material Alerts" value={criticalMats} icon={IC.alert} color={criticalMats > 0 ? C.red : C.green} sub="Low / Critical stock" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {/* Phase Progress */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 16 }}>Phase Progress</div>
        {phases.map(phase => {
          const phaseTasks = tasks.filter(t => t.phase === phase);
          const avg = Math.round(phaseTasks.reduce((s, t) => s + t.progress, 0) / phaseTasks.length);
          const color = avg === 100 ? C.green : avg > 50 ? C.orange : C.blue;
          return <div key={phase} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#c8daf0", fontSize: 12, fontWeight: 600 }}>{phase}</span>
              <span style={{ color, fontSize: 12, fontWeight: 700 }}>{avg}%</span>
            </div>
            <ProgressBar pct={avg} color={color} height={7} />
          </div>;
        })}
      </div>

      {/* Budget Breakdown */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 16 }}>Budget Overview</div>
        {[["Total Budget", `KES ${(TOTAL_BUDGET / 1e6).toFixed(2)}M`, C.muted],
          ["Total Income", `KES ${(totalInc / 1e6).toFixed(2)}M`, C.green],
          ["Total Spent", `KES ${(totalExp / 1e6).toFixed(2)}M`, C.red],
          ["Remaining", `KES ${((TOTAL_BUDGET - totalExp) / 1e6).toFixed(2)}M`, C.orange],
        ].map(([l, v, col]) => <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid #0d1e30` }}>
          <span style={{ color: C.muted, fontSize: 12 }}>{l}</span>
          <span style={{ color: col, fontWeight: 700, fontSize: 13 }}>{v}</span>
        </div>)}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: C.muted, fontSize: 11 }}>Budget utilisation</span>
            <span style={{ color: budgetUsed > 80 ? C.red : C.orange, fontWeight: 700, fontSize: 11 }}>{budgetUsed}%</span>
          </div>
          <ProgressBar pct={budgetUsed} color={budgetUsed > 80 ? C.red : C.orange} height={8} />
        </div>
      </div>

      {/* Active Tasks */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 14 }}>Active Tasks</div>
        {tasks.filter(t => t.status === "In Progress").map(t => <div key={t.id} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: "#c8daf0", fontSize: 12, fontWeight: 600 }}>{t.name}</span>
            <span style={{ color: C.orange, fontSize: 11, fontWeight: 700 }}>{t.progress}%</span>
          </div>
          <ProgressBar pct={t.progress} color={C.orange} height={5} />
          <div style={{ color: C.dim, fontSize: 10, marginTop: 3 }}>Due: {t.due} · {t.assignee}</div>
        </div>)}
      </div>

      {/* Material Alerts */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 14 }}>Stock Alerts</div>
        {materials.filter(m => m.status !== "In Stock").map(m => <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, background: C.deep, borderRadius: 8, padding: "9px 12px" }}>
          <div>
            <div style={{ color: "#c8daf0", fontSize: 12, fontWeight: 600 }}>{m.name}</div>
            <div style={{ color: C.dim, fontSize: 10, marginTop: 1 }}>Stock: {m.qty} {m.unit} · Min: {m.minQty}</div>
          </div>
          <Badge t={m.status} />
        </div>)}
        {materials.filter(m => m.status !== "In Stock").length === 0 && <div style={{ color: C.dim, fontSize: 12, textAlign: "center", padding: 20 }}>✅ All materials adequately stocked</div>}
      </div>
    </div>
  </div>;
}

// ─── TASKS ────────────────────────────────────────────────────────────────────
function Tasks({ tasks, setTasks }) {
  const [q, setQ] = useState(""); const [modal, setModal] = useState(false); const [f, setF] = useState({}); const [view, setView] = useState(null);
  const filtered = tasks.filter(t => [t.name, t.phase, t.status, t.assignee].some(v => v.toLowerCase().includes(q.toLowerCase())));
  const save = () => { if (!f.name) return; if (!tasks.find(x => x.id === f.id)) setTasks(p => [...p, f]); else setTasks(p => p.map(x => x.id === f.id ? f : x)); setModal(false); };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div><h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: 0, fontSize: 22, fontWeight: 800 }}>Tasks & Progress</h2><p style={{ color: C.dim, margin: "3px 0 0", fontSize: 11 }}>{tasks.filter(t => t.status === "In Progress").length} active · {tasks.filter(t => t.status === "Completed").length} completed</p></div>
      <button onClick={() => { setF({ id: uid("T"), status: "Pending", priority: "Medium", progress: 0 }); setModal(true); }} style={BP(C.orange)}><SVG d={IC.plus} s={14} /> Add Task</button>
    </div>

    {/* Kanban-style cards */}
    <div style={{ marginBottom: 16 }}><SBar v={q} oc={setQ} ph="Search tasks…" /></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {filtered.map(t => {
        const col = SC[t.status] || C.dim;
        return <div key={t.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer", transition: "border-color 0.2s" }}
          onClick={() => setView(t)}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <Badge t={t.status} />
            <Badge t={t.priority} small />
          </div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.name}</div>
          <div style={{ color: C.dim, fontSize: 11, marginBottom: 12 }}>{t.phase} · {t.assignee}</div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: C.muted, fontSize: 11 }}>Progress</span>
              <span style={{ color: col, fontSize: 11, fontWeight: 700 }}>{t.progress}%</span>
            </div>
            <ProgressBar pct={t.progress} color={col} height={5} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: C.dim, fontSize: 10 }}>Due: {t.due}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={e => { e.stopPropagation(); setF({ ...t }); setModal(true); }} style={{ background: "none", border: "none", color: C.blue, cursor: "pointer" }}><SVG d={IC.edit} s={13} /></button>
              <button onClick={e => { e.stopPropagation(); if (confirm("Delete?")) setTasks(p => p.filter(x => x.id !== t.id)); }} style={{ background: "none", border: "none", color: C.red, cursor: "pointer" }}><SVG d={IC.trash} s={13} /></button>
            </div>
          </div>
        </div>;
      })}
    </div>

    {view && <Modal title={view.name} wide onClose={() => setView(null)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px", background: C.deep, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
        {[["Phase", view.phase], ["Assignee", view.assignee], ["Start", view.start], ["Due", view.due], ["Priority", null], ["Status", null]].map(([l, v]) => <div key={l} style={{ marginBottom: 8 }}>
          <div style={{ color: C.dim, fontSize: 10, textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>{l}</div>
          {l === "Status" ? <Badge t={view.status} /> : l === "Priority" ? <Badge t={view.priority} /> : <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{v}</div>}
        </div>)}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: C.muted, fontSize: 12, fontWeight: 700 }}>Progress</span>
          <span style={{ color: C.orange, fontWeight: 700 }}>{view.progress}%</span>
        </div>
        <ProgressBar pct={view.progress} color={C.orange} height={10} />
      </div>
      {view.notes && <div style={{ background: C.deep, borderRadius: 8, padding: "10px 14px" }}><div style={{ color: C.dim, fontSize: 10, fontWeight: 700, marginBottom: 3 }}>NOTES</div><div style={{ color: "#c8daf0", fontSize: 13 }}>{view.notes}</div></div>}
    </Modal>}

    {modal && <Modal title="Task" onClose={() => setModal(false)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <div style={{ gridColumn: "1/-1" }}><Field label="Task Name"><Inp value={f.name || ""} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></Field></div>
        <Field label="Phase"><Sel value={f.phase || "Foundation"} onChange={e => setF(x => ({ ...x, phase: e.target.value }))}>{["Foundation", "Structure", "MEP", "Finishing", "Landscaping"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Assignee"><Inp value={f.assignee || ""} onChange={e => setF(x => ({ ...x, assignee: e.target.value }))} /></Field>
        <Field label="Status"><Sel value={f.status || "Pending"} onChange={e => setF(x => ({ ...x, status: e.target.value }))}>{["Pending", "In Progress", "Completed", "Blocked"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Priority"><Sel value={f.priority || "Medium"} onChange={e => setF(x => ({ ...x, priority: e.target.value }))}>{["High", "Medium", "Low"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Start Date"><Inp type="date" value={f.start || ""} onChange={e => setF(x => ({ ...x, start: e.target.value }))} /></Field>
        <Field label="Due Date"><Inp type="date" value={f.due || ""} onChange={e => setF(x => ({ ...x, due: e.target.value }))} /></Field>
        <div style={{ gridColumn: "1/-1" }}>
          <Field label={`Progress: ${f.progress || 0}%`}><input type="range" min="0" max="100" value={f.progress || 0} onChange={e => setF(x => ({ ...x, progress: parseInt(e.target.value) }))} style={{ width: "100%", accentColor: C.orange }} /></Field>
        </div>
        <div style={{ gridColumn: "1/-1" }}><Field label="Notes"><Txt value={f.notes || ""} onChange={e => setF(x => ({ ...x, notes: e.target.value }))} /></Field></div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
        <button onClick={() => setModal(false)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={save} style={BP(C.orange)}>Save Task</button>
      </div>
    </Modal>}
  </div>;
}

// ─── WORKERS ──────────────────────────────────────────────────────────────────
function Workers({ workers, setWorkers }) {
  const [q, setQ] = useState(""); const [modal, setModal] = useState(false); const [f, setF] = useState({}); const [view, setView] = useState(null);
  const filtered = workers.filter(w => [w.name, w.role, w.trade, w.status].some(v => v.toLowerCase().includes(q.toLowerCase())));
  const attendance = w => Math.round((w.attendance.filter(Boolean).length / w.attendance.length) * 100);
  const wages = w => w.attendance.filter(Boolean).length * w.rate;
  const save = () => { if (!f.name) return; if (!workers.find(x => x.id === f.id)) setWorkers(p => [...p, { ...f, attendance: Array(30).fill(1) }]); else setWorkers(p => p.map(x => x.id === f.id ? f : x)); setModal(false); };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div><h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: 0, fontSize: 22, fontWeight: 800 }}>Workers & Attendance</h2><p style={{ color: C.dim, margin: "3px 0 0", fontSize: 11 }}>{workers.filter(w => w.status === "Active").length} active on site</p></div>
      <button onClick={() => { setF({ id: uid("W"), status: "Active", rate: 1200 }); setModal(true); }} style={BP(C.blue)}><SVG d={IC.plus} s={14} /> Add Worker</button>
    </div>

    <div style={{ marginBottom: 14 }}><SBar v={q} oc={setQ} ph="Search workers…" /></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
      {filtered.map(w => {
        const att = attendance(w);
        const attColor = att >= 80 ? C.green : att >= 60 ? C.amber : C.red;
        return <div key={w.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer" }} onClick={() => setView(w)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif" }}>{w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
              <div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{w.name}</div>
                <div style={{ color: C.dim, fontSize: 11 }}>{w.role} · {w.trade}</div>
              </div>
            </div>
            <Badge t={w.status} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ background: C.deep, borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ color: C.dim, fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>Attendance</div>
              <div style={{ color: attColor, fontWeight: 800, fontSize: 16, fontFamily: "'Syne', sans-serif" }}>{att}%</div>
            </div>
            <div style={{ background: C.deep, borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ color: C.dim, fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>Month Wages</div>
              <div style={{ color: C.orange, fontWeight: 800, fontSize: 14, fontFamily: "'Syne', sans-serif" }}>KES {wages(w).toLocaleString()}</div>
            </div>
          </div>
          {/* Mini attendance grid */}
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {w.attendance.map((day, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: 2, background: day ? C.green : C.red, opacity: day ? 1 : 0.4 }} />)}
          </div>
          <div style={{ color: C.dim, fontSize: 9, marginTop: 4 }}>30-day attendance heatmap</div>
        </div>;
      })}
    </div>

    {view && <Modal title={view.name} wide onClose={() => setView(null)}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff" }}>{view.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
        <div>
          <div style={{ color: C.text, fontWeight: 800, fontSize: 18 }}>{view.name}</div>
          <div style={{ color: C.muted, fontSize: 13 }}>{view.role} — {view.trade}</div>
          <div style={{ marginTop: 4 }}><Badge t={view.status} /></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[["Daily Rate", `KES ${view.rate?.toLocaleString()}`, C.orange], ["Attendance", `${attendance(view)}%`, attendance(view) >= 80 ? C.green : C.red], ["Monthly Wages", `KES ${wages(view).toLocaleString()}`, C.purple]].map(([l, v, c]) => <div key={l} style={{ background: C.deep, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{l}</div>
          <div style={{ color: c, fontWeight: 800, fontSize: 16, marginTop: 4, fontFamily: "'Syne', sans-serif" }}>{v}</div>
        </div>)}
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ color: C.dim, fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>30-Day Attendance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
          {view.attendance.map((day, i) => <div key={i} style={{ background: day ? C.green : C.red, opacity: day ? 0.9 : 0.3, borderRadius: 4, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>{i + 1}</div>)}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10, color: C.dim }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, background: C.green, borderRadius: 2 }} /> Present</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, background: C.red, opacity: 0.4, borderRadius: 2 }} /> Absent</span>
        </div>
      </div>
    </Modal>}

    {modal && <Modal title="Worker" onClose={() => setModal(false)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <div style={{ gridColumn: "1/-1" }}><Field label="Full Name"><Inp value={f.name || ""} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></Field></div>
        <Field label="Role"><Inp value={f.role || ""} onChange={e => setF(x => ({ ...x, role: e.target.value }))} /></Field>
        <Field label="Trade"><Sel value={f.trade || "General"} onChange={e => setF(x => ({ ...x, trade: e.target.value }))}>{["General", "Concrete", "Electrical", "Plumbing", "Finishing", "Steel"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Phone"><Inp value={f.phone || ""} onChange={e => setF(x => ({ ...x, phone: e.target.value }))} /></Field>
        <Field label="Daily Rate (KES)"><Inp type="number" value={f.rate || ""} onChange={e => setF(x => ({ ...x, rate: parseInt(e.target.value) }))} /></Field>
        <div style={{ gridColumn: "1/-1" }}><Field label="Status"><Sel value={f.status || "Active"} onChange={e => setF(x => ({ ...x, status: e.target.value }))}>{["Active", "On Leave", "Inactive"].map(s => <option key={s}>{s}</option>)}</Sel></Field></div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
        <button onClick={() => setModal(false)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={save} style={BP(C.blue)}>Save Worker</button>
      </div>
    </Modal>}
  </div>;
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
function Materials({ materials, setMaterials }) {
  const [q, setQ] = useState(""); const [modal, setModal] = useState(false); const [f, setF] = useState({});
  const filtered = materials.filter(m => [m.name, m.category, m.status, m.supplier].some(v => v.toLowerCase().includes(q.toLowerCase())));
  const getStatus = (m) => { if (m.qty <= 0) return "Out of Stock"; if (m.qty < m.minQty * 0.5) return "Critical"; if (m.qty < m.minQty) return "Low Stock"; return "In Stock"; };
  const save = () => {
    if (!f.name) return;
    const m = { ...f, status: getStatus(f) };
    if (!materials.find(x => x.id === f.id)) setMaterials(p => [...p, m]); else setMaterials(p => p.map(x => x.id === f.id ? m : x));
    setModal(false);
  };
  const totalValue = materials.reduce((s, m) => s + m.qty * m.unitCost, 0);

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div><h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: 0, fontSize: 22, fontWeight: 800 }}>Materials & Inventory</h2><p style={{ color: C.dim, margin: "3px 0 0", fontSize: 11 }}>Total value: KES {totalValue.toLocaleString()}</p></div>
      <button onClick={() => { setF({ id: uid("M"), status: "In Stock", qty: 0, minQty: 10, unitCost: 0 }); setModal(true); }} style={BP(C.green)}><SVG d={IC.plus} s={14} /> Add Material</button>
    </div>

    <div style={{ marginBottom: 14 }}><SBar v={q} oc={setQ} ph="Search materials…" /></div>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead><tr>
          {["Material", "Category", "Qty", "Min Qty", "Unit Cost", "Total Value", "Supplier", "Status", ""].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: C.dim, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: `1px solid ${C.border}` }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.map(m => <tr key={m.id} style={{ borderBottom: "1px solid #0d1e30" }}>
            <td style={{ padding: "11px 14px", color: C.text, fontWeight: 600 }}>{m.name}</td>
            <td style={{ padding: "11px 14px", color: C.muted }}>{m.category}</td>
            <td style={{ padding: "11px 14px", color: m.qty < m.minQty ? C.red : C.text, fontWeight: 700 }}>{m.qty} {m.unit}</td>
            <td style={{ padding: "11px 14px", color: C.dim }}>{m.minQty} {m.unit}</td>
            <td style={{ padding: "11px 14px", color: C.muted }}>KES {m.unitCost?.toLocaleString()}</td>
            <td style={{ padding: "11px 14px", color: C.orange, fontWeight: 700 }}>KES {(m.qty * m.unitCost)?.toLocaleString()}</td>
            <td style={{ padding: "11px 14px", color: C.muted }}>{m.supplier}</td>
            <td style={{ padding: "11px 14px" }}><Badge t={m.status} /></td>
            <td style={{ padding: "11px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
              <button onClick={() => { setF({ ...m }); setModal(true); }} style={{ background: "none", border: "none", color: C.blue, cursor: "pointer", marginRight: 6 }}><SVG d={IC.edit} s={13} /></button>
              <button onClick={() => { if (confirm("Delete?")) setMaterials(p => p.filter(x => x.id !== m.id)); }} style={{ background: "none", border: "none", color: C.red, cursor: "pointer" }}><SVG d={IC.trash} s={13} /></button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>

    {modal && <Modal title="Material" onClose={() => setModal(false)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <div style={{ gridColumn: "1/-1" }}><Field label="Material Name"><Inp value={f.name || ""} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></Field></div>
        <Field label="Category"><Sel value={f.category || "Concrete"} onChange={e => setF(x => ({ ...x, category: e.target.value }))}>{["Concrete", "Steel", "Aggregates", "Electrical", "Plumbing", "Finishing", "Timber"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Unit"><Inp value={f.unit || ""} onChange={e => setF(x => ({ ...x, unit: e.target.value }))} placeholder="Bags, Tonnes, Metres…" /></Field>
        <Field label="Current Qty"><Inp type="number" value={f.qty || ""} onChange={e => setF(x => ({ ...x, qty: parseFloat(e.target.value) }))} /></Field>
        <Field label="Minimum Qty"><Inp type="number" value={f.minQty || ""} onChange={e => setF(x => ({ ...x, minQty: parseFloat(e.target.value) }))} /></Field>
        <Field label="Unit Cost (KES)"><Inp type="number" value={f.unitCost || ""} onChange={e => setF(x => ({ ...x, unitCost: parseFloat(e.target.value) }))} /></Field>
        <div style={{ gridColumn: "1/-1" }}><Field label="Supplier"><Inp value={f.supplier || ""} onChange={e => setF(x => ({ ...x, supplier: e.target.value }))} /></Field></div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
        <button onClick={() => setModal(false)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={save} style={BP(C.green)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── BUDGET ───────────────────────────────────────────────────────────────────
function Budget({ budget, setBudget }) {
  const [q, setQ] = useState(""); const [modal, setModal] = useState(false); const [f, setF] = useState({});
  const filtered = budget.filter(b => [b.description, b.category, b.type, b.phase].some(v => v.toLowerCase().includes(q.toLowerCase())));
  const totalExp = budget.filter(b => b.type === "Expense").reduce((s, b) => s + b.amount, 0);
  const totalInc = budget.filter(b => b.type === "Income").reduce((s, b) => s + b.amount, 0);
  const save = () => { if (!f.description || !f.amount) return; if (!budget.find(x => x.id === f.id)) setBudget(p => [...p, f]); else setBudget(p => p.map(x => x.id === f.id ? f : x)); setModal(false); };

  const cats = ["Labour", "Materials", "Equipment", "Subcontractor", "Professional Fees", "Contingency", "Other"];

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div><h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: 0, fontSize: 22, fontWeight: 800 }}>Budget & Costs</h2><p style={{ color: C.dim, margin: "3px 0 0", fontSize: 11 }}>{budget.length} transactions</p></div>
      <button onClick={() => { setF({ id: uid("B"), type: "Expense", category: "Materials", date: new Date().toISOString().slice(0, 10) }); setModal(true); }} style={BP(C.purple)}><SVG d={IC.plus} s={14} /> Add Transaction</button>
    </div>

    <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
      <StatCard label="Total Budget" value={`KES ${(TOTAL_BUDGET / 1e6).toFixed(1)}M`} icon={IC.budget} color={C.muted} />
      <StatCard label="Total Spent" value={`KES ${(totalExp / 1e6).toFixed(2)}M`} icon={IC.trend} color={C.red} />
      <StatCard label="Total Income" value={`KES ${(totalInc / 1e6).toFixed(2)}M`} icon={IC.trend} color={C.green} />
      <StatCard label="Balance" value={`KES ${((TOTAL_BUDGET - totalExp) / 1e6).toFixed(2)}M`} icon={IC.spark} color={C.orange} />
    </div>

    {/* Category breakdown */}
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 14 }}>Spending by Category</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {cats.map(cat => {
          const spent = budget.filter(b => b.category === cat && b.type === "Expense").reduce((s, b) => s + b.amount, 0);
          if (!spent) return null;
          const colors = { Labour: C.blue, Materials: C.orange, Equipment: C.purple, Subcontractor: C.cyan, "Professional Fees": C.yellow, Contingency: C.green };
          const col = colors[cat] || C.muted;
          return <div key={cat} style={{ background: C.deep, borderRadius: 10, padding: "10px 14px", flex: 1, minWidth: 130 }}>
            <div style={{ color: col, fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{cat}</div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 15, fontFamily: "'Syne', sans-serif" }}>KES {(spent / 1000).toFixed(0)}K</div>
            <div style={{ color: C.dim, fontSize: 10, marginTop: 2 }}>{Math.round((spent / totalExp) * 100)}% of spend</div>
          </div>;
        })}
      </div>
    </div>

    <div style={{ marginBottom: 14 }}><SBar v={q} oc={setQ} ph="Search transactions…" /></div>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead><tr>
          {["Date", "Description", "Category", "Phase", "Amount", "Type", "Receipt", ""].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: C.dim, fontWeight: 700, fontSize: 10, textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {filtered.sort((a, b) => b.date.localeCompare(a.date)).map(b => <tr key={b.id} style={{ borderBottom: "1px solid #0d1e30" }}>
            <td style={{ padding: "10px 14px", color: C.muted }}>{b.date}</td>
            <td style={{ padding: "10px 14px", color: C.text, fontWeight: 600 }}>{b.description}</td>
            <td style={{ padding: "10px 14px", color: C.muted }}>{b.category}</td>
            <td style={{ padding: "10px 14px", color: C.dim }}>{b.phase}</td>
            <td style={{ padding: "10px 14px", color: b.type === "Income" ? C.green : C.red, fontWeight: 700 }}>{b.type === "Income" ? "+" : "-"}KES {b.amount?.toLocaleString()}</td>
            <td style={{ padding: "10px 14px" }}><Badge t={b.type} /></td>
            <td style={{ padding: "10px 14px", color: C.dim }}>{b.receipt}</td>
            <td style={{ padding: "10px 14px", textAlign: "right" }}>
              <button onClick={() => { setF({ ...b }); setModal(true); }} style={{ background: "none", border: "none", color: C.blue, cursor: "pointer", marginRight: 6 }}><SVG d={IC.edit} s={13} /></button>
              <button onClick={() => { if (confirm("Delete?")) setBudget(p => p.filter(x => x.id !== b.id)); }} style={{ background: "none", border: "none", color: C.red, cursor: "pointer" }}><SVG d={IC.trash} s={13} /></button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>

    {modal && <Modal title="Transaction" onClose={() => setModal(false)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <div style={{ gridColumn: "1/-1" }}><Field label="Description"><Inp value={f.description || ""} onChange={e => setF(x => ({ ...x, description: e.target.value }))} /></Field></div>
        <Field label="Type"><Sel value={f.type || "Expense"} onChange={e => setF(x => ({ ...x, type: e.target.value }))}><option>Expense</option><option>Income</option></Sel></Field>
        <Field label="Category"><Sel value={f.category || "Materials"} onChange={e => setF(x => ({ ...x, category: e.target.value }))}>{cats.map(c => <option key={c}>{c}</option>)}</Sel></Field>
        <Field label="Amount (KES)"><Inp type="number" value={f.amount || ""} onChange={e => setF(x => ({ ...x, amount: parseFloat(e.target.value) }))} /></Field>
        <Field label="Date"><Inp type="date" value={f.date || ""} onChange={e => setF(x => ({ ...x, date: e.target.value }))} /></Field>
        <Field label="Phase"><Sel value={f.phase || "—"} onChange={e => setF(x => ({ ...x, phase: e.target.value }))}>{["—", "Foundation", "Structure", "MEP", "Finishing"].map(s => <option key={s}>{s}</option>)}</Sel></Field>
        <Field label="Receipt No."><Inp value={f.receipt || ""} onChange={e => setF(x => ({ ...x, receipt: e.target.value }))} /></Field>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
        <button onClick={() => setModal(false)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13 }}>Cancel</button>
        <button onClick={save} style={BP(C.purple)}>Save</button>
      </div>
    </Modal>}
  </div>;
}

// ─── AI INSIGHTS ──────────────────────────────────────────────────────────────
function AIInsights({ tasks, workers, materials, budget }) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);

  const siteContext = () => {
    const totalExp = budget.filter(b => b.type === "Expense").reduce((s, b) => s + b.amount, 0);
    const overallProgress = Math.round(tasks.reduce((s, t) => s + t.progress, 0) / tasks.length);
    const activeWorkers = workers.filter(w => w.status === "Active").length;
    const criticalMats = materials.filter(m => m.status === "Critical" || m.status === "Low Stock");
    const blockedTasks = tasks.filter(t => t.status === "Blocked");
    const avgAttendance = Math.round(workers.reduce((s, w) => s + (w.attendance.filter(Boolean).length / w.attendance.length) * 100, 0) / workers.length);

    return `You are a senior construction project manager AI assistant. Here is the current site data:

SITE: Westlands Commercial Block, Nairobi — March 2026
OVERALL PROGRESS: ${overallProgress}%
BUDGET: Total KES ${(TOTAL_BUDGET / 1e6).toFixed(1)}M | Spent KES ${(totalExp / 1e6).toFixed(2)}M (${Math.round((totalExp / TOTAL_BUDGET) * 100)}%)

TASKS (${tasks.length} total):
${tasks.map(t => `- ${t.name} [${t.phase}]: ${t.status} — ${t.progress}% complete, due ${t.due}, assigned to ${t.assignee}`).join("\n")}

WORKERS (${workers.length} total, ${activeWorkers} active):
${workers.map(w => `- ${w.name} (${w.role}/${w.trade}): ${w.status}, attendance ${Math.round((w.attendance.filter(Boolean).length / w.attendance.length) * 100)}%, daily rate KES ${w.rate}`).join("\n")}
Average site attendance: ${avgAttendance}%

MATERIALS:
${materials.map(m => `- ${m.name}: ${m.qty} ${m.unit} in stock (min: ${m.minQty}) — ${m.status}`).join("\n")}
${criticalMats.length > 0 ? `⚠️ CRITICAL/LOW: ${criticalMats.map(m => m.name).join(", ")}` : "All materials adequate"}

BLOCKED TASKS: ${blockedTasks.length > 0 ? blockedTasks.map(t => t.name).join(", ") : "None"}

Respond concisely and practically. Use bullet points. Focus on actionable advice specific to this site's data.`;
  };

  const quickInsights = [
    { label: "📊 Site Health Report", q: "Give me a comprehensive site health report. What's going well and what needs immediate attention?" },
    { label: "⚠️ Risk Assessment", q: "Identify the top 3 risks on this construction site right now and how to mitigate them." },
    { label: "💰 Budget Analysis", q: "Analyze the budget situation. Are we on track? Any overspending risks or cost-saving opportunities?" },
    { label: "👷 Worker Productivity", q: "Analyze worker attendance and productivity. Who needs attention and what's affecting the team?" },
    { label: "📦 Materials Planning", q: "What materials need to be ordered urgently? Give me a prioritized restocking plan." },
    { label: "📅 Schedule Forecast", q: "Based on current progress, will we meet our deadlines? What's the forecast completion?" },
  ];

  const askAI = async (question) => {
    if (!question.trim()) return;
    setLoading(true);
    const userMsg = { role: "user", content: question };
    setChat(prev => [...prev, userMsg]);
    setPrompt("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: siteContext(),
          messages: [...chat, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "No response received.";
      setChat(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setChat(prev => [...prev, { role: "assistant", content: "⚠️ Could not connect to AI. Please try again." }]);
    }
    setLoading(false);
  };

  return <div>
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", color: C.text, margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>AI Site Intelligence</h2>
      <p style={{ color: C.dim, margin: 0, fontSize: 12 }}>Powered by Claude — Ask anything about your construction site</p>
    </div>

    {/* Quick actions */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 20 }}>
      {quickInsights.map(qi => <button key={qi.label} onClick={() => askAI(qi.q)} disabled={loading}
        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", cursor: loading ? "not-allowed" : "pointer", color: C.text, fontSize: 12, fontWeight: 600, textAlign: "left", fontFamily: "inherit", transition: "border-color 0.2s", opacity: loading ? 0.6 : 1 }}>
        {qi.label}
      </button>)}
    </div>

    {/* Chat area */}
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
        <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>Claude Construction AI — Live site context loaded</span>
      </div>

      <div style={{ minHeight: 300, maxHeight: 420, overflowY: "auto", padding: "16px 18px" }}>
        {chat.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: C.dim }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏗️</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Your AI Site Manager is ready</div>
          <div style={{ fontSize: 12 }}>Click a quick insight above or ask any question about your site below</div>
        </div>}

        {chat.map((msg, i) => <div key={i} style={{ marginBottom: 16, display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
          <div style={{ maxWidth: "85%", background: msg.role === "user" ? C.orange : C.deep, borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "11px 15px", fontSize: 13, color: msg.role === "user" ? "#fff" : "#c8daf0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {msg.content}
          </div>
          <div style={{ color: C.dim, fontSize: 10, marginTop: 3 }}>{msg.role === "user" ? "You" : "Claude AI"}</div>
        </div>)}

        {loading && <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.muted, fontSize: 13 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />)}
          </div>
          Claude is analysing your site data…
        </div>}
      </div>

      {/* Input */}
      <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
        <input value={prompt} onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && askAI(prompt)}
          placeholder="Ask about your site: delays, costs, workers, materials…"
          style={{ ...IS, flex: 1, background: C.deep }} disabled={loading} />
        <button onClick={() => askAI(prompt)} disabled={loading || !prompt.trim()} style={{ ...BP(C.orange), opacity: loading || !prompt.trim() ? 0.5 : 1, flexShrink: 0 }}>
          <SVG d={IC.send} s={15} /> Ask
        </button>
      </div>
    </div>

    <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
  </div>;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useState(initTasks);
  const [workers, setWorkers] = useState(initWorkers);
  const [materials, setMaterials] = useState(initMaterials);
  const [budget, setBudget] = useState(initBudget);

  const nav = [
    { k: "dashboard", l: "Dashboard", i: IC.dash, c: C.orange },
    { k: "tasks", l: "Tasks", i: IC.task, c: C.blue },
    { k: "workers", l: "Workers", i: IC.worker, c: C.green },
    { k: "materials", l: "Materials", i: IC.material, c: C.amber },
    { k: "budget", l: "Budget", i: IC.budget, c: C.purple },
    { k: "ai", l: "AI Insights", i: IC.ai, c: C.cyan },
  ];

  const alerts = materials.filter(m => m.status !== "In Stock").length + tasks.filter(t => t.status === "Blocked").length;

  return <>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'IBM Plex Sans', sans-serif", color: "#c8daf0", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "18px 10px", flexShrink: 0 }}>
        <div style={{ padding: "0 8px 20px", borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.orange}, #dc2626)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏗️</div>
            <div>
              <div style={{ color: C.text, fontWeight: 800, fontSize: 14, fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>BuildTrack</div>
              <div style={{ color: C.dim, fontSize: 10 }}>Site Manager v1.0</div>
            </div>
          </div>
        </div>

        {nav.map(n => <button key={n.k} onClick={() => setPage(n.k)} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 10px", background: page === n.k ? C.border + "88" : "none", color: page === n.k ? n.c : C.muted, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: page === n.k ? 700 : 500, marginBottom: 2, fontFamily: "inherit", textAlign: "left", position: "relative" }}>
          <SVG d={n.i} s={15} />{n.l}
          {n.k === "ai" && <span style={{ marginLeft: "auto", background: C.cyan + "22", color: C.cyan, fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 99, border: `1px solid ${C.cyan}44` }}>AI</span>}
          {n.k === "materials" && alerts > 0 && <span style={{ marginLeft: "auto", background: C.red, color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 99, minWidth: 16, textAlign: "center" }}>{alerts}</span>}
        </button>)}

        <div style={{ marginTop: "auto", padding: "14px 8px 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ color: C.dim, fontSize: 10 }}>Westlands Commercial</div>
          <div style={{ color: C.orange, fontSize: 10, fontWeight: 600 }}>🟢 Site Active</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 26px" }}>
        {page === "dashboard" && <Dashboard tasks={tasks} workers={workers} materials={materials} budget={budget} />}
        {page === "tasks" && <Tasks tasks={tasks} setTasks={setTasks} />}
        {page === "workers" && <Workers workers={workers} setWorkers={setWorkers} />}
        {page === "materials" && <Materials materials={materials} setMaterials={setMaterials} />}
        {page === "budget" && <Budget budget={budget} setBudget={setBudget} />}
        {page === "ai" && <AIInsights tasks={tasks} workers={workers} materials={materials} budget={budget} />}
      </div>
    </div>
  </>;
}
