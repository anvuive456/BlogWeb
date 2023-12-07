import {Writable} from "stream";
import {renderToPipeableStream} from "react-dom/server";

export  async function renderToStaticMarkup(element: any): Promise<string> {
  const ReactDOMServer = (await import('react-dom/server')).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(element);

  return staticMarkup;
}
