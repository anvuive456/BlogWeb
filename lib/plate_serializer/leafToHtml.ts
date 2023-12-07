import {
  pipeInjectProps,
  PlateEditor,
  PlateProps,
  PlateRenderLeafProps,
  pluginRenderLeaf,
  Value,
} from '@udecode/plate-common';
import { decode } from 'html-entities';

import { createElementWithSlate } from './utils/createElementWithSlate';
import { stripClassNames } from './utils/stripClassNames';
import {renderToStaticMarkup} from "./utils/renderToStaticMarkup";

export const leafToHtml = async <V extends Value>(
    editor: PlateEditor<V>,
    {
      props,
      plateProps,
      preserveClassNames,
    }: {
      props: PlateRenderLeafProps<V>;
      plateProps?: Partial<PlateProps>;
      preserveClassNames?: string[];
    }
) => {
  const { children } = props;

  return await editor.plugins.reduce(async (result, plugin):Promise<string> => {
    if (!plugin.isLeaf) return result;

    props = {
      ...pipeInjectProps<V>(editor, props),
      children: result,
    };

    const serialized =
        plugin.serializeHtml?.(props as any) ??
        pluginRenderLeaf(editor, plugin)(props);

    if (serialized === children) return result;

    const text = await renderToStaticMarkup(
        createElementWithSlate({
          ...plateProps,
          children: serialized,
        })
    );
    let html = decode(
        text
    );

    html = stripClassNames(html, {preserveClassNames});

    return html;
  }, children);
};
