export default function ChatDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl">{children}</div>
    </section>
  );
}
