interface CarTitleProps {
  title: string;
  subtitle: string;
}

export const CarTitle = ({ title, subtitle }: CarTitleProps) => {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-default-500">{subtitle}</p>
    </div>
  );
}