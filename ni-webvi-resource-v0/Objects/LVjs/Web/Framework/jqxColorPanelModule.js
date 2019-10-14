export class jqxColorPanelModule {
    static get moduleName() {
        return 'jqxColorPanelModule';
    }
    static get properties() {
        let properties = {
            'messages': Object.assign({}, JQX.ColorPanel.properties.messages)
        };
        properties.messages.value.en.customColor = "Custom Color";
        properties.messages.value.en.ok = "Ok";
        properties.messages.value.en.cancel = "Cancel";
        return properties;
    }
}
window.JQX.Elements.whenRegistered('jqx-color-panel', function (proto) {
    proto.addModule(jqxColorPanelModule);
});
//# sourceMappingURL=jqxColorPanelModule.js.map