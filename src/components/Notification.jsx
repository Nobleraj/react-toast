import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FaCircleInfo } from 'react-icons/fa6';
import { TiWarning } from 'react-icons/ti';
import { IoMdClose } from 'react-icons/io';
const icons = {
  success: <FaCheckCircle />,
  error: <BiSolidErrorAlt />,
  info: <FaCircleInfo />,
  warning: <TiWarning />,
};
export default function Notification({ type = 'info', message, onClose }) {
  return (
    <div className={`notification ${type}`}>
      {icons[type]}
      <span style={{ marginLeft: '10px' }}>{message}</span>
      <IoMdClose className="closeBtn" onClick={onClose} />
    </div>
  );
}
