import * as THEME from './simple-mobile-theme.js';

const myHtml = document.getElementsByTagName('html');
const myBody = document.getElementsByTagName('body');
const moduleName = 'simple-mobile';

let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
			function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
			function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
			step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};

// Hex to RGB functio
function convertHexToRgb(color) {
	const hex = color.replace('#','');
	const r = parseInt(hex.substring(0,2), 16);
	const g = parseInt(hex.substring(2,4), 16);
	const b = parseInt(hex.substring(4,6), 16);
	return `${r}, ${g}, ${b}`;
}

function updateSettings(settings) {
	const {
		colorPrimary,
		colorBackground,
		colorBackgroundLightest,
		colorBackgroundLight,
		colorBackgroundDarkest,
		colorBackgroundButton,
		colorBackgroundChatMessage,
		colorBackgroundChatMessageWhisper,
		colorBackgroundChatMessageBlind,
		colorBorder,
		colorBorderLighter,
		colorFolderHeader,
		colorFolderDirectory,
		colorFolderSubdirectory,
		colorText,
		colorTextLightest,
		colorTextDarker,
		toggleLogo,
		toggleSceneThumbs,
		toggleCombatSidebar
	} = settings;

	// Theme
	colorPrimary ? document.documentElement.style.setProperty('--color-primary', convertHexToRgb(colorPrimary)) : null;
	colorBackground ? document.documentElement.style.setProperty('--color-background', convertHexToRgb(colorBackground)) : null;
	colorBackgroundLightest ? document.documentElement.style.setProperty('--color-background-lightest', convertHexToRgb(colorBackgroundLightest)) : null;
	colorBackgroundLight ? document.documentElement.style.setProperty('--color-background-light', convertHexToRgb(colorBackgroundLight)) : null;
	colorBackgroundDarkest ? document.documentElement.style.setProperty('--color-background-darkest', convertHexToRgb(colorBackgroundDarkest)) : null;
	colorBackgroundButton ? document.documentElement.style.setProperty('--color-background-button', convertHexToRgb(colorBackgroundButton)) : null;
	colorBackgroundChatMessage ? document.documentElement.style.setProperty('--color-background-chat-message', convertHexToRgb(colorBackgroundChatMessage)) : null;
	colorBackgroundChatMessageWhisper ? document.documentElement.style.setProperty('--color-background-chat-message-whisper', convertHexToRgb(colorBackgroundChatMessageWhisper)) : null;
	colorBackgroundChatMessageBlind ? document.documentElement.style.setProperty('--color-background-chat-message-blind', convertHexToRgb(colorBackgroundChatMessageBlind)) : null;
	colorBorder ? document.documentElement.style.setProperty('--color-border', convertHexToRgb(colorBorder)) : null;
	colorBorderLighter ? document.documentElement.style.setProperty('--color-border-lighter', convertHexToRgb(colorBorderLighter)) : null;
	colorFolderHeader ? document.documentElement.style.setProperty('--color-folder-header', convertHexToRgb(colorFolderHeader)) : null;
	colorFolderDirectory ? document.documentElement.style.setProperty('--color-folder-directory', convertHexToRgb(colorFolderDirectory)) : null;
	colorFolderSubdirectory ? document.documentElement.style.setProperty('--color-folder-subdirectory', convertHexToRgb(colorFolderSubdirectory)) : null;
	colorText ? document.documentElement.style.setProperty('--color-text', convertHexToRgb(colorText)) : null;
	colorTextLightest ? document.documentElement.style.setProperty('--color-text-lightest', convertHexToRgb(colorTextLightest)) : null;
	colorTextDarker ? document.documentElement.style.setProperty('--color-text-darker', convertHexToRgb(colorTextDarker)) : null;

	// Visual
// 	toggleLogo ? myHtml[0].classList.remove('-simple-mobile-logo') : myHtml[0].classList.add('-simple-mobile-logo');
// 	toggleSceneThumbs ? myHtml[0].classList.add('-simple-mobile-scene-thumbs') : myHtml[0].classList.remove('-simple-mobile-scene-thumbs');
// 	toggleCombatSidebar ? myHtml[0].classList.remove('-simple-mobile-sidebar-combat') : myHtml[0].classList.add('-simple-mobile-sidebar-combat');
}

class simpleMobileSettings {
	static get settings() {
		return mergeObject(
			this.defaultSettings, game.settings.get(moduleName, 'settings')
		);
	}

