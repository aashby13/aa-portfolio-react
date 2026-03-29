import { createPortal } from 'react-dom';
import { Outlet, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router";
import type { OutletContextDomEls, ProjectJsonData } from "../lib/types";
import DotNav from '../components/DotNav/DotNav';
import { useEffect } from 'react';
import ImageScroll from '../components/ImageScroll/ImageScroll';
import PlayerLaunchBtn from '../components/PlayerLaunchBtn/PlayerLaunchBtn';

export default function Portfolio() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData<ProjectJsonData>();
  const { 
    gutterEl,
    columnMidEl,
    columnBottomEl 
  } = useOutletContext<OutletContextDomEls>();

  useEffect(() => {
    if (!pid) {
      navigate(`/portfolio/${data.projects[0].id}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])
  

  return (
    <>
      <Outlet context={data}/>

      {
        !!columnMidEl && createPortal(<ImageScroll projects={data.projects}/>, columnMidEl)
      }

      {
        !!columnBottomEl && createPortal(<PlayerLaunchBtn />, columnBottomEl)
      }

      {
        !!gutterEl && createPortal(<DotNav projects={data.projects}/>, gutterEl)
      }
    </>
    
  )
}