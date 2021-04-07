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
})
Hooks.on('renderPlayerList', () => {
	if(screen.availWidth < 1000){
		game.user.setFlag("world", "simpleMobile", true);
		console.log("Mobile Mode");
	}
	else{
		game.user.setFlag("world", "simpleMobile", false);
		console.log("Desktop Mode");
	}
	for(let i = 0; i < game.users.entries.length; i++){
		if(game.users.entries[i].data.flags.world != undefined){
			if(game.users.entries[i].data.flags.world.simpleMobile){
				for(let p = 0; p < document.getElementsByClassName('player-name').length; p++){
					if(document.getElementsByClassName('player-name')[p].innerHTML.includes(game.users.entries[i].name)){
						document.getElementsByClassName('player-name')[p].innerHTML += '<i class="fas fa-mobile-alt"></i>';
					}
				}
			}
		}
	}
	
})
Hooks.on('canvasInit', () => {
	if(game.settings.get('simplemobile', 'performanceop') & window.screen.width < 1080){
		var node = document.getElementById("board");
		if (node.parentNode) {
		  node.parentNode.removeChild(node);
		}
	console.log("performance optimised");
	let mi = document.querySelector("#mobile-container");
	}
	if(screen.availWidth < 1000){
		game.user.setFlag("world", "simpleMobile", true);
		console.log("Mobile Mode");
	}
	else{
		game.user.setFlag("world", "simpleMobile", false);
		console.log("Desktop Mode");
	}
});

Hooks.on('renderSidebarTab', function(){
	//Collapse Sidebar on load
	if(screen.availWidth < 1000){
		if(document.getElementById('sidebar').className == "app"){
			ui.sidebar.collapse();
		}
		//Collapse MacroBar on load
		if(document.getElementById('action-bar').className == "flexrow "){
			ui.hotbar.collapse();
		}
	}
})
	Hooks.on('canvasReady', function(){
    function opencontrols() {
        Controls = new Controls();
        Controls.openDialog();
	}
  opencontrols();
  let charname = game.user.charname
  console.log("mobile initialised");
  
  var src = document.getElementById("board");
  var clientX, clientY;
  
  src.addEventListener('touchstart', function(e) {
	  console.log("TouchStart");
	  clientX = e.touches[0].clientX;
	  clientY = e.touches[0].clientY;
	  //console.log("TouchStart at: "+"X:"+ clientX + " Y:" + clientY);
  }, false);
  
  src.addEventListener('touchmove', function(e) {
	  var deltaX, deltaY;
	  deltaX = e.changedTouches[0].clientX - clientX;
	  deltaY = e.changedTouches[0].clientY - clientY;
	  console.log("TouchEnd at: "+"X:"+ deltaX + " Y:" + deltaY);
	  canvas.animatePan({duration: 50, x: canvas.scene._viewPosition.x - deltaX, y: canvas.scene._viewPosition.y - deltaY})
	  //console.log("X:"+ canvas.scene._viewPosition.x + " Y:" + canvas.scene._viewPosition.y);
  }, false);
  /*let tapcameraspeed = parseInt(game.settings.get('simplemobile', 'cps'));
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
  }*/
	canvas.tokens.ownedTokens.length
	
	//SELECT CHARACTER
	if(canvas.tokens.ownedTokens.length > 0)
	{
		canvas.tokens.ownedTokens.map(token => token.control({releaseOthers: false}));
		let tokens = canvas.tokens.controlled;
		let lasttoken = parseInt(game.settings.get('simplemobile', 'lasttoken'));
		if(tokens.length === 1){
		lasttoken = 0;
		}
		else if( tokens.length -1 <= lasttoken){
		lasttoken = 0;
		}
		else{
		lasttoken += 1;
		}
		game.settings.set('simplemobile', 'lasttoken', lasttoken);
		//console.log(lasttoken);
		let x = tokens[lasttoken].x;
		let y = tokens[lasttoken].y;
		document.getElementById("sidebar");
		let twidth = tokens[lasttoken].w / 2;
		let theight = tokens[lasttoken].h / 2;
		let view = canvas.scene._viewPosition;
		canvas.animatePan({duration: 250, x: x+twidth, y: y+theight, scale: view.scale});
	}
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
