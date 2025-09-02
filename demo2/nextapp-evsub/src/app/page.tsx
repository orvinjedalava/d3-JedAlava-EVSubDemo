import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, OriginIcon } from "@/components/icons";

import Transition from "@/components/transition";
import { appSettings } from "@/config/app";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <Transition>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Ready to go&nbsp; 
          </span>
          <span className={title({ color: "blue" })}>Electric&nbsp;</span>
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
