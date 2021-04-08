import { MODULE_NAME } from "./settings";

export class Controls extends Application {
    openDialog() {
        let $dialog = $('.Controls-window');
        if ($dialog.length > 0) {
            $dialog.remove();
            return;
        }
        const templateData:any = { data: [] };
        templateData.title = "Controls";
        templateData.user = game.userId;
        templateData.charname = game.user.charname;
        const templatePath = `/modules/${MODULE_NAME}/templates/base/mobile-controls.html`;
        console.log(templateData);
        //this.appId = "mobile-controls";
        Controls.renderMenu(templatePath, templateData);
    }
    static renderMenu(path, data) {
        const dialogOptions = {
            width: 300,
            top: window.innerHeight -80, //event.clientY - 80,
            left: window.innerWidth - 510,
            classes: ['Controls-window'],
            id: 'mobile-controls'
        };
        renderTemplate(path, data).then(dlg => {
            new Dialog({
                title: "Mobile Controls Dialog",
                content: dlg,
                buttons: {},
                default: null,
            }, dialogOptions).render(true);
        });
    }

}
