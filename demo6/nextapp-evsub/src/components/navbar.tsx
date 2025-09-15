// 'use client';

// import { useState, useReducer } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  // NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { OriginIcon } from "@/components/icons";

import { Origin360EVIcon } from "@/components/icons";

export const Navbar = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);


  return (
    // <HeroUINavbar disableAnimation maxWidth="xl" position="sticky" onMenuOpenChange={setIsMenuOpen}  isMenuOpen={isMenuOpen} >
    <HeroUINavbar 
      disableAnimation 
      // maxWidth="xl"
      maxWidth="2xl" 
      position="sticky" 
    >

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* <NavbarMenuToggle className="lg:hidden"/> */}
        {/* <ul className="flex gap-4 justify-start ml-2">
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
        </ul> */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink 
            className="flex justify-start items-center gap-1 px-20" 
            href="https://www.originenergy.com.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Origin360EVIcon className="text-primary" height={8} width={8} /> */}
            <img src="/icons/origin360-ev-logo.svg" alt="Origin 360EV" className="h-20 w-52"/>
            {/* <p className="font-bold text-primary">Origin</p> */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      {/* <NavbarContent className="basis-1 pl-4" justify="end">
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
      </NavbarContent> */}
      {/* <NavbarMenu>
        {siteConfig.navItems.map((item) => (
            <NavbarMenuItem key={`menu-${item.href}`}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
                onClick={() => setIsMenuOpen()}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
      </NavbarMenu> */}
    </HeroUINavbar>
  );
};
