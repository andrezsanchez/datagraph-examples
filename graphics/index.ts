import { Graph, RootNode } from './RootNode';
import { UpdateScreenSettingsAction } from './Actions';
import { ScreenSettings } from './ScreenSettingsNode';
import { initDom } from './initDom';
import { createGraph, createND } from '@datagraph/dgf';
import { initGraphics } from './initGraphics';
import { createKeydownEventHandler } from './createKeydownEventHandler';

function updateScreenSettings(
  domElements: ReturnType<typeof initDom>,
  graph: Graph,
) {
  const rect = domElements.applicationRoot.getBoundingClientRect();
  const dpr = window.devicePixelRatio;

  const context = graph.select((root) => root.screenSettings);
  context.queueDispatch(UpdateScreenSettingsAction.create({
    sizeCssPixels: [rect.width, rect.height],
    devicePixelRatio: dpr,
  }));
}

function init(win: Window) {
  const domElements = initDom(win.document);
  const graph = createGraph(() => createND(RootNode, {}));

  function screenSettingsDidUpdate(screenSettings: ScreenSettings) {
    domElements.canvasElement.width = screenSettings.sizeCssPixels[0] * screenSettings.devicePixelRatio;
    domElements.canvasElement.height = screenSettings.sizeCssPixels[1] * screenSettings.devicePixelRatio;
  }

  win.addEventListener('resize', () => {
    updateScreenSettings(domElements, graph);
  });
  win.addEventListener('keydown', createKeydownEventHandler(graph));

  initGraphics(domElements.gl, graph, screenSettingsDidUpdate);

  updateScreenSettings(domElements, graph);
}

init(window);
