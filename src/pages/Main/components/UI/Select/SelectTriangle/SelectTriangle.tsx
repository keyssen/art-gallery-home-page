import React, { FC, memo, RefObject, useRef } from 'react';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';

interface ISelectTriangleProps {
    isActive: boolean;
    isScrollerAtBottom: boolean;
    className: string;
    selectRef: RefObject<HTMLDivElement>;
}

const SelectTriangle: FC<ISelectTriangleProps> = ({
    isActive,
    isScrollerAtBottom,
    className,
    selectRef
}) => {
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollUp = () => {
        selectRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollDown = () => {
        selectRef.current?.scrollBy(0, 1);
    };

    const assignFunction = () => {
        scrollTimeoutRef.current = setInterval(scrollDown) as NodeJS.Timeout;
    };

    const handleMouseUp = () => {
        clearInterval(scrollTimeoutRef.current as NodeJS.Timeout);
    };

    const handleMouseDown = () => {
        isScrollerAtBottom ? scrollUp() : assignFunction();
    };

    if (isActive) {
        return (
            <div
                className={className}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {isScrollerAtBottom ? (
                    <DownTriangle
                        style={{
                            transform: 'rotate(180deg)'
                        }}
                    />
                ) : (
                    <DownTriangle />
                )}
            </div>
        );
    }
    return (
        <div className={className}>
            <DownTriangle />
        </div>
    );
};

export default memo(SelectTriangle);
