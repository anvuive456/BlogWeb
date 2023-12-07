import {baseApiUrl, baseUrl} from "../../../../../lib/api";
import {notFound} from "next/navigation";

import {createPlateEditor, createPlugins, EDescendant, TElement} from '@udecode/plate-common';
import {Metadata, ResolvingMetadata} from "next";
import {serialize} from "@an/lib/utils";
// import {serializeHtml} from '@udecode/plate-serializer-html';
// import {DndProvider} from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';
// import {plugins} from "@an/components/PlateEditor";

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params, searchParams}: Props,
                                       parent: ResolvingMetadata): Promise<Metadata> {
  const body = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json()).catch(console.log);
  const {post} = body;
  return {
    title: post.title,
    metadataBase: new URL(baseUrl + '/' + post.url),
    openGraph: {
      title: post.title,
      type: 'article',
      description: post.description,
      siteName: baseUrl,
      url: post.url,
    }
  }
}


const Page = async ({params}: Props) => {
  const body = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json()).catch(reason => {
    console.log(reason);
    return {};
  });

  if (!body.post) {
    notFound();
  }
  const {content} = body.post;
  console.log(content);

  const data = content.map((e: any) => serialize(e)).join('');
  return (
      <div dangerouslySetInnerHTML={{__html: data}}>

      </div>
  )
}

export default Page;
