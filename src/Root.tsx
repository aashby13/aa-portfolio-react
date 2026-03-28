import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Menu from "./components/Menu/Menu";
import type { OutletContextDomEls } from "./lib/types";
import Logo from "./components/Logo/Logo";


export default function Root() {
  const location = useLocation();
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const columnMidRef = useRef<HTMLDivElement | null>(null);
  const columnBottomRef = useRef<HTMLDivElement | null>(null);
  const [outletContext, setOutletContext ] = useState<OutletContextDomEls>({ 
    gutterEl: null, 
    columnMidEl: null, 
    columnBottomEl: null
  });

  useEffect(() => {
    console.log(location);
  }, [location]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutletContext({
      gutterEl: document.querySelector('.layout-grid__gutter--right'),
      columnMidEl: document.querySelector('.layout-grid__content__column__mid'), 
      columnBottomEl: document.querySelector('.layout-grid__content__column__mid')
    });
  }, []);
  
  return (
    <div className="layout-grid">
      <div className="layout-grid__gutter layout-grid__gutter--left">
        <Menu />
      </div>

      <main className="layout-grid__content">
        <div className="layout-grid__content__main">
          <Outlet context={outletContext}/>
        </div>

        <div className="layout-grid__content__column">
          <div className="layout-grid__content__column__top">
            <Logo />
          </div>

          <div ref={columnMidRef} className="layout-grid__content__column__mid">
          </div>

          <div ref={columnBottomRef} className="layout-grid__content__column__bottom">
          </div>
        </div>
      </main>

      <div ref={gutterRef} className="layout-grid__gutter layout-grid__gutter--right">
      </div>
    </div>
  )
}