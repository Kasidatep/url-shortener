import {
  Squares2X2Icon,
  LinkIcon,
  RectangleStackIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
const icons = [
  Squares2X2Icon,
  LinkIcon,
  RectangleStackIcon,
  ChartBarIcon,
  QrCodeIcon,
  ShieldCheckIcon,
];
export default function HelpCategoryNav({
  categories,
  active,
  onChange,
  label,
  counts,
}: {
  categories: string[];
  active: number;
  onChange: (index: number) => void;
  label: string;
  counts: number[];
}) {
  return (
    <nav className="help-categories" aria-label={label}>
      {categories.map((title, index) => {
        const Icon = icons[index];
        return (
          <button
            type="button"
            key={title}
            aria-pressed={active === index}
            onClick={() => onChange(index)}
          >
            <Icon aria-hidden="true" />
            <span>{title}</span>
            <small aria-hidden="true">{counts[index]}</small>
          </button>
        );
      })}
    </nav>
  );
}
