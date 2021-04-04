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
		templateData.charname = game.user.name;
        const templatePath = `/modules/${MODULE_NAME}/templates/mobile-controls.html`;
		console.log(templateData);
		// this['appId'] = MODULE_NAME;//"mobile-controls";
		Controls.renderMenu(templatePath, templateData);
	}
    static renderMenu(path, data) {
        const dialogOptions = {
            width: 300,
            top: event['clientY'] - 80,
            left: window.innerWidth - 510,
            classes: ['Controls-window'],
			id: MODULE_NAME//'mobile-controls'
        };
        renderTemplate(path, data).then(dlg => {
            new Dialog({
                content: dlg,
                buttons: {}
            }, dialogOptions).render(true);
        });
    }

}