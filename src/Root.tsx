import { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router";
import Menu from "./components/Menu/Menu";
import Logo from "./components/Logo/Logo";


export default function Root() {
  const { pid } = useParams();
  const [ mounted, setMounted ] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const columnFullRef = useRef<HTMLDivElement>(null);
  const columnBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // rm item from storage on refresh or nav away
    window.onbeforeunload = () => sessionStorage.removeItem('prevPid');
  }, []);
  
  return (
    <div className={`layout-grid ${pid}`}>
      <div className="layout-grid__gutter layout-grid__gutter--left">
        <Menu />
      </div>

      <main ref={mainRef} className="layout-grid__content">
        <div className="layout-grid__content__main">
          <Outlet context={{ mainRef, gutterRef, columnFullRef, columnBottomRef, mounted }}/>
        </div>


        <div ref={columnFullRef} className="layout-grid__content__column--full">
        </div>

        <div className="layout-grid__content__column--top">
          <Logo />
        </div>

        {/* <div className="layout-grid__content__column--mid">
        </div> */}

        <div ref={columnBottomRef} className="layout-grid__content__column--bottom">
        </div>
      </main>

      <div ref={gutterRef} className="layout-grid__gutter layout-grid__gutter--right">
      </div>
    </div>
  )
}