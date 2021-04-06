export const MODULE_NAME = 'simplemobile';

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
}


// export enum settings {
//   SIMPLE_MOBILE_LAST_TOKEN = 'lasttoken',
//   SIMPLE_MOBILE_MOVEMENT_DIRECTION = 'movementdirection',
//   SIMPLE_MOBILE_CPS = 'cps',
//   SIMPLE_MOBILE_AUTO_ROTATION = 'autorotation',
//   SIMPLE_MOBILE_INVERT_ROTATION = 'invertrotation',
//   SIMPLE_MOBILE_PERFORMANCE_OP = 'performanceop',
// }


// interface Callbacks {
//   [setting: string]: (value) => void;
// }

// const noop = (): void => {
//   return;
// };

// const moduleSettings = [
// // export const registerSettings = function () {
//   {
//     setting: settings.SIMPLE_MOBILE_LAST_TOKEN,
//     name: 'Last Token',
//     hint: 'This is the value where the last selected token will be saved',
//     scope: 'client',
//     default: "0",
//    type: String,
//   },
//   {
//     setting: settings.SIMPLE_MOBILE_MOVEMENT_DIRECTION,
//     name: 'Movement Swich',
//     hint: 'This is the value the movement values is saved',
//     scope: 'client',
//     default: "",
//     type: String,
//   },
//   {
//     setting: settings.SIMPLE_MOBILE_CPS,
//     name: 'Camera Pan Speed',
//     hint: 'How many pixels the camera pans when tapping on the screen',
//     scope: 'world',
//     default: "25",
//     type: String,
//   },
//   {
//     setting: settings.SIMPLE_MOBILE_AUTO_ROTATION,
//     name: 'Auto Rotate',
//     hint: 'Automatically Rotate tokens based on where they are going',
//     scope: 'world',
//     default: true,
//     type: Boolean,
//   },
//   {
//     setting: settings.SIMPLE_MOBILE_INVERT_ROTATION,
//     name: 'Invert Rotation',
//     hint: 'Inverts the rotation of the token',
//     scope: 'client',
//     default: true,
//     type: Boolean,
//   },
//   {
//     setting: settings.SIMPLE_MOBILE_PERFORMANCE_OP,
//     name: 'Performance Optimization',
//     hint: 'Limits the functionality of simple mobile to optimize it for slower devices, also disabled the canvas (where scenes are rendered on)',
//     scope: 'client',
//     default: false,
//     type: Boolean,
//   }
// ]


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

// export function getSetting(setting: settings): any {
//   return game.settings.get(MODULE_NAME, setting as string);
// }

// export function setSetting(setting: settings, value): Promise<any> {
//   return game.settings.set(MODULE_NAME, setting as string, value);
// }
