import { warn } from "../simple-mobile";
import { Controls } from "./Controls";
import { MODULE_NAME } from "./settings";

export let readyHooks = async () => {

  Hooks.on('preRenderActorSheet5eCharacter', () => {
    const container = document.querySelector('. container')
    container.scrollTop
    container.scrollLeft
  });

  Hooks.on('canvasInit', () => {
    if(game.settings.get(MODULE_NAME, 'performanceop') && window.screen.width< 1080){

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
          let controls = new Controls();
          controls.openDialog();
    }
    opencontrols();
    let charname = game.user.name;
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
      let tapcameraspeed = parseInt(game.settings.get(MODULE_NAME, 'cps'));
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

  Hooks.on('renderSceneConfig',(object,html)=>{
    //console.log(object,html);
    html.find('form').wrapInner('<div class="scroll"></div>')
    let button = html.find('button[name="submit"]');
    html.find('form').append(button);
    if(typeof game.modules.get('MythicUI') !='undefined'){
      if(game.modules.get('MythicUI').active){
        html.find('form').addClass('mythicUI-fix')
      }
    }
  });

  Hooks.on('renderFilePicker',(object,html)=>{
    console.log(html)
    if(typeof game.modules.get('MythicUI') !='undefined'){
      if(game.modules.get('MythicUI').active){
        html.addClass('mythicUI-fix')
      }
    }
  });

  Hooks.on('renderModuleManagement', (object,html)=>{
    if(typeof game.modules.get('MythicUI') !='undefined'){
      if(game.modules.get('MythicUI').active){
        html.addClass('mythicUI-fix')
      }
    }
    if(typeof game.modules.get('find-the-culprit') !='undefined'){
      if(game.modules.get('find-the-culprit').active){
        html.addClass('culprit-fix')
      }
    }
    if(typeof game.modules.get('tidy-ui_game-settings') !='undefined'){
      if(game.modules.get('tidy-ui_game-settings').active){
        html.addClass('tidyUI-fix')
      }
    }
  });

}

export let initHooks = () => {
  warn("Init Hooks processing");
  // lets makes make this specificity stupid

  Game.prototype._displayUsabilityErrors = function() {
    // Unsupported Chromium version
    const MIN_CHROMIUM_VERSION = 80;
    const chromium = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if ( chromium && (parseInt(chromium[2]) < MIN_CHROMIUM_VERSION) ) {
      ui.notifications.error(game.i18n.format("ERROR.ChromiumVersion", {
        version: chromium[2],
        minimum: MIN_CHROMIUM_VERSION
      }), {permanent: true});
    }
  }

}
