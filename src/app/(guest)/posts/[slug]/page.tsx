import {baseApiUrl} from "../../../../../lib/api";
import {notFound} from "next/navigation";

import {createPlateEditor, createPlugins, EDescendant, TElement} from '@udecode/plate-common';
import {serialize} from "@an/lib/utils";
// import {serializeHtml} from '@udecode/plate-serializer-html';
// import {DndProvider} from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';
// import {plugins} from "@an/components/PlateEditor";





const Page = async ({params}: { params: { slug: string } }) => {
  const body = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json()).catch(console.log);
  if (!body.post) {
    notFound();
  }

  const decoded = body.post.content ? JSON.parse(body.post.content): [];

  const data = decoded.map((e: any) => serialize(e)).join('');
  return (
      <div  dangerouslySetInnerHTML={{__html: data}}>

      </div>
  )
}

export default Page;
