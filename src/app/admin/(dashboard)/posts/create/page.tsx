'use client'
import {PlateEditor} from "@an/components/PlateEditor";
import {Suspense, useEffect, useRef, useState} from "react";
import {Value} from "@udecode/plate-common";
import {api, baseApiUrl} from "../../../../../../lib/api";
import {Category} from "@prisma/client";
import {redirect, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Image from "next/image";
import {useFilePicker} from "use-file-picker";
import {FileSizeValidator, FileTypeValidator} from "use-file-picker/validators";
import Resizer from "react-image-file-resizer";

export default function IndexPage() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [content, setContent] = useState<Value>();
  const [image, setImage] = useState('/images/800x400.svg')
  const {openFilePicker} = useFilePicker({
    accept: 'image/*',
    readAs: 'BinaryString',
    multiple: false,
    validators: [
      new FileSizeValidator({maxFileSize: 1024 * 1024 * 1}),
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
      },'base64')
    }
  });
  const router = useRouter();
  const getCategories = async () => {
    const result = await fetch(baseApiUrl + '/admin/categories?all=true').then(res => res.json());
    setCategories(result);
  }
  useEffect(() => {
    getCategories();
  }, []);


  const submit = async (form: FormData) => {
    form.set('content', JSON.stringify(content));
    if (image) {
      form.set('imageString', image);
    }
    const result = await fetch(baseApiUrl + '/posts', {
      method: 'POST',
      body: form,
    }).then(res => res.json()).catch(console.log);
    if (result.message) {
      toast.error(result.message);
      return;
    }
    toast.success('Tạo bài viết thành công');
    router.replace('/admin/posts');
  }

  return (
      <>
        <div className='p-4 bg-blue-50 h-screen overflow-y-scroll'>
          <form action={submit}>
            <button type='submit' className='text-white border rounded bg-blue-600 p-2 mb-2'>
              Đăng bài
            </button>
            <div className='flex flex-wrap gap-5 mb-2'>
              <Image  className='h-[400px] w-[800px]' src={image} alt='Ảnh bìa' width={800} height={400}/>
              <div className='border bg-white rounded-md flex items-center'>
                <p className='p-4 '><span className='no-underline hover:underline text-blue-500 cursor-pointer'
                                          onClick={openFilePicker}>Chọn ảnh bìa.</span><br/> Lưu ý chỉ nhận <span
                    className='underline italic'>JPG, JPEG, PNG, SVG</span> và không vượt quá <span
                    className='underline italic'>3MB</span></p>

              </div>
            </div>
            <input name='title' className='border rounded p-2 mb-2 w-full' placeholder='Nhập tiêu đề ' required={true}/>
            <input name='description' className='border rounded p-2 mb-2 w-full' placeholder='Thêm mô tả'/>
            <div className='flex flex-wrap mb-2 gap-2'>
              <select className='border rounded p-2  w-1/4' name='categoryId'>
                {
                    categories && categories.map(cate => <>
                      <option value={cate.id}>{cate.name}</option>
                    </>)
                }
              </select>
            </div>

            <Suspense fallback={<>Loading...</>}>
              <PlateEditor editorName='content' onChange={setContent}/>
            </Suspense>

          </form>

        </div>

      </>
  );
}