	static get defaultSettings() {
		return {
			colorPrimary: '#e57509',
			colorBackground: '#293e40',
			colorBackgroundLightest: '#e6e9eb',
			colorBackgroundLight: '#7d8a8c',
			colorBackgroundDarkest: '#090e10',
			colorBackgroundButton: '#7d7d7d',
			colorBackgroundChatMessage: '#e6e9eb',
			colorBackgroundChatMessageWhisper: '#ecf1fc',
			colorBackgroundChatMessageBlind: '#ffecf0',
			colorBorder: '#213234',
			colorBorderLighter: '#a7b0b2',
			colorFolderHeader: '#a7b0b2',
			colorFolderDirectory: '#536466',
			colorFolderSubdirectory: '#d1d6d8',
			colorText: '#090e10',
			colorTextLightest: '#ffffff',
			colorTextDarker: '#293e40',
			toggleLogo: true,
			toggleSceneThumbs: false,
			toggleCombatSidebar: false
		};
	}
}

class simeplMobileForm extends FormApplication {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			title: game.i18n.localize('simple-mobile.modal-title'),
			id: 'simple-mobile-settings',
			template: `modules/${moduleName}/templates/simple-mobile-settings.html`,
			width: 420,
			closeOnSubmit: true
		});
	}

	getData(options) {
		return mergeObject(
			{},
			this.reset ? simpleMobileSettings.defaultSettings :
			mergeObject(
				simpleMobileSettings.defaultSettings,
				game.settings.get(moduleName, 'settings')
			)
		);
	}

	activateListeners(html) {
		super.activateListeners(html);
		this.getThemePreset();
		html.find('select[name="themePreset"]').change(this.getThemePreset.bind(this));
		html.find('button[name="reset"]').click(this.onReset.bind(this));
		this.reset = false;
	}

	getThemePreset(formData) {
		if($('select[name="themePreset"]').val() === 'foundry') {
			for (const [key, value] of Object.entries(THEME.FOUNDRY)) { $(`input[name="${key}"]`).prop('value', value); }
		}

		if($('select[name="themePreset"]').val() === 'dark') {
			for (const [key, value] of Object.entries(THEME.DARK)) { $(`input[name="${key}"]`).prop('value', value); }
		}

		if($('select[name="themePreset"]').val() === 'western') {
			for (const [key, value] of Object.entries(THEME.WESTERN)) { $(`input[name="${key}"]`).prop('value', value); }
		}
	}

	onReset() {
		this.reset = true;
		this.render();
	}

	_updateObject(event, formData) {
		return __awaiter(this, void 0, void 0, function* () {
			let settings = mergeObject(simpleMobileSettings.settings, formData, { insertKeys: false, insertValues: false });
			yield game.settings.set(moduleName, 'settings', settings);
			updateSettings(game.settings.get(moduleName, 'settings'));
		});
	}
}

Hooks.once('init', () => {
	// lets makes make this specificity stupid
	myBody[0].classList.add('simple-mobile');
	myBody[0].classList.add('e-body');
	myBody[0].setAttribute('id', 'simple-mobile');

	game.settings.registerMenu(moduleName, moduleName, {
		name: game.i18n.localize('simple-mobile.settings-name'),
		label: game.i18n.localize('simple-mobile.settings-label'),
		type: simpleMobileForm,
		restricted: true
	});

	game.settings.register(moduleName, 'settings', {
		name: game.i18n.localize('simple-mobile.settings-name'),
		scope: 'world',
		default: simpleMobileSettings.defaultSettings,
		type: Object,
		config: false
	});
});

export class Controls extends Application {
  openDialog() {
      let $dialog = $('.Controls-window');
      if ($dialog.length > 0) {
          $dialog.remove();
          return;
      }
      const templateData = { data: [] };
  templateData.title = "Controls";
  templateData.user = game.userId;
  templateData.charname = game.user.charname;
      const templatePath = "/modules/simplemobile/mobile-controls.html";;
  console.log(templateData);
  this.appId = "mobile-controls";
  Controls.renderMenu(templatePath, templateData);
}
  static renderMenu(path, data) {
      const dialogOptions = {
          width: 300,
          top: event.clientY - 80,
          left: window.innerWidth - 510,
          classes: ['Controls-window'],
    id: 'mobile-controls'
      };
      renderTemplate(path, data).then(dlg => {
          new Dialog({
              content: dlg,
              buttons: {}
          }, dialogOptions).render(true);
      });
  }

}


//Hooks.on("init", () => {CONFIG.debug.hooks = true})
Hooks.once('init', function() {

	game.settings.register('simplemobile', 'lasttoken', {
        name: 'Last Token',
        hint: 'This is the value where the last selected token will be saved',
        scope: 'client',
        config: false,
        default: "0",
		type: String,
    });
	game.settings.register('simplemobile', 'movementdirection', {
        name: 'Movement Swich',
        hint: 'This is the value the movement values is saved',
        scope: 'client',
        config: false,
        default: "",
        type: String,
    });
	game.settings.register('simplemobile', 'cps', {
        name: 'Camera Pan Speed',
        hint: 'How many pixels the camera pans when tapping on the screen',
        scope: 'world',
        config: true,
        default: "25",
        type: String,
    });
	game.settings.register('simplemobile', 'autorotation', {
        name: 'Auto Rotate',
        hint: 'Automatically Rotate tokens based on where they are going',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
 	game.settings.register('simplemobile', 'invertrotation', {
        name: 'Invert Rotation',
        hint: 'Inverts the rotation of the token',
        scope: 'client',
        config: true,
        default: true,
        type: Boolean,
    });
  	game.settings.register('simplemobile', 'performanceop', {
        name: 'Performance Optimization',
        hint: 'Limits the functionality of simple mobile to optimize it for slower devices, also disabled the canvas (where scenes are rendered on)',
        scope: 'client',
        config: true,
        default: false,
        type: Boolean,
    });


});

Hooks.on('preRenderActorSheet5eCharacter', () => {
	const container = document.querySelector('. container')
	container.scrollTop
	container.scrollLeft
});

Hooks.on('canvasInit', () => {
	if(game.settings.get('simplemobile', 'performanceop') & window.screen.width < 1080){

		var node = document.getElementById("board");
		if (node.parentNode) {
		  node.parentNode.removeChild(node);
		}
	console.log("performance optimised");
	let mi = document.querySelector("#mobile-container");


	}
});

Hooks.on('canvasReady', function(){
    function opencontrols() {
        Controls = new Controls();
        Controls.openDialog();
	}
  opencontrols();
  let charname = game.user.charname
  console.log("mobile initialised");
  document.getElementById('board').ontouchstart = function (event) {
  console.log("Touchstart");
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  console.log("Moving Canvas to: "+"X:"+ x + " Y:" + y);
  let options = {
  animationSpeed: 250,      // The total time in milliseconds for the animation to take
  panSpeed: 100             // The panning speed in pixels per second, only used if animationSpeed is not specified
  };
  let tapcameraspeed = parseInt(game.settings.get('simplemobile', 'cps'));
  let view = canvas.scene._viewPosition;
  if (x<= screen.width/3){
  view.x -= tapcameraspeed;
  }
  else if (x>= screen.width - screen.width/3){
  view.x += tapcameraspeed;
  }
  if (y<= screen.height/4){
	view.y -= tapcameraspeed
  }
  else if (y>= screen.height - screen.height/4){
  view.y += tapcameraspeed;
  }
  canvas.animatePan({duration: 25, x: view.x, y: view.y, scale: view.scale});
  console.log("canvas moved");

}
	canvas.tokens.ownedTokens.length
});

Hooks.once('ready', () => {
	updateSettings(game.settings.get(moduleName, 'settings'));

	// Toggle
	game.settings.register(moduleName, 'togglePlayers', {
		name: game.i18n.localize('simple-mobile.toggle-players'),
		scope: 'user',
		config: true,
		default: false,
		type: Boolean,
		onChange: data => {
			data === true ? myHtml[0].classList.add('-simple-mobile-players') : myHtml[0].classList.remove('-simple-mobile-players');
		}
	});
	const togglePlayers = game.settings.get(moduleName, 'togglePlayers');
	togglePlayers ? myHtml[0].classList.add('-simple-mobile-players') : myHtml[0].classList.remove('-simple-mobile-players');

	// Layouts
	game.settings.register(moduleName, 'compactMode', {
		name: game.i18n.localize('simple-mobile.layout-compact'),
		scope: 'user',
		config: true,
		default: false,
		type: Boolean,
		onChange: data => {
			data === true ? myHtml[0].classList.add('-compact') : myHtml[0].classList.remove('-compact');
		}
	});
	const compactMode = game.settings.get(moduleName, 'compactMode');
	compactMode ? myHtml[0].classList.add('-compact') : myHtml[0].classList.remove('-compact');

	game.settings.register(moduleName, 'controlAlignTop', {
		name: game.i18n.localize('simple-mobile.layout-control-align'),
		hint: game.i18n.localize('simple-mobile.layout-control-align-hint'),
		scope: 'user',
		config: true,
		default: false,
		type: Boolean,
		onChange: data => {
			data === true ? myHtml[0].classList.add('-control-align-tops') : myHtml[0].classList.remove('-control-align-tops');
		}
	});
	const controlAlignTop = game.settings.get(moduleName, 'controlAlignTop');
	controlAlignTop ? myHtml[0].classList.add('-control-align-tops') : myHtml[0].classList.remove('-control-align-tops');

	// Check for other modules
	setTimeout(function() {
		document.getElementsByClassName('dice-tray').length >= 1 ? myHtml[0].classList.add('-simple-mobile-dice-tray-active') : myHtml[0].classList.remove('-simple-mobiledice-tray-active');
	}, 1000);

	// Say Hello
	console.log('Simple Mobile UI');
});
