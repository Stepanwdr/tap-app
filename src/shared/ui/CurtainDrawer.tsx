import {type ReactNode, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import {CircleX} from "lucide-react";

type CurtainDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  fullHeight?: boolean;
};


export const CurtainDrawer = ({ isOpen, onClose, children, fullHeight }: CurtainDrawerProps) => {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(isOpen);
  const [, setAnimating] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setAnimating(true);
    } else {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setRender(false);
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   touchStartY.current = e.touches[0].clientY;
  // };
  //
  // const handleTouchMove = (e: React.TouchEvent) => {
  //   touchEndY.current = e.touches[0].clientY;
  // };

  const handleTouchEnd = () => {
    if (
      touchStartY.current !== null &&
      touchEndY.current !== null &&
      touchEndY.current - touchStartY.current > 60
    ) {
      onClose();
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  if (!mounted || typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <>
      {render && <Overlay visible={isOpen} onClick={onClose} />}
      {render && (
        <Drawer
          isVisible={isOpen}
          fullHeight={fullHeight}
          // onTouchStart={handleTouchStart}
          // onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CircleX color={'white'} className={'close'} onClick={onClose} />
          {children}
        </Drawer>
      )}
    </>,
    document.body
  );
};

const fadeIn = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const fadeOut = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
`;

const Overlay = styled.div<{ visible: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: ${({ visible }) => (visible ? "block" : "none")};
    z-index: 1000;
`;

const Drawer = styled.div<{ isVisible: boolean; fullHeight?: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({fullHeight}) => (fullHeight ? "93%" : "auto")};
    background: var(--color-dark-blue);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 20px;
    z-index: 1001;
    overflow-y: auto;
    animation: ${({isVisible}) => (isVisible ? fadeIn : fadeOut)} .4s forwards;
    box-shadow: 1px 2px 40px #c8c8c8;

    .close {
        position: fixed;
        top: 20px;
        right: 20px;
        cursor: pointer;
        opacity: .6;
    }
`;

