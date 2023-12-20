'use client';
import { createPlateEditor } from '@udecode/plate-common';
import { plugins } from '@an/components/PlateEditor';
import { serializeHtml } from '../../lib/plate_serializer';

type Props = {
  node: any;
};
const SerializePlate = ({ node }: Props) => {
  const editor = createPlateEditor({ plugins });
  const serialed = serializeHtml(editor, {
    nodes: node,
  });

  return <div dangerouslySetInnerHTML={{ __html: serialed }}></div>;
};

export default SerializePlate;
