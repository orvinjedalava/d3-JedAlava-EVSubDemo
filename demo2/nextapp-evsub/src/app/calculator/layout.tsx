export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-grow w-full relative flex flex-col lg:flex-row">
      <div className="border border-red-500 lg:w-1/3 ">{children}</div>
      <div className="border border-blue-500 lg:w-2/3 ">Right</div>
    </section>
  );
}
