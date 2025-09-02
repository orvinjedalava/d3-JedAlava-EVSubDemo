import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

import Transition from "@/components/transition";

export default function Home() {
  return (
    <Transition>
      <section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10 h-[60vh]">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Ready to go&nbsp; 
          </span>
          <span className={title({ color: "violet" })}>Electric&nbsp;</span>
          <span className={title()}>
            ? 
          </span>
          
        </div>

        <div className="flex gap-3">
          <Link
            className="bg-secondary text-black font-medium py-2 px-4 rounded-full hover:bg-secondary-light"
              style={{ 
                transition: 'background-color 0.25s ease-in-out',
              }}
            href={siteConfig.navItems.find(item => item.label === "Calculator")?.href || "/calculator"}
          >
              Start Here 
          </Link>
          
        </div>

        
      </section>
    </Transition>
  );
}
