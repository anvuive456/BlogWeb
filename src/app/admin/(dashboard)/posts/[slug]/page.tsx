'use client'

import {Suspense, useEffect, useState} from "react";
import {Category} from "@prisma/client";
import {Value} from "@udecode/plate-common";
import {baseApiUrl} from "../../../../../../lib/api";
import {redirect} from "next/navigation";
import {PlateEditor} from "@an/components/PlateEditor";

const Page = ({params}: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [data, setData] = useState<Value | undefined>(undefined);
  const [selectedCate, setSelectedCate] = useState<number>(-1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Value>();
  const getCategories = async () => {
    const result = await fetch(baseApiUrl + '/categories').then(res => res.json());
    setCategories(result);
  }
  const getPost = async () => {
    const result = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json());
    console.log('content', result.post.content);
    const cate = result.post.category.id;
    setSelectedCate(cate);
    setTitle(result.post.title);
    const decoded = JSON.parse(result.post.content);
    setData(decoded);
    setLoading(false);
  }
  useEffect(() => {

    getCategories();
    getPost();
    console.log(data);
  }, []);
  const submit = async (form: FormData) => {
    form.set('content', JSON.stringify(content));
    const result = await fetch(baseApiUrl + '/posts', {
      method: 'PUT',
      body: form,
    }).then(res => res.json()).catch(console.log);
    if (!result.message) redirect('/admin/posts');
  }

  return (
      <>
        <div className='p-4 bg-blue-50 h-screen'>
          <form action={submit}>
            <input defaultValue={title} name='title' className='border rounded p-2 mb-2 w-full' placeholder='Nhập tiêu đề '/>
            <div className='flex flex-wrap mb-2 gap-2'>
              <select defaultValue={selectedCate} placeholder='Chọn danh mục' className='border rounded p-2  w-1/4'
                      name='categoryId'>
                {
                    categories && categories.map(cate => <>
                      <option key={cate.id} value={cate.id}>{cate.name}</option>
                    </>)
                }
              </select>
              <button type='submit' className='text-white border rounded bg-blue-600 p-2 '>
                Đăng bài
              </button>
            </div>
            {!loading &&
              <PlateEditor initialValue={data} editorName='content' onChange={setContent}/>
            }
          </form>
        </div>
      </>
  );
}

export default Page;
