import React from "react";
interface ThumbnailsProps {
    images: string[];
    style?: React.CSSProperties;
    setImages?: React.Dispatch<React.SetStateAction<string[]>>;
    onHeightChange?: (height: number) => void;
}
declare const _default: import("react").MemoExoticComponent<({ images, style, setImages, onHeightChange }: ThumbnailsProps) => JSX.Element>;
export default _default;
