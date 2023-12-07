'use client'
import {PlateEditor} from "@an/components/PlateEditor";
import {Suspense, useEffect, useRef, useState} from "react";
import {Value} from "@udecode/plate-common";
import {api, baseApiUrl} from "../../../../../../lib/api";
import {Category} from "@prisma/client";
import {redirect} from "next/navigation";

export default function IndexPage() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [content, setContent] = useState<Value>();
  const getCategories = async () => {
    const result = await fetch(baseApiUrl + '/categories').then(res => res.json());
    setCategories(result);
  }
  useEffect(() => {
    getCategories();
  }, []);

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
    form.set('content', JSON.stringify(content));
    const file = form.get('image') as File | null;
    if (file) {
      form.set('imageString', await toBase64(file));
    }
    const result = await fetch(baseApiUrl + '/posts', {
      method: 'POST',
      body: form,
    }).then(res => res.json()).catch(console.log);
    if(!result.message) redirect('/admin/posts');
  }

  return (
      <>
        <div className='p-4 bg-blue-50 h-screen'>
          <form action={submit}>
            <input name='title' className='border rounded p-2 mb-2 w-full' placeholder='Nhập tiêu đề ' required={true}/>
            <input name='description' className='border rounded p-2 mb-2 w-full' placeholder='Thêm mô tả'/>
            <div className='flex flex-wrap mb-2 gap-2'>
              <select  placeholder='Chọn danh mục' className='border rounded p-2  w-1/4' name='categoryId'>
                {
                    categories && categories.map(cate => <>
                      <option value={cate.id}>{cate.name}</option>
                    </>)
                }
              </select>
              <input name='image' type='file' className='border rounded p-2  w-1/4'/>

              <button type='submit' className='text-white border rounded bg-blue-600 p-2 '>
                Đăng bài
              </button>
            </div>

            <Suspense fallback={<>Loading...</>}>
              <PlateEditor editorName='content' onChange={setContent}/>
            </Suspense>

          </form>

        </div>

      </>
  );
}
