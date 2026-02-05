// layouts/LayoutRenderer.jsx
import ModernLayout from "./modern/ModernLayout";
import ClassicLayout from "./classic/ClassicLayout";
import MinimalLayout from "./minimal/MinimalLayout";

const layouts = {
  modern: ModernLayout,
  classic: ClassicLayout,
  minimal: MinimalLayout,
};

export default function LayoutRenderer({ layout, ...props }) {
  const SelectedLayout = layouts[layout] || layouts.modern;
  return <SelectedLayout {...props} />;
}
