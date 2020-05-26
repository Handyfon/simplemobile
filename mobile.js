
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

  let view = canvas.scene._viewPosition;
  if (x<= screen.width/2){
  view.x -=20;
  }
  else{
  view.x += 20;
  }
  if (y<= screen.height/2){
	view.y -=20  
  }
  else{
  view.y += 20;
  }
  canvas.animatePan({duration: 50, x: view.x, y: view.y, scale: view.scale});
  console.log("canvas moved");

}
	canvas.tokens.ownedTokens.length
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
