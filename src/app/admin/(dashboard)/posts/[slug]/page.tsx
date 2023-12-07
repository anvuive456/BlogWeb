'use client'

import {Suspense, useEffect, useState} from "react";
import {Category, Post} from "@prisma/client";
import {Value} from "@udecode/plate-common";
import {baseApiUrl} from "../../../../../../lib/api";
import {notFound, redirect} from "next/navigation";
import {PlateEditor} from "@an/components/PlateEditor";
import {PostFullOptions} from "@an/types/types";

const Page = ({params}: { params: { slug: string } }) => {
  if (!params.slug) notFound();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [data, setData] = useState<Value | undefined>(undefined);
  const [selectedCate, setSelectedCate] = useState<number>(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [content, setContent] = useState<Value>();
  const getCategories = async () => {
    const result = await fetch(baseApiUrl + '/categories').then(res => res.json());
    setCategories(result);
  }
  const getPost = async () => {
    const result = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json());
    console.log('content', result.post.content);
    if (!result.post) notFound();
    const {categoryId, description, title, content} = result.post as PostFullOptions;
    setSelectedCate(categoryId ?? -1);
    setTitle(title);
    setDescription(description);
    console.log(content);
    setData(content as Value || undefined);
    setLoading(false);
  }
  useEffect(() => {

    getCategories();
    getPost();
    console.log(data);
  }, []);
  const validate = (): boolean => {
    if (!data) return false;
    return true;
  }
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const submit = async (form: FormData) => {
    if (!validate()) {
      alert('Dữ liệu lỗi hoặc rỗng');
    }
    form.set('content', JSON.stringify(data));
    const file = form.get('image') as File | null;
    if (file) {
      form.set('imageString', await toBase64(file));
    }
    const result = await fetch(baseApiUrl + `/posts/${params.slug}`, {
      method: 'PUT',
      body: form,
    }).then(res => res.json()).catch(console.log);
    if (!result.message) redirect('/admin/posts');
  }

  return (
      <>
        <div className='p-4 bg-blue-50 h-screen'>
          <form action={submit}>
            <input defaultValue={title} name='title' className='border rounded p-2 mb-2 w-full'
                   placeholder='Nhập tiêu đề '/>
            <input defaultValue={description} name='description' className='border rounded p-2 mb-2 w-full'
                   placeholder='Thêm mô tả'/>

            <div className='flex flex-wrap mb-2 gap-2'>
              <select defaultValue={selectedCate} placeholder='Chọn danh mục' className='border rounded p-2  w-1/4'
                      name='categoryId'>
                {
                    categories && categories.map(cate => <>
                      <option key={cate.id} value={cate.id}>{cate.name}</option>
                    </>)
                }
              </select>
              <input id='image' name='image' type='file'
                     className='file:border-0 file:rounded file:text-white file:bg-blue-300 border rounded p-2  w-1/4 bg-white'/>
              <button type='submit' className='text-white border rounded bg-blue-600 p-2 '>
                Đăng bài
              </button>
            </div>
            {!loading &&
              <PlateEditor initialValue={data} editorName='content' onChange={setData}/>
            }
          </form>
        </div>
      </>
  );
}

export default Page;
