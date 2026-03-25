/* eslint-disable react-hooks/refs */

import { createPortal } from 'react-dom';
import { useLoaderData, useOutletContext } from "react-router";
import type { OutletContextDomEls, ProjectJsonData } from "../lib/types";
import DotNav from '../components/DotNav/DotNav';
import { useEffect } from 'react';
import ImageScroll from '../components/ImageScroll/ImageScroll';
import PlayerLaunchBtn from '../components/PlayerLaunchBtn/PlayerLaunchBtn';

export default function Portfolio() {
  const { projects, roles, types } = useLoaderData<ProjectJsonData>();
  const { 
    gutterEl,
    columnMidEl,
    columnBottomEl 
  } = useOutletContext<OutletContextDomEls>();

  /* useEffect(() => {
    console.log(gutterRef);
  }, [gutterRef]) */
  

  return (
    <>
      <div>Portfolio</div>

      {
        !!columnMidEl && createPortal(<ImageScroll projects={projects}/>, columnMidEl)
      }

      {
        !!columnBottomEl && createPortal(<PlayerLaunchBtn projects={projects}/>, columnBottomEl)
      }

      {
        !!gutterEl && createPortal(<DotNav projects={projects}/>, gutterEl)
      }
    </>
    
  )
}