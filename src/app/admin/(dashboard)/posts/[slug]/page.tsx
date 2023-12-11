'use client'

import {Suspense, useEffect, useState} from "react";
import {Category, Post} from "@prisma/client";
import {Value} from "@udecode/plate-common";
import {baseApiUrl} from "../../../../../../lib/api";
import {notFound, redirect, useRouter} from "next/navigation";
import {PlateEditor} from "@an/components/PlateEditor";
import {PostFullOptions} from "@an/types/types";
import {toast} from "react-toastify";
import Image from "next/image";
import {useFilePicker} from "use-file-picker";
import {FileSizeValidator, FileTypeValidator} from "use-file-picker/validators";
import Resizer from "react-image-file-resizer";

const Page = ({params}: { params: { slug: string } }) => {
  const router = useRouter();
  if (!params.slug) notFound();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [data, setData] = useState<Value | undefined>(undefined);
  const [selectedCate, setSelectedCate] = useState<number>(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/images/800x400.svg')
  const {openFilePicker} = useFilePicker({
    accept: 'image/*',
    readAs: 'BinaryString',
    multiple: false,
    validators: [
      new FileSizeValidator({maxFileSize: 1024 * 1024 * 3}),
      new FileTypeValidator(['jpg', 'png', 'jpeg', 'svg']),
    ],
    onFilesSelected: console.log,
    onFilesRejected: ({errors}) => {
      toast.error(`${errors.reduce((pre, curr) => {
        return pre + (pre && ',') + curr.name;
      }, '')}`)
    },
    onFilesSuccessfullySelected: async (data) => {
      const [file] = data.plainFiles;
      Resizer.imageFileResizer(file, 800, 400, 'PNG', 100, 0, async (value) => {
        setImage(value as string);
      }, 'base64', 800, 400)
    }
  });
  // const [content, setContent] = useState<Value>();
  const getCategories = async () => {
    const result = await fetch(baseApiUrl + '/admin/categories?all=true').then(res => res.json());
    setCategories(result);
  }
  const getPost = async () => {
    const result = await fetch(baseApiUrl + `/posts/${params.slug}`).then(res => res.json());
    console.log('content', result.post.content);
    if (!result.post) notFound();
    const {categoryId, description, title, content, image} = result.post as PostFullOptions;
    setSelectedCate(categoryId ?? -1);
    setTitle(title);
    setDescription(description);
    console.log(content);
    setData(content as Value || undefined);
    setImage(image);
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

  const submit = async (form: FormData) => {
    if (!validate()) {
      toast.error('Dữ liệu lỗi hoặc rỗng');
    }
    form.set('content', JSON.stringify(data));
    if (image) {
      form.set('imageString', image);
    }

    const result = await fetch(baseApiUrl + `/posts/${params.slug}`, {
      method: 'PUT',
      body: form,
    }).then(res => res.json()).catch(console.log);
    if (result.message) {
      toast.error(result.message);
      return;
    }
    toast.success('Update bài viết thành công');
    router.replace('/admin/posts');
  }

  return (
      <>
        <div className='p-4 bg-blue-50 h-screen overflow-y-scroll'>
          <form action={submit}>
            <button type='submit' className='text-white border rounded bg-blue-600 p-2 mb-2'>
              Sửa bài
            </button>
            <div className='flex flex-wrap gap-5 mb-2'>
              <Image className='h-[400px] w-[800px]' src={image} alt='Ảnh bìa' width={800} height={400}/>
              <div className='border bg-white rounded-md flex items-center'>
                <p className='p-4 '><span className='no-underline hover:underline text-blue-500 cursor-pointer'
                                          onClick={openFilePicker}>Chọn ảnh bìa.</span> <br/> Lưu ý chỉ nhận <span
                    className='underline italic'>JPG, JPEG, PNG, SVG</span> và không vượt quá <span
                    className='underline italic'>3MB</span></p>

              </div>
            </div>
            <input defaultValue={title} name='title' className='border rounded p-2 mb-2 w-full'
                   placeholder='Nhập tiêu đề '/>
            <input defaultValue={description} name='description' className='border rounded p-2 mb-2 w-full'
                   placeholder='Thêm mô tả'/>

            <div className='flex flex-wrap mb-2 gap-2'>
              <select defaultValue={selectedCate} className='border rounded p-2  w-1/4'
                      name='categoryId'>
                {
                    categories && categories.map(cate => <>
                      <option key={cate.id} value={cate.id}>{cate.name}</option>
                    </>)
                }
              </select>

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
