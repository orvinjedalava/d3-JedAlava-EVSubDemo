import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { OriginIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent className="basis-1 pl-4" justify="end">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink 
            className="flex justify-start items-center gap-1" 
            href="https://www.originenergy.com.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OriginIcon className="text-primary"/>
            <p className="font-bold text-primary">Origin</p>
          </NextLink>
        </NavbarBrand>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
