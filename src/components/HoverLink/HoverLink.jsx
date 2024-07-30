'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import './HoverLink.scss';

const HoverLink = ({ link, parentRef, isClosed }) => {
  const pathname = usePathname();
  const ref = useRef();
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });
  const [showHover, setShowHover] = useState(false);

  useEffect(() => {
    const handlePosition = () => {
      if (ref?.current && parentRef?.current && isClosed) {
        const rect = ref.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        const parentScrollTop = parentRef.current.scrollTop;
        const newPosition = {
          top: rect.top + parentScrollTop * -0.001 - parentRect.top - 7,
          left: 64,
        };
        setOverlayPosition(newPosition);
      }
    };

    handlePosition();
  }, [showHover]);

  return (
    <div>
      <div
        className={`hoverSideLinkOverlay 
            ${showHover && isClosed ? 'shown' : ''}
            `}
        style={{
          position: 'absolute',
          top: overlayPosition.top,
          left: overlayPosition.left,
        }}
      >
        <span>{link.name}</span>
      </div>
      {link?.ref ? (
        <Link
          href={link.ref}
          className={`sideBarHoverLink ${
            (link.ref === '/' && pathname === '/') ||
            (link.ref !== '/' && pathname.includes(link.ref))
              ? 'active'
              : ''
          }`}
          ref={ref}
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
        >
          <ReactSVG src={link.icon} className="linkIcon" />
          <span className="linkTxt">{link.name}</span>
          {link.id === 2 && <span className="countBadge">2</span>}
        </Link>
      ) : (
        <span
          className="sideBarHoverLink"
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
          ref={ref}
        >
          <ReactSVG src={link.icon} className="linkIcon" />
          <span className="linkTxt">{link.name}</span>
        </span>
      )}
    </div>
  );
};

export default HoverLink;
