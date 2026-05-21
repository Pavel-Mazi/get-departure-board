interface HeaderProps {
  time: string;
}

export function Header({ time }: HeaderProps) {
  return (
    <div className="w-full h-[100px] px-6 py-8 bg-[#24315b] flex justify-between items-center overflow-hidden shrink-0">
      {/* Logo — SVG contains both mark and ГЭТ lettering */}
      <img src="/logo.svg" alt="ГЭТ" className="h-[46px] w-auto" />

      {/* Live clock */}
      <span className="text-white text-[68px] font-extrabold leading-none whitespace-nowrap"
        style={{ fontFamily: 'Inter, sans-serif' }}>
        {time}
      </span>
    </div>
  );
}
