import { createPortal } from 'react-dom';
import { Outlet, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router";
import type { RootOutletContext, ProjectJsonData } from "../lib/types";
import DotNav from '../components/DotNav/DotNav';
import { useCallback, useEffect, useState } from 'react';
import ImageScroll from '../components/ImageScroll/ImageScroll';
import PlayerLaunchBtn from '../components/PlayerLaunchBtn/PlayerLaunchBtn';
import { Helmet } from '@dr.pogodin/react-helmet';
import { TITLE } from '../lib/constants';
import ScrollPrompt from '../components/ScrollPrompt/ScrollPrompt';

export default function Portfolio() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData<ProjectJsonData>();
  const { 
    mainRef,
    gutterRef,
    columnFullRef,
    columnBottomRef,
    mounted
  } = useOutletContext<RootOutletContext>();
  const [ timeline, setTimeline ] = useState<gsap.core.Timeline>();

  const setTimelineCB = useCallback((tl?: gsap.core.Timeline) => {
    setTimeline(tl);
  }, [ setTimeline ])

  useEffect(() => {
    /* console.log('Portfolio timeline', timeline); */
    const el = mainRef.current;
    let offset = 0;
    let offsetCorrection = 0
    let scrollHeight;
    if (timeline) {
      offset = 1 - ((timeline.duration() - 0.3) / timeline.duration());
    }
    const onScroll = () => {
      if (timeline && mainRef) {
        scrollHeight = mainRef.current.scrollHeight - window.innerHeight;
        offsetCorrection = ((scrollHeight - mainRef.current.scrollTop) / scrollHeight) * offset;
        timeline.progress(1 - ((scrollHeight - mainRef.current.scrollTop) / scrollHeight) + offsetCorrection);
      }
    }
     el.addEventListener('scroll', onScroll);
    return () => {
       el.removeEventListener('scroll', onScroll);
    }
  }, [timeline, mainRef])
  
  useEffect(() => {
    if (!pid) {
      const prevPid = sessionStorage.getItem('prevPid');
      navigate(`/portfolio/${prevPid || data.projects[0].id}`, { replace: true });
    } else {
      sessionStorage.setItem('prevPid', pid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid])
  

  return (
    <>
      <Helmet>
        <title>{ TITLE } Portfolio - { data.projects.find(p => p.id === pid)?.name || '' }</title>
      </Helmet>

      {
        mounted && 
        <>
          <Outlet context={{ ...data, pid, setTimelineCB }}/>

          <ScrollPrompt />

          {
            createPortal(
              <ImageScroll 
                projects={data.projects}
                pid={pid}
                mainRef={mainRef}
              />, 
              columnFullRef.current
            )
          }
          
          {
            createPortal(<PlayerLaunchBtn />, columnBottomRef.current)
          }
            
          {
            createPortal(<DotNav projects={data.projects}/>, gutterRef.current)
          }
        </>
      }
    </>
  )
}