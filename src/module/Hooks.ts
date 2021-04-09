import { log, warn } from "../mobile";
import { Controls } from "./simplemobile/Controls";
import { MobileImprovementsCore } from "./mobile-improvements/core";
import { MobileMenu } from "./mobile-improvements/menu";
import { MobileNavigation } from "./mobile-improvements/mobileNavigation";
import { WindowSelector } from "./mobile-improvements/windowSelector";
import { getCanvas, MODULE_NAME } from "./settings";
import * as mgr from "./mobile-improvements/windowManager";

export let controls;

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
    if(game.settings.get(MODULE_NAME, 'performanceop') && window.screen.width < 1080){
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
    });

    Hooks.on('canvasReady', function(){
      function opencontrols() {
        controls = new Controls();
        controls.openDialog();
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
      getCanvas().animatePan({duration: 50, x: getCanvas().scene._viewPosition.x - deltaX, y: getCanvas().scene._viewPosition.y - deltaY})
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
    getCanvas().tokens.ownedTokens.length

    //SELECT CHARACTER
    if(getCanvas().tokens.ownedTokens.length > 0)
    {
      getCanvas().tokens.ownedTokens.map(token => token.control({releaseOthers: false}));
      let tokens = getCanvas().tokens.controlled;
      let lasttoken = parseInt(<string>game.settings.get(MODULE_NAME, 'lasttoken'));
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
      let view = getCanvas().scene._viewPosition;
      getCanvas().animatePan({duration: 250, x: x+twidth, y: y+theight, scale: view.scale});
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

  // =====================================
  // MOBILE IMPROVEMENTS
  // =====================================

  MobileImprovementsCore.navigation.render(true);

  MobileImprovementsCore.windowSelector.render(true);
  MobileImprovementsCore.navigation.render(true);
  MobileImprovementsCore.menu.render(true);

  //$(document.body).addClass("mobile-improvements"); // REPLACE CLASS WITH simplemobile moved to settings file

  Hooks.once("renderPlayerList", (a, b: JQuery<HTMLElement>, c) => {
    b.addClass("collapsed");
    a._collapsed = true;
  });

  Hooks.on("renderPlayerList", (a, b: JQuery<HTMLElement>, c) => {
    b.find(".fa-users").click(evt => {
      evt.preventDefault();
      evt.stopPropagation();
      a._collapsed = !a._collapsed;
      b.toggleClass("collapsed");
    });
  });

  const notificationQueueProxy = {
    get: function (target, key) {
      if (key === "__isProxy") return true;

      if (key === "push") {
        return (...arg) => {
          if (Hooks.call("queuedNotification", ...arg)) {
            target.push(...arg);
          }
        };
      }
      return target[key];
    },
  };

  Hooks.once("renderNotifications", app => {
    if (!app.queue.__isProxy) {
      app.queue = new Proxy(app.queue, notificationQueueProxy);
    }
  });

  Hooks.on("queuedNotification", notif => {
    if (typeof notif.message === "string") {
      const regex = /\s.+px/g;
      const message = notif.message?.replace(regex, "");
      //@ts-ignore
      const match = game.i18n.translations.ERROR.LowResolution.replace(regex, "");

      if (message == match) {
        console.log("notification suppressed", notif);
        return false;
      }
    }
  });

}

export let initHooks = () => {
  warn("Init Hooks processing");
  // lets makes make this specificity stupid
  Game.prototype.displayUsabilityErrors = function() {
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

  // =====================================
  // MOBILE IMPROVEMENTS
  // =====================================

  log("Mobile Improvements | Initializing Mobile Improvements");
  mgr.activate();
  if (MobileImprovementsCore.windowSelector === undefined) {
    MobileImprovementsCore.windowSelector = new WindowSelector();
  }

  if (MobileImprovementsCore.navigation === undefined) {
    MobileImprovementsCore.navigation = new MobileNavigation();
  }
  if (MobileImprovementsCore.menu === undefined) {
    MobileImprovementsCore.menu = new MobileMenu();
  }
}
