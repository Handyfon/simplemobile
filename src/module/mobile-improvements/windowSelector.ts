import { Window } from "./windowManager";
import { MobileImprovementsCore } from "./core.js";
import { MODULE_NAME } from "../settings";

const icons = {
  "": "",
  combat: "fa-fist-raised",
  scenes: "fa-map",
  scene: "fa-map",
  actors: "fa-users",
  actor: "fa-users",
  items: "fa-suitcase",
  item: "fa-suitcase",
  journal: "fa-book-open",
  tables: "fa-th-list",
  playlists: "fa-music",
  compendium: "fa-atlas",
  settings: "fa-cogs",
  npc: "fa-skull",
  character: "fa-user",
  spell: "fa-magic",
  equipment: "fa-tshirt",
  feat: "fa-hand-rock",
  class: "fa-user",
};

export class WindowSelector extends Application {
  list: JQuery = null;

  constructor() {
    super({
      //template: "modules/mobile-improvements/templates/window-selector.html",
      template: `/modules/${MODULE_NAME}/templates/system-compatibility/base/window-selector.html`,
      popOut: false,
    });
    Hooks.on("WindowManager:NewRendered", this.windowAdded.bind(this));
    Hooks.on("WindowManager:Removed", this.windowRemoved.bind(this));
  }

  activateListeners(html: JQuery | HTMLElement): void {
    this.list = (<JQuery>this.element).find(".window-list");
  }
  toggleOpen() {
    (<JQuery>this.element).toggleClass("open");
  }
  // Attempt to discern the title and icon of the window
  winIcon(win: any) {
    let windowType: string =
      win.icon ||
      win.tabName ||
      win?.object?.data?.type ||
      win?.object?.data?.entity ||
      (win.metadata ? "compendium" : "") ||
      "";
    windowType = windowType.toLowerCase();
    const icon = icons[windowType] || windowType;
    return icon;
  }

  newWindow = (win: Window) => {
    const winIcon = this.winIcon(win.app);
    const windowButton = $(
      `<button class="window-select" title="${win.title}"><i class="fas ${winIcon}"></i> ${win.title}</button>`
    );
    const closeButton = $(
      `<button class="window-close" title="close"><i class="fas fa-times"></i></button>`
    );
    const row = $(`<li class="window-row"  data-id="${win.id}"></li>`);
    row.append(windowButton, closeButton);

    windowButton.click(ev => {
      ev.preventDefault();
      win.show();
      this.toggleOpen();
    });
    closeButton.click(ev => {
      ev.preventDefault();
      win.close();
    });
    return row;
  };
  windowAdded(appId) {
    this.list.append(this.newWindow(window.WindowManager.windows[appId]));
    this.update();
  }
  windowRemoved(appId) {
    this.list.find(`li[data-id="${appId}"]`).remove();
    this.update();
  }

  update() {
    const winCount = Object.values(window.WindowManager.windows).length;
    MobileImprovementsCore.navigation.setWindowCount(winCount);
  }
}
