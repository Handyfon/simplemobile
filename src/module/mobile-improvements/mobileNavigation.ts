import { MODULE_NAME } from "../settings.js";
import { settings, getSetting } from "../settings.js";

enum ViewState {
  Map,
  Sidebar,
}
enum DrawerState {
  None,
  Macros = "macros",
  Menu = "menu",
  Windows = "windows",
}

declare let ui: { sidebar: Sidebar; hotbar: any };

export class MobileNavigation extends Application {
  state: ViewState = ViewState.Map;
  drawerState: DrawerState = DrawerState.None;

  public get elem(): JQuery<HTMLElement> {
    return this.element as JQuery<HTMLElement>;
  }

  constructor() {
    super({
      //template: "modules/mobile-improvements/templates/navigation.html",
      template: `/modules/${MODULE_NAME}/templates/system-compatibility/base/navigation.html`,
      popOut: false,
    });
    // Ensure HUD shows on opening a new window
    Hooks.on("WindowManager:NewRendered", () => {
      $(document.body).removeClass("hide-hud");
    });
  }

  activateListeners(html: JQuery<HTMLElement>): void {
    html.find("li").click((evt, as) => {
      const [firstClass] = evt.currentTarget.className.split(" ");
      const [_, name] = firstClass.split("-");
      this.selectItem(name);
    });
    this.updateMode();
  }

  showMap() {
    const minimized = window.WindowManager.minimizeAll();
    console.log(minimized);
    this.state = ViewState.Map;
    //@ts-ignore
    canvas.app.start();
  }

  showSidebar() {
    this.state = ViewState.Sidebar;
    $(document.body).removeClass("hide-hud");
    ui.sidebar.expand();
    window.WindowManager.minimizeAll();
    if (getSetting(settings.SIDEBAR_PAUSES_RENDER) === true) {
      //@ts-ignore
      canvas.app.stop();
    }
  }

  showHotbar() {
    $(document.body).addClass("show-hotbar");
    ui.hotbar.expand();
  }

  hideHotbar() {
    $(document.body).removeClass("show-hotbar");
  }

  setWindowCount(count: number) {
    this.elem.find(".navigation-windows span span").html(count.toString());
  }

  setDrawerState(state: DrawerState) {
    $(`body > .drawer`).removeClass("open");
    this.elem.find(".toggle.active").removeClass("active");
    this.hideHotbar();
    if (state == DrawerState.None || state == this.drawerState) {
      this.drawerState = DrawerState.None;
      return;
    }

    this.drawerState = state;
    if (state == DrawerState.Macros) {
      this.showHotbar();
    } else {
      console.log(state);
      $(`body > .drawer.drawer-${state}`).addClass("open");
    }
    this.elem.find(`.navigation-${state}`).addClass("active");
  }

  selectItem(name: string) {
    console.log(name);
    switch (name) {
      case "map":
        this.showMap();
        this.setDrawerState(DrawerState.None);
        break;
      case "sidebar":
        this.showSidebar();
        this.setDrawerState(DrawerState.None);
        break;
      default:
        this.setDrawerState(name as DrawerState);
    }

    this.updateMode();
  }

  updateMode() {
    this.elem.find(".active:not(.toggle)").removeClass("active");
    $(document.body).removeClass("show-sidebar");

    switch (this.state) {
      case ViewState.Map:
        this.elem.find(".navigation-map").addClass("active");
        break;
      case ViewState.Sidebar:
        this.elem.find(".navigation-sidebar").addClass("active");
        $(document.body).addClass("show-sidebar");
        break;
      default:
        break;
    }
  }
}
