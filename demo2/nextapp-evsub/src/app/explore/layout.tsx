export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-grow w-full relative flex flex-col lg:flex-row">
      <div className="h-screen lg:h-auto lg:w-1/3 flex flex-col">{children}</div>
      <div className="h-screen lg:h-auto lg:w-2/3 flex flex-col items-center justify-center">Canvas goes here</div>
    </section>
  );
}
