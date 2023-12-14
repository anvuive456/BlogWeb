import {baseApiUrl, baseUrl} from "../../../../../lib/api";
import {notFound} from "next/navigation";

import {Metadata, ResolvingMetadata} from "next";
import {serialize} from "@an/lib/utils";
import AppDate from "@an/components/AppDate";

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({params, searchParams}: Props,
                                       parent: ResolvingMetadata): Promise<Metadata> {
  const body = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json()).catch(console.log);
  const {post} = body;
  return {
    title: post?.title,
    metadataBase: new URL(baseUrl + '/' + post?.url ??''),
    openGraph: {
      title: post?.title,
      type: 'article',
      description: post?.description,
      siteName: baseUrl,
      url: post?.url,
      images:[baseUrl + `/api/photo/${params.slug}`]
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
  const {content, title, image,createdAt} = body.post;
  console.log(content);

  const data = content.map((e: any) => serialize(e)).join('');
  return (
      <div className='mx-3'>
        <h2 className='text-3xl font-bold mb-3 '>
          {title}
        </h2>
        <div className='flex items-end mb-3 ab'>
          <AppDate dateString={createdAt.toString()} className='font-light text-sm text-end w-full'/>
        </div>
        <hr className='mx-3 my-2'/>
        <div dangerouslySetInnerHTML={{__html: data}}>
        </div>
      </div>

  )
}

export default Page;
