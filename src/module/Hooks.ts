import { warn } from "../mobile";
import { Controls } from "./Controls";
import { MODULE_NAME } from "./settings";

export let readyHooks = async () => {

  Hooks.on('preRenderActorSheet5eCharacter', () => {
    const container = document.querySelector('. container')
    container.scrollTop
    container.scrollLeft
  });

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
    
  });

  Hooks.on('canvasInit', () => {
    //@ts-ignore
    if(game.settings.get(MODULE_NAME, 'performanceop') & window.screen.width < 1080){
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
      if(document.getElementById('sidebar').className == "app"){
        //@ts-ignore
        ui.sidebar.collapse();
      }
      //Collapse MacroBar on load
      if(document.getElementById('action-bar').className == "flexrow "){
        //@ts-ignore
        ui.hotbar.collapse();
      }
    });

    Hooks.on('canvasReady', function(){
      function opencontrols() {
        //@ts-ignore
        Controls = new Controls();
        //@ts-ignore
        Controls.openDialog();
    }
    opencontrols();
    //@ts-ignore
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
    /*let tapcameraspeed = parseInt(game.settings.get(MODULE_NAME, 'cps'));
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
      let lasttoken = parseInt(game.settings.get(MODULE_NAME, 'lasttoken'));
      if(tokens.length === 1){
      lasttoken = 0;
      }
      else if( tokens.length -1 <= lasttoken){
      lasttoken = 0;
      }
      else{
      lasttoken += 1;
      }
      game.settings.set(MODULE_NAME, 'lasttoken', lasttoken);
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

  // Hooks.on('renderSceneConfig',(object,html)=>{
  //   //console.log(object,html);
  //   html.find('form').wrapInner('<div class="scroll"></div>')
  //   let button = html.find('button[name="submit"]');
  //   html.find('form').append(button);
  //   if(typeof game.modules.get('MythicUI') !='undefined'){
  //     if(game.modules.get('MythicUI').active){
  //       html.find('form').addClass('mythicUI-fix')
  //     }
  //   }
  // });

  // Hooks.on('renderFilePicker',(object,html)=>{
  //   console.log(html)
  //   if(typeof game.modules.get('MythicUI') !='undefined'){
  //     if(game.modules.get('MythicUI').active){
  //       html.addClass('mythicUI-fix')
  //     }
  //   }
  // });

  // Hooks.on('renderModuleManagement', (object,html)=>{
  //   if(typeof game.modules.get('MythicUI') !='undefined'){
  //     if(game.modules.get('MythicUI').active){
  //       html.addClass('mythicUI-fix')
  //     }
  //   }
  //   if(typeof game.modules.get('find-the-culprit') !='undefined'){
  //     if(game.modules.get('find-the-culprit').active){
  //       html.addClass('culprit-fix')
  //     }
  //   }
  //   if(typeof game.modules.get('tidy-ui_game-settings') !='undefined'){
  //     if(game.modules.get('tidy-ui_game-settings').active){
  //       html.addClass('tidyUI-fix')
  //     }
  //   }
  // });

}

export let initHooks = () => {
  warn("Init Hooks processing");
  // lets makes make this specificity stupid
  //@ts-ignore
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
