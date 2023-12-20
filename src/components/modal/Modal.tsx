'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { Icons } from '@an/components/icons';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog.Root open onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md bg-white p-5">
          <Dialog.Title className="text-xl font-medium">{title}</Dialog.Title>
          {children}
          <Dialog.Close className="inline-flex absolute items-center justify-center top-1 right-1">
            <Icons.close />
          </Dialog.Close>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
