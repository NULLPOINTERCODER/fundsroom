import { 
  Building2, 
  Users, 
  Package, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onGoToSignIn: (demoEmail?: string) => void;
}

export default function LandingPage({ onGoToSignIn }: LandingPageProps) {
  const demoRoles = [
    { title: 'Admin Console', role: 'ADMIN', email: 'admin@fundsroom.com', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', desc: 'Full System Access: Manage users, customers, products, and full challan lifecycle.' },
    { title: 'Sales CRM', role: 'SALES', email: 'sales@fundsroom.com', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', desc: 'Customer CRM, add/edit leads, create & confirm sales delivery challans.' },
    { title: 'Warehouse Portal', role: 'WAREHOUSE', email: 'warehouse@fundsroom.com', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', desc: 'Catalog management, manual stock intake & movement log audits.' },
    { title: 'Accounts & Audit', role: 'ACCOUNTS', email: 'accounts@fundsroom.com', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', desc: 'View ledger, cancel challans/invoices & release stock locks.' },
  ];

  const features = [
    {
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      title: 'Customer CRM & Lead Pipeline',
      desc: 'Track customer profiles, GSTIN validation, classification (Retail, Wholesale, Distributor), and full interaction timeline follow-up notes.'
    },
    {
      icon: Package,
      color: 'from-amber-500 to-orange-500',
      title: 'Real-Time Inventory & Stock Audit',
      desc: 'Catalog tracking with SKU codes, category tags, location mapping, minimum safety stock alerts, and timestamped IN/OUT movement history.'
    },
    {
      icon: FileText,
      color: 'from-sky-500 to-blue-500',
      title: 'Sales Challans & PDF Invoices',
      desc: 'Create sales challans with automatic sequential numbering, snapshot pricing, atomic stock reservation, and official printable PDF delivery notes.'
    },
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Strict permission scoping for Admin, Sales, Warehouse, and Accounts teams ensuring data integrity across departments.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Ambient background blur elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-xl shadow-lg shadow-sky-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white uppercase">FUNDSROOM</span>
              <span className="ml-1.5 text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">ERP</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-400">
            <a href="#overview" className="hover:text-white transition">Overview</a>
            <a href="#features" className="hover:text-white transition">Features & Modules</a>
            <a href="#demo-roles" className="hover:text-white transition">Role Access</a>
            <a href="#architecture" className="hover:text-white transition">Tech Stack</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onGoToSignIn()}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onGoToSignIn()}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-500/20 active:scale-95 transition cursor-pointer"
            >
              <span>Launch Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="overview" className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Wholesale & Distribution ERP / CRM Platform</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Next-Gen Inventory Control & <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Sales Operations Portal</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
          Designed for wholesale distributors. Automate stock deduction, manage sales challans, track customer leads, and ensure atomic transactional integrity.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onGoToSignIn()}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-500/25 active:scale-95 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Open Demo Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#demo-roles"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold text-sm rounded-2xl transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Explore Test Accounts</span>
          </a>
        </div>

        {/* Interactive Dashboard Preview Showcase Card */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl relative group">
            
            {/* Top Browser Dots */}
            <div className="flex items-center space-x-2 px-3 py-2 border-b border-slate-800/80 mb-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-[11px] font-mono text-slate-500 ml-2">https://fundsroom-erp.app/dashboard</span>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="p-6 bg-slate-950 rounded-2xl space-y-6 text-left border border-slate-850">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">System Operations Overview</h3>
                  <p className="text-xs text-slate-400">Real-time inventory locks & challan ledger</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live PostgreSQL Connected
                </span>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-xs text-slate-400">Active Customers</p>
                  <p className="text-2xl font-black text-white">1,248</p>
                  <p className="text-[10px] text-purple-400 font-semibold">+18% this month</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-xs text-slate-400">Inventory Units</p>
                  <p className="text-2xl font-black text-sky-400">45,890</p>
                  <p className="text-[10px] text-slate-400">Across 3 Warehouses</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <p className="text-xs text-slate-400">Confirmed Challans</p>
                  <p className="text-2xl font-black text-emerald-400">₹4.82M</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Stock Locked</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* STATS BAR */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-black text-white font-mono">100%</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Atomic Transactions</p>
          </div>
          <div>
            <p className="text-3xl font-black text-sky-400 font-mono">4 Roles</p>
            <p className="text-xs text-slate-400 font-medium mt-1">RBAC Access Levels</p>
          </div>
          <div>
            <p className="text-3xl font-black text-purple-400 font-mono">Real-Time</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Stock Movement Audits</p>
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-400 font-mono">Neon DB</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Cloud PostgreSQL</p>
          </div>
        </div>
      </section>

      {/* FEATURES & MODULES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">Enterprise Architecture</h2>
          <p className="text-3xl font-extrabold text-white">Built for High-Volume Wholesale Workflows</p>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">Every component is engineered to maintain data consistency, historical snapshots, and exact audit trails.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4 hover:border-slate-700 transition duration-200 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} p-3 text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEMO ROLES SECTION */}
      <section id="demo-roles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-slate-900/20 rounded-3xl border border-slate-800/60 my-8">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest">One-Click Testing</h2>
          <p className="text-3xl font-extrabold text-white">Select a Role & Launch Portal</p>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">Test the system across different departments using pre-seeded test accounts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoRoles.map((r, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition group">
              <div className="space-y-3">
                <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md border ${r.badge}`}>
                  {r.role}
                </span>
                <h4 className="text-base font-bold text-white">{r.title}</h4>
                <p className="text-xs text-slate-400">{r.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <p className="text-[10px] font-mono text-slate-500">{r.email}</p>
                <button
                  onClick={() => onGoToSignIn(r.email)}
                  className="w-full py-2 bg-slate-800 hover:bg-sky-500 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Sign In as {r.role}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK & ARCHITECTURE */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Powered By Full Stack Technologies</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['React 18', 'TypeScript', 'Node.js', 'Express.js', 'Prisma ORM', 'Neon PostgreSQL', 'Vite', 'Tailwind CSS'].map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-slate-300">FUNDSROOM Wholesale ERP & CRM Operations Portal</span>
        </div>
        <p>© 2026 Production Ready Monorepo Architecture.</p>
      </footer>

    </div>
  );
}
