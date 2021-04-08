import { MODULE_NAME } from './settings';

export const preloadTemplates = async function () {
	const templatePaths = [
		// Add paths to "module/XXX/templates"
		`/modules/${MODULE_NAME}/templates/base/mobile-controls.html`,
    `/modules/${MODULE_NAME}/templates/system-compatibility/base/window-selector.html`,
    `/modules/${MODULE_NAME}/templates/system-compatibility/base/navigation.html`,
    `/modules/${MODULE_NAME}/templates/system-compatibility/base/menu.html`,
	];

	return loadTemplates(templatePaths);
}
