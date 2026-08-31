export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0805] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-[#2A2A2A] rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-[#F7931A] rounded-full animate-spin" />
        </div>
        <p className="text-[#A0A0A0] text-sm tracking-widest uppercase animate-pulse">
          Загрузка...
        </p>
      </div>
    </div>
  );
}