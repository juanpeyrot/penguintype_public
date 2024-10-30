import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CapsLockAlert = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #ff5252;
  color: white;
  font-size: 18px;
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease-in-out;
	z-index: 9999;
	min-width: 160px;
`;


export const CapsLockWarning = () => {
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    const checkCapsLock = (e: KeyboardEvent) => {
      const isCapsLockOn = e.getModifierState('CapsLock');
      setCapsLockOn(isCapsLockOn);
    };

    window.addEventListener('keydown', checkCapsLock);

    return () => {
      window.removeEventListener('keydown', checkCapsLock);
    };
  }, []);

  return capsLockOn && (
    <CapsLockAlert>CapsLock ON</CapsLockAlert>
  )
};
