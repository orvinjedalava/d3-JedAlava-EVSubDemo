import { CardsPanel } from '@/components/cards-panel';

export default function BrowsePage() {
  return (
    <section className="flex-grow w-full relative flex flex-col gap-2 lg:flex-row">
      <CardsPanel/>
    </section>
  );
}