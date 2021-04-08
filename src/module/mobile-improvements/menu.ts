import { MODULE_NAME } from "../settings";

export class MobileMenu extends Application {
  public get elem(): JQuery<HTMLElement> {
    return this.element as JQuery<HTMLElement>;
  }

  constructor() {
    super({
      //template: "modules/mobile-improvements/templates/menu.html",
      template: `/modules/${MODULE_NAME}/templates/system-compatibility/base/menu.html`,
      popOut: false,
    });
  }
  activateListeners(html: JQuery<HTMLElement>): void {
    html.find("li").click((evt, as) => {
      const [firstClass] = evt.currentTarget.className.split(" ");
      const [_, name] = firstClass.split("-");
      this.selectItem(name);
    });
  }

  toggleOpen() {
    this.elem.toggleClass("open");
  }

  selectItem(name: string) {
    console.log(name);
    switch (name) {
      case "fullscreen":
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
      default:
        break;
    }
  }
}
