import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Film,
  Home,
  Image,
  Info,
  Lock,
  NotebookTabs,
  Settings,
  Sparkles,
  Utensils,
} from "lucide-react";

export type NavigationKey =
  | "dashboard"
  | "fiction"
  | "film"
  | "media"
  | "fnb"
  | "information"
  | "nsfw"
  | "ideaverse"
  | "documents"
  | "settings";

export type NavigationItem = {
  key: NavigationKey;
  label: string;
  href: string;
  icon: LucideIcon;
};

export type MenuItem = {
  label: string;
  href: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export const primaryNavigation: NavigationItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  { key: "fiction", label: "Fiction", href: "/fiction", icon: BookOpen },
  { key: "film", label: "Film", href: "/film", icon: Film },
  { key: "media", label: "Media", href: "/media", icon: Image },
  { key: "fnb", label: "F&B", href: "/fnb", icon: Utensils },
  { key: "information", label: "Information", href: "/information", icon: Info },
  { key: "nsfw", label: "NSFW", href: "/nsfw", icon: Lock },
  { key: "ideaverse", label: "Ideaverse", href: "/ideaverse", icon: NotebookTabs },
  { key: "documents", label: "RAG", href: "/documents", icon: Sparkles },
];

export const systemNavigation: NavigationItem[] = [
  { key: "settings", label: "Settings", href: "/settings", icon: Settings },
];

export const moduleMenus: Partial<Record<NavigationKey, MenuSection[]>> = {
  fiction: [
    {
      title: "Fiction",
      items: [
        { label: "Dashboard", href: "/fiction" },
        { label: "Convert", href: "/fiction/convert" },
        { label: "Manga", href: "/fiction/manga" },
        { label: "Manhua", href: "/fiction/manhua" },
        { label: "Manhwa", href: "/fiction/manhwa" },
        { label: "Novel", href: "/fiction/novel" },
        { label: "Book", href: "/fiction/book" },
        { label: "Character", href: "/fiction/character" },
        { label: "Author", href: "/fiction/author" },
      ],
    },
  ],
  film: [
    {
      title: "Film",
      items: [
        { label: "Dashboard", href: "/film" },
        { label: "Movie", href: "/film/movie" },
        { label: "Series", href: "/film/series" },
        { label: "Actor", href: "/film/actor" },
        { label: "Character", href: "/film/character" },
      ],
    },
  ],
  media: [
    {
      title: "Media",
      items: [
        { label: "Dashboard", href: "/media" },
        { label: "Album", href: "/media/album" },
        { label: "Image", href: "/media/image" },
        { label: "Picture", href: "/media/picture" },
        { label: "Illustration", href: "/media/illustration" },
        { label: "Illustrator", href: "/media/illustrator" },
        { label: "Video", href: "/media/video" },
        { label: "Music", href: "/media/music" },
        { label: "Musician", href: "/media/musician" },
      ],
    },
  ],
  fnb: [
    {
      title: "F&B",
      items: [
        { label: "Dashboard", href: "/fnb" },
        { label: "Food", href: "/fnb/food" },
        { label: "Beverage", href: "/fnb/beverage" },
      ],
    },
  ],
  information: [
    {
      title: "Information",
      items: [
        { label: "Dashboard", href: "/information" },
        { label: "Health", href: "/information/health" },
        { label: "Technology", href: "/information/technology" },
        { label: "Miscellaneous", href: "/information/miscellaneous" },
      ],
    },
  ],
  nsfw: [
    {
      title: "NSFW",
      items: [
        { label: "Dashboard", href: "/nsfw" },
        { label: "Comic", href: "/nsfw/comic" },
        { label: "Image", href: "/nsfw/image" },
        { label: "Video", href: "/nsfw/video" },
        { label: "Character", href: "/nsfw/character" },
        { label: "Author", href: "/nsfw/author" },
      ],
    },
  ],
  ideaverse: [
    {
      title: "Ideaverse",
      items: [
        { label: "Dashboard", href: "/ideaverse" },
        { label: "Core", href: "/ideaverse/core" },
        { label: "Plot", href: "/ideaverse/plot" },
        { label: "Worldview & Factions", href: "/ideaverse/worldview" },
        { label: "Main Characters", href: "/ideaverse/main-characters" },
        { label: "Territory Setup", href: "/ideaverse/territory" },
        { label: "Pets", href: "/ideaverse/pets" },
        { label: "Weapons & Equipment", href: "/ideaverse/equipment" },
        { label: "Cultivation Arts", href: "/ideaverse/cultivation-arts" },
        { label: "Realms", href: "/ideaverse/realms" },
        { label: "Skills", href: "/ideaverse/skills" },
        { label: "Constitution", href: "/ideaverse/constitution" },
        { label: "Items", href: "/ideaverse/items" },
        { label: "Villains", href: "/ideaverse/villains" },
        { label: "Templates", href: "/ideaverse/templates" },
      ],
    },
  ],
};

function normalizePath(pathname: string) {
  return pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

export function getActiveNavigation(pathname: string): NavigationItem | undefined {
  const current = normalizePath(pathname);
  const all = [...primaryNavigation, ...systemNavigation];

  return all
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => current === normalizePath(item.href) || current.startsWith(`${normalizePath(item.href)}/`));
}

export function isMenuItemActive(pathname: string, itemHref: string, moduleRootHref: string) {
  const current = normalizePath(pathname);
  const item = normalizePath(itemHref);
  const moduleRoot = normalizePath(moduleRootHref);

  if (item === moduleRoot) {
    return current === item;
  }

  return current === item || current.startsWith(`${item}/`);
}

export function getMenuSectionsForPath(pathname: string): MenuSection[] {
  const active = getActiveNavigation(pathname);
  if (!active) {
    return [];
  }

  return moduleMenus[active.key] ?? [];
}
