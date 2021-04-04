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
        //@ts-ignore
        templateData.charname = game.user.charname;  
        const templatePath = `/modules/${MODULE_NAME}/templates/mobile-controls.html`;
        console.log(templateData);
        //@ts-ignore
        this.appId = "mobile-controls";
        Controls.renderMenu(templatePath, templateData);
    }
    static renderMenu(path, data) {
        const dialogOptions = {
            width: 300,
            //@ts-ignore
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