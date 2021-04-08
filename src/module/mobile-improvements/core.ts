import type { MobileMenu } from "./menu.js";
import type { WindowSelector } from "./windowSelector.js";
import type { MobileNavigation } from "./mobileNavigation.js";

// Core singleton
export class MobileImprovementsCore {
  static windowSelector: WindowSelector;
  static navigation: MobileNavigation;
  static menu: MobileMenu;
}
