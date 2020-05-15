import React, { useEffect, useRef, useState } from 'react';
import { clone } from 'ramda';

const defaultImg = require('../../assets/images/loading.gif');

interface PropsI {
  element: () => JSX.Element,
}

const LazyLoad: React.FC<PropsI> = (props: PropsI) => {
  const [Element, setElement] = useState(props.element());
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Tmp = clone(props.element());
    Tmp.props.src = defaultImg;
    setElement(Tmp);
  }, [props]);

  useEffect(() => {
    if (!elementRef || !elementRef.current) return;
    const observer = new IntersectionObserver((changes) => {
      changes.forEach((change) => {
        if (change.isIntersecting) {
          const Com = clone(Element);
          const imgNode = new Image();
          imgNode.src = Com?.props['data-src'];
          imgNode.onload = () => {
            Com.props.src = Com?.props['data-src'];
            setElement(Com);
          };
          observer.unobserve(change.target);
        }
      });
    });
    observer.observe(elementRef.current);
  }, []);
  return (
    <div ref={elementRef}>
      {
        Element
      }
    </div>
  );
};

export default function (element: () => JSX.Element) {
  return (
    <LazyLoad element={element} />
  );
}
