'use client'
import {baseApiUrl} from "../../../../../../../lib/api";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Modal from "@an/components/modal/Modal";

export default function Page() {
  const router = useRouter();
  const submit = async (formData: FormData) => {
    const res = await fetch(baseApiUrl + '/admin/categories', {method: 'POST', body: formData}).then(res => res.json());
    if (res.message) {
      toast.error(res.message);
      return;
    }
    toast.success('Tạo danh mục thành công');
    router.push('/admin/categories');
  }
  return (
      <>
        <Modal title='Thêm danh mục'>
          <form action={submit} className='m-4 flex flex-col gap-2'>
            <input id='name' type='text' placeholder='Nhập tên danh mục' name='name' className='border rounded p-2'/>
            <input className='border rounded p-2 bg-blue-500 text-white' type='submit' value='Thêm'/>
          </form>
        </Modal>
      </>
  )
}
