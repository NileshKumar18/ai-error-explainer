export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-xs font-bold tracking-tighter uppercase">Explainer.AI</span>
      </div>
      <button className="text-[10px] text-slate-500 hover:text-white transition-colors">
        CLEAR HISTORY
      </button>
    </header>
  );
}