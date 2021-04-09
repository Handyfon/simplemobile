export const MODULE_NAME = 'simplemobile';

/**
 * Because typescript doesn’t know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it’s typed as declare let canvas: Canvas | {ready: false}.
 * That’s why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because a „no canvas“ mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getCanvas(): Canvas {
    if (!(canvas instanceof Canvas) || !canvas.ready) {
        throw new Error("Canvas Is Not Initialized");
    }
    return canvas;
}

export function isMobile(): boolean{
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true;
  }else{
    return false;
  }
}

export const registerSettings = function () {

    game.settings.register(MODULE_NAME, 'lasttoken', {
        name: 'Last Token',
        hint: 'This is the value where the last selected token will be saved',
        scope: 'client',
        config: false,
        default: "0",
		type: String,
    });
	game.settings.register(MODULE_NAME, 'movementdirection', {
        name: 'Movement Swich',
        hint: 'This is the value the movement values is saved',
        scope: 'client',
        config: false,
        default: "",
        type: String,
    });
	game.settings.register(MODULE_NAME, 'cps', {
        name: 'Camera Pan Speed',
        hint: 'How many pixels the camera pans when tapping on the screen',
        scope: 'world',
        config: true,
        default: "25",
        type: String,
    });
	game.settings.register(MODULE_NAME, 'autorotation', {
        name: 'Auto Rotate',
        hint: 'Automatically Rotate tokens based on where they are going',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
 	game.settings.register(MODULE_NAME, 'invertrotation', {
        name: 'Invert Rotation',
        hint: 'Inverts the rotation of the token',
        scope: 'client',
        config: true,
        default: true,
        type: Boolean,
    });
  	game.settings.register(MODULE_NAME, 'performanceop', {
        name: 'Performance Optimization',
        hint: 'Limits the functionality of simple mobile to optimize it for slower devices, also disabled the canvas (where scenes are rendered on)',
        scope: 'client',
        config: true,
        default: false,
        type: Boolean,
    });

    // =====================================
    // MOBILE IMPROVEMENTS
    // =====================================

    game.settings.register(MODULE_NAME, settings.SIDEBAR_PAUSES_RENDER, {
      name: "Pause rendering in sidebar",
      hint: "Pauses rendering of the map while the sidebar is active",
      scope: "client",
      config: true,
      default: false,
      type: Boolean,
      //onChange: callbacks[setting] || noop,
    });

    // ============================================
    // EXPLICIT SETTINGS FOR CSS ON SPECIFIC SYSTEM
    // ============================================

    game.settings.register(MODULE_NAME, 'loadMobile', {
      name: "Load Simple mobile",
      hint: "Load Simple Mobile",
      scope: 'client',
      config: true,
      default: isMobile(),
      type: Boolean,
      onChange: data => {
        if(data === true){
          $(document.body).addClass("simplemobile");
        }else{
          $(document.body).removeClass("simplemobile");
        }
      }
    });

    game.settings.register(MODULE_NAME, 'loadMobileSystemDnd5e', {
      name: "Load System DND5e",
      hint: "Load System DND5e",
      scope: 'client',
      config: true,
      default: isMobile(),
      type: Boolean,
      onChange: (data) => {
        if(data === true && document.getElementsByClassName('dnd5e').length >= 1){
          for(var index=0; index < document.getElementsByClassName('dnd5e').length; index++){
            if(!document.getElementsByClassName('dnd5e')[index].classList.contains('simplemobile')){
              document.getElementsByClassName('dnd5e')[index].classList.add('simplemobile');
            }
          }
        }else{
          if(document.getElementsByClassName('dnd5e')[index].classList.contains('simplemobile')){
            document.getElementsByClassName('dnd5e')[index].classList.remove('simplemobile');
          }
        }
      }
    });

    // const loadMobileSystemDnd5e = game.settings.get(MODULE_NAME, 'loadMobileSystemDnd5e');

    // (loadMobileSystemDnd5e && document.getElementsByClassName('dnd5e').length >= 1) ?
    //   document.getElementsByClassName('dnd5e')[0].classList.add('simplemobile') :
    //   document.getElementsByClassName('dnd5e')[0].classList.remove('simplemobile');

    // TODO SETUP OTHER SYSTEMS

    // game.settings.register(MODULE_NAME, 'loadMobileSystemPF2e', {
    //   name: "Load System PF2e",
    //   hint: "Load System PF2e",
    //   scope: 'world',
    //   config: true,
    //   default: false,
    //   type: Boolean,
    //   onChange: data => {
    //     (data === true && document.getElementsByClassName('dnd5e').length >= 1) ? document.getElementsByClassName('dnd5e')[0].classList.add('simplemobile') : document.getElementsByClassName('dnd5e')[0].classList.remove('simplemobile');
    //   }
    // });

    // const loadMobileSystemPF2e = game.settings.get(MODULE_NAME, 'loadMobileSystemDnd5e');
    // (loadMobileSystemPF2e && document.getElementsByClassName('dnd5e').length >= 1) ? document.getElementsByClassName('dnd5e')[0].classList.add('simplemobile') : document.getElementsByClassName('dnd5e')[0].classList.remove('simplemobile');

}

export enum settings {
  SIDEBAR_PAUSES_RENDER = "sideBarPausesRender",
}

// interface Callbacks {
//   [setting: string]: (value) => void;
// }

// const noop = (): void => {
//   return;
// };

// const moduleSettings = [
//   {
//     setting: settings.SIDEBAR_PAUSES_RENDER,
//     name: "Pause rendering in sidebar",
//     hint: "Pauses rendering of the map while the sidebar is active",
//     type: Boolean,
//     default: false,
//   },
// ];

// function registerSetting(callbacks: Callbacks, { setting, ...options }): void {
//   game.settings.register(MODULE_NAME, setting, {
//     config: true,
//     scope: "client",
//     ...options,
//     onChange: callbacks[setting] || noop,
//   });
// }

// export function registerSettings(callbacks: Callbacks = {}): void {
//   moduleSettings.forEach(item => {
//     registerSetting(callbacks, item);
//   });
// }

export function getSetting(setting: settings): any {
  return game.settings.get(MODULE_NAME, setting as string);
}

export function setSetting(setting: settings, value): Promise<any> {
  return game.settings.set(MODULE_NAME, setting as string, value);
}
