import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import Menu from "./components/Menu/Menu";
import type { OutletContextDomEls } from "./lib/types";
import Logo from "./components/Logo/Logo";


export default function Root() {
  const { pid } = useParams();
  const [outletContext, setOutletContext ] = useState<OutletContextDomEls>({ 
    mainEl: null,
    gutterEl: null, 
    columnFullEl: null,
    columnBottomEl: null
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutletContext({
      mainEl: document.querySelector('.layout-grid__content'),
      gutterEl: document.querySelector('.layout-grid__gutter--right'),
      columnFullEl: document.querySelector('.layout-grid__content__column--full'),
      columnBottomEl: document.querySelector('.layout-grid__content__column--bottom')
    });
    // rm item from storage on refresh or nav away
    window.onbeforeunload = () => sessionStorage.removeItem('prevPid');
  }, []);
  
  return (
    <div className={`layout-grid ${pid}`}>
      <div className="layout-grid__gutter layout-grid__gutter--left">
        <Menu />
      </div>

      <main className="layout-grid__content">
        <div className="layout-grid__content__main">
          <Outlet context={outletContext}/>
        </div>


        <div className="layout-grid__content__column--full">

        </div>

        <div className="layout-grid__content__column--top">
          <Logo />
        </div>

        {/* <div className="layout-grid__content__column--mid">
        </div> */}

        <div className="layout-grid__content__column--bottom">
        </div>
      </main>

      <div className="layout-grid__gutter layout-grid__gutter--right">
      </div>
    </div>
  )
}