export function initDom(document: Document) {
  document.body.style.margin = '0';
  document.body.style.position = 'absolute';
  document.body.style.left = '0';
  document.body.style.top = '0';
  document.body.style.right = '0';
  document.body.style.bottom = '0';

  const applicationRoot = document.createElement('div');
  applicationRoot.style.width = '100%';
  applicationRoot.style.height = '100%';

  document.body.appendChild(applicationRoot);

  const canvasElement = document.createElement('canvas');
  canvasElement.style.width = '100%';
  canvasElement.style.height = '100%';

  const webglAttributes: WebGLContextAttributes = {};
  const gl = canvasElement.getContext('webgl2', webglAttributes);

  if (!gl) {
    throw new Error('Could not create WebGL2 context');
  }

  applicationRoot.appendChild(canvasElement);

  return {
    applicationRoot,
    canvasElement,
    gl,
  };
}
