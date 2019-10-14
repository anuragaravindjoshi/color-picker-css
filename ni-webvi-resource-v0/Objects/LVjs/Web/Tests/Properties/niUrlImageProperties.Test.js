//****************************************
// G Property Tests for UrlImageModel class
// National Instruments Copyright 2018
//****************************************
import { UrlImageModel } from '../../Modeling/niUrlImageModel.js';
import { VisualModel } from '../../Modeling/niVisualModel.js';
describe('A UrlImage control', function () {
    'use strict';
    let controlId;
    let viModel, frontPanelControls, controlModel, viewModel, controlElement, urlImageViewSettings, urlImageViewUpdateSettings;
    const testHelpers = window.testHelpers;
    const webAppHelper = testHelpers.createWebAppTestHelper();
    const domVerifier = testHelpers.createDomVerifier(this.description);
    beforeAll(function (done) {
        domVerifier.captureDomState();
        testHelpers.fetchJsonFixtureForElements().then((fixture) => {
            controlId = fixture.urlImageViewSettings.niControlId;
            urlImageViewSettings = fixture.urlImageViewSettings;
            urlImageViewUpdateSettings = fixture.urlImageViewUpdateSettings;
            Object.freeze(urlImageViewSettings);
            Object.freeze(urlImageViewUpdateSettings);
            webAppHelper.installWebAppFixture(done);
        });
    });
    beforeAll(function () {
        viModel = webAppHelper.getVIModelForFixture();
    });
    beforeEach(function (done) {
        webAppHelper.createNIElement(urlImageViewSettings);
        testHelpers.runAsync(done, function () {
            frontPanelControls = viModel.getAllControlModels();
            controlModel = frontPanelControls[controlId];
            viewModel = viModel.getControlViewModel(controlId);
            controlElement = viewModel.element;
        });
    });
    afterEach(function () {
        webAppHelper.removeNIElement(controlId);
    });
    afterAll(function (done) {
        webAppHelper.removeWebAppFixture(done);
    });
    afterAll(function () {
        domVerifier.verifyDomState();
    });
    it('property read for Value returns the current value.', function () {
        const url = viewModel.getGPropertyValue(VisualModel.VALUE_G_PROPERTY_NAME);
        expect(url).toEqual(urlImageViewSettings.source);
    });
    it('property set for Value updates model.', function (done) {
        const newUrl = '../Utilities/other.png';
        testHelpers.runAsync(done, function () {
            viewModel.setGPropertyValue(VisualModel.VALUE_G_PROPERTY_NAME, newUrl);
            expect(controlModel.source).toEqual(newUrl);
        });
    });
    it('property set for Value updates control element.', function (done) {
        const newUrl = '../Utilities/other.png';
        testHelpers.runMultipleAsync(done, function () {
            viewModel.setGPropertyValue(VisualModel.VALUE_G_PROPERTY_NAME, newUrl);
            expect(controlModel.source).toEqual(newUrl);
        }, function () {
            expect(controlElement.source).toEqual(newUrl);
        });
    });
    it('property read for Position returns the current position.', function () {
        const position = viewModel.getGPropertyValue(VisualModel.POSITION_G_PROPERTY_NAME);
        const expectedPosition = {
            "Left": parseInt(urlImageViewSettings.left),
            "Top": parseInt(urlImageViewSettings.top)
        };
        expect(position).toEqual(expectedPosition);
    });
    it('property set for Position updates model.', function (done) {
        const newPosition = { Left: 100, Top: 200 };
        testHelpers.runAsync(done, function () {
            viewModel.setGPropertyValue(VisualModel.POSITION_G_PROPERTY_NAME, newPosition);
            expect(parseInt(controlModel.left)).toEqual(newPosition.Left);
            expect(parseInt(controlModel.top)).toEqual(newPosition.Top);
        });
    });
    it('property set for Position updates control element.', function (done) {
        const newPosition = { Left: 150, Top: 250 };
        testHelpers.runMultipleAsync(done, function () {
            viewModel.setGPropertyValue(VisualModel.POSITION_G_PROPERTY_NAME, newPosition);
        }, function () {
            const computedStyle = window.getComputedStyle(controlElement);
            expect(parseInt(computedStyle.left)).toEqual(newPosition.Left);
            expect(parseInt(computedStyle.top)).toEqual(newPosition.Top);
        });
    });
    it('property get for HyperlinkUrl returns the current href value', function (done) {
        webAppHelper.dispatchMessage(controlId, urlImageViewUpdateSettings);
        testHelpers.runAsync(done, function () {
            const currentHyperlinkUrlValue = viewModel.getGPropertyValue(UrlImageModel.HYPERLINK_URL_G_PROPERTY_NAME);
            expect(currentHyperlinkUrlValue).toEqual(urlImageViewUpdateSettings.href);
        });
    });
    it('property set for HyperlinkUrl updates the model.', function () {
        const newHyperlinkUrl = "http://ni.com";
        viewModel.setGPropertyValue(UrlImageModel.HYPERLINK_URL_G_PROPERTY_NAME, newHyperlinkUrl);
        expect(controlModel.href).toEqual(newHyperlinkUrl);
    });
    it('property set for HyperlinkUrl updates the element.', function (done) {
        const newHyperlinkUrl = "http://ni.com";
        testHelpers.runMultipleAsync(done, function () {
            viewModel.setGPropertyValue(UrlImageModel.HYPERLINK_URL_G_PROPERTY_NAME, newHyperlinkUrl);
        }, function () {
            expect(controlElement.href).toEqual(newHyperlinkUrl);
        });
    });
});
//# sourceMappingURL=niUrlImageProperties.Test.js.map