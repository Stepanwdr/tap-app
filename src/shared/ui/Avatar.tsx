// Avatar.tsx
import styled from "styled-components";
import React from "react";



export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = 36,
  border = false,
  fallback,
  ...rest
}) => {
  return (
    <AvatarWrapper size={size} border={border} {...rest}>
      {src ? <AvatarImage width={40}  src={src} alt={alt} /> : fallback || "👤"}
    </AvatarWrapper>
  );
};

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: number;
  border?: boolean;
  fallback?: React.ReactNode;
}

const AvatarWrapper = styled.div<{ size: number; border: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border: ${({ border }) => (border ? "2px solid #ccc" : "none")};
  font-size: ${({ size }) => size / 2.5}px;
  color: #888;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;