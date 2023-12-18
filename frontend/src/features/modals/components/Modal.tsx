'use client';

import { RoundButton } from '@/components';
import { VscClose } from 'react-icons/vsc';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  withCloseButton?: boolean;
}

const Modal: React.FC<Props> = ({ onClose, children, withCloseButton }) => {
  return (
    <div
      className='fixed items-center flex justify-center inset-0 bg-black/50 backdrop-blur-sm z-[100]'
      onClick={onClose}
    >
      <div className='relative z-[120]' onClick={(e) => e.stopPropagation()}>
        {withCloseButton && (
          <RoundButton
            customClass='absolute top-4 right-4 bg-slate-500/10'
            onClick={onClose}
          >
            <VscClose className='text-gray-600 text-2xl' />
          </RoundButton>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
