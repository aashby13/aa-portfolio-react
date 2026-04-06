import { createPortal } from 'react-dom';
import { Outlet, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router";
import type { OutletContextDomEls, ProjectJsonData } from "../lib/types";
import DotNav from '../components/DotNav/DotNav';
import { useCallback, useEffect, useState } from 'react';
import ImageScroll from '../components/ImageScroll/ImageScroll';
import PlayerLaunchBtn from '../components/PlayerLaunchBtn/PlayerLaunchBtn';

export default function Portfolio() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData<ProjectJsonData>();
  const { 
    mainEl,
    gutterEl,
    columnFullEl,
    columnBottomEl 
  } = useOutletContext<OutletContextDomEls>();
  const [ timeline, setTimeline ] = useState<gsap.core.Timeline>();

  const setTimelineCB = useCallback((tl?: gsap.core.Timeline) => {
    setTimeline(tl);
  }, [ setTimeline ])


  useEffect(() => {
    /* console.log('Portfolio timeline', timeline); */
    let offset = 0;
    let offsetCorrection = 0
    let scrollHeight;
    if (timeline) {
      offset = 1 - ((timeline.duration() - 0.3) / timeline.duration());
    }
    const onScroll = () => {
      if (timeline && mainEl) {
        scrollHeight = mainEl.scrollHeight - window.innerHeight;
        offsetCorrection = ((scrollHeight - mainEl.scrollTop) / scrollHeight) * offset;
        timeline.progress(1 - ((scrollHeight - mainEl.scrollTop) / scrollHeight) + offsetCorrection);
      }
    }
    mainEl?.addEventListener('scroll', onScroll);
    return () => {
      mainEl?.removeEventListener('scroll', onScroll);
    }
  }, [timeline, mainEl])
  
  useEffect(() => {
    if (!pid) {
      navigate(`/portfolio/${data.projects[0].id}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])
  

  return (
    <>
      <Outlet context={{ ...data, pid, setTimelineCB }}/>

      {
        !!columnFullEl && createPortal(
          <ImageScroll 
            projects={data.projects}
            pid={pid}
            mainEl={mainEl}
          />, 
          columnFullEl
        )
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