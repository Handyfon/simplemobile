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