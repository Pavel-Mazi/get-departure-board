import type { TheoryFlags } from '../types';

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-4 px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-left"
      style={{
        borderColor: checked ? '#3257a1' : '#e2e8f0',
        background: checked ? 'rgba(50,87,161,0.08)' : '#f8fafc',
      }}
    >
      {/* Toggle pill */}
      <div
        className="relative shrink-0 w-[52px] h-[28px] rounded-full transition-colors duration-200"
        style={{ background: checked ? '#3257a1' : '#cbd5e1' }}
      >
        <div
          className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow transition-transform duration-200"
          style={{ transform: checked ? 'translateX(27px)' : 'translateX(3px)' }}
        />
      </div>
      {/* Text */}
      <div>
        <div className="text-[16px] font-semibold text-[#1e293b]"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          {label}
        </div>
        <div className="text-[13px] text-[#64748b] mt-0.5"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          {description}
        </div>
      </div>
    </button>
  );
}

interface TheoryBarProps {
  flags: TheoryFlags;
  onToggle: (key: keyof TheoryFlags) => void;
}

export function TheoryBar({ flags, onToggle }: TheoryBarProps) {
  return (
    <div className="w-full border-t-2 border-[#e2e8f0] bg-[#f1f5f9] px-8 py-5">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[13px] font-semibold uppercase tracking-widest text-[#94a3b8]"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          Теории интерфейса
        </span>
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>
      <div className="flex gap-4">
        <Toggle
          label="Теория А — Теги в колонке трассы"
          description='Статусы «В парк», «Маршрут» и т.д. переносятся в колонку «Измененная трасса»'
          checked={flags.badgesInRouteColumn}
          onChange={() => onToggle('badgesInRouteColumn')}
        />
        <Toggle
          label="Теория Б — Короткий код трассы"
          description="Вместо полного текста маршрута — одна литера: «С», «Б», «И»"
          checked={flags.shortRouteCode}
          onChange={() => onToggle('shortRouteCode')}
        />
      </div>
    </div>
  );
}
