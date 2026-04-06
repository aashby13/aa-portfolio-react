/* eslint-disable react-hooks/exhaustive-deps */
import { useOutletContext } from 'react-router'
import type { PortfolioOutletContextData, ProjectTypeData } from '../../lib/types'
import './Rolodex.scss'
import { gsap } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';

export default function Rolodex() {
  const { projects, roles, types, pid, setTimelineCB } = useOutletContext<PortfolioOutletContextData>();
  const [ timeline, setTimeline ] = useState<gsap.core.Timeline>();
  const [ skip, setSkip ] = useState(true);
  const { contextSafe } = useGSAP();

  const buildTL = contextSafe(() => {
    const length = projects.length;
    const lengthMinus1 = length - 1;
    // set .project-type & .project-role rotation
    gsap.set(['.project-type', '.project-role'], { rotationX: 90, transformOrigin: 'center center', display: 'block' });
    // set .project-info rotation
    gsap.set('.project-info', { rotationY: 90, transformOrigin: 'top left', display: 'block' });
    // build timeline
    const tl = gsap.timeline({ paused: true, perspective: 4000, smoothChildTiming: true  })
      .to('.project-info[data-index="0"]', { duration: 0.3, rotationY: 0 }, 0)
      .to([
          `.project-type[data-type="${(projects[0].type as ProjectTypeData).id}"]`,
          `.project-role[data-role="${projects[0].role}"]`
        ],
        { duration: 0.3,  rotationX: 0 }, 0);
    //
    projects.forEach((proj, i, arr) => {
      // add labels for each project .6sec apart
      tl.addLabel(proj.id, (i * 0.6) + 0.3);
      //
      if (i < lengthMinus1) {
        // anim project-info sections at label
        tl.to(`.project-info[data-index="${i}"]`, { duration: 0.3,  rotationY: -90 }, proj.id); // hide
        tl.to(`.project-info[data-index="${i + 1}"]`, { duration: 0.3,  rotationY: 0 }, proj.id + '+=.3'); // show
        // anim project-role sections if roles dif
        if (proj.role !== arr[i + 1].role) {
          tl.to(`.project-role[data-role="${proj.role}"]`,
            { duration: 0.3,  rotationX: -90 }, proj.id); // hide
        }
        tl.to(`.project-role[data-role="${arr[i + 1].role}"]`,
          { duration: 0.3,  rotationX: 0 }, proj.id + '+=.3'); // show
        // anim project-type sections if types dif
        if ((proj.type as ProjectTypeData).id !== (arr[i + 1].type as ProjectTypeData).id) {
          tl.to(`.project-type[data-type="${(proj.type as ProjectTypeData).id}"]`,
            { duration: 0.3,  rotationX: -90 }, proj.id); // hide
        }
        tl.to(`.project-type[data-type="${(arr[i + 1].type as ProjectTypeData).id}"]`,
          { duration: 0.3,  rotationX: 0 }, proj.id + '+=.3'); // show
      }
    })
    //
    setTimeline(tl);
  })

  const showLandingProject = contextSafe((index: number, id: string) => {
    /* console.log(index) */
    setSkip(false);
    const t1 = gsap.fromTo([
        `.project-type[data-type="${(projects[index].type as ProjectTypeData).id}"]`,
        `.project-role[data-role="${projects[index].role}"]`
      ],
      { rotationX: 90 },
      { duration: 0.3, rotationX: 0, ease: 'sine.out', delay: 0.5 });
    const t2 = gsap.to(
      `.project-info[data-index="${index}"]`,
      { duration: 0.3, rotationY: 0, ease: 'sine.out', delay: 0.5,
        onComplete: () => {
          t1.revert();
          t2.revert();
          timeline?.seek(id);
          setTimelineCB(timeline);
         }
       });
  })

  /* const tweenToProject = contextSafe((id: string) => {
    console.log('tweenToProject', timeline, skip);
    if (!skip && timeline) {
      let timeScale = Math.abs(timeline.time() - timeline.labels[id]);
      timeScale = timeScale / 0.6;
      timeline.timeScale(timeScale);
      timeline.tweenTo(id, { ease: 'sine.out', overwrite: true });
    }
  }) */

  useEffect(() => {
    buildTL();
    return () => setTimelineCB();
  }, [])

  useEffect(() => {
    /* console.log('rolodex timeline', timeline); */
    if (timeline) {
      const startingIndex = projects.find(obj => obj.id === pid)?.index || 0;
      if (pid) showLandingProject(startingIndex, pid);
    }
  }, [ timeline ])

  /* useEffect(() => {
    console.log('rolodex pid', pid);
    if (pid) {
      console.log(timeline?.time())
      timeline?.currentLabel(pid);
      console.log(timeline?.time())
    }
  }, [ pid ]) */

  return (
    <div className="rolodex" data-show={!skip}>
      <div id="text-holder">
        <div className="type-roles-wrap">
          <div className="project-type-wrap">
            {
              types.map((type) => (
                <h1 key={type.id} className="project-type" data-type={type.id}>
                  { type.text }
                </h1>
              ))
            }
          </div>

          <div className="project-role-wrap">
            {
              roles.map(role => (
                <section key={role.id} className="project-role" data-role={role.id}>
                  <h2>
                    <span className="tab">me</span>
                    { role.me }
                  </h2>
                  <h2>
                    <span className="tab">&nbsp;&nbsp;&nbsp;&#64;</span>
                    { role.company }
                  </h2>
                </section>
              ))
            }
          </div>
        </div>

        <div className="project-info-wrap">
          {
            projects.map(project => (
              <section key={`section-${project.id}`} className="project-info" data-index={project.index}>
                <p>
                  myWork.projects[<span className="number">{ project.index }</span>].<span className="keyword">info</span>
                  <span className="operator"> =</span> { '{' }
                </p>

                <p>
                  <span className="tab"></span>name:&nbsp;
                  <span className="string name">'{ project.name }'</span>,
                </p>

                {
                  project.info.map((info, index, infoArr) => (
                    <p key={`${project.id}-${info.title}`}>
                      <span className="tab"></span>{ info.title }:&nbsp;
                      { info.strings || info.numbers ? '[ ' : null }

                      {
                        info.strings?.map((str, i, arr) => (
                          <span key={`${project.id}-${info.title}-str${i}`}>
                            <span className="string">'{ str }'</span>{ i === arr.length - 1 ? '' : ', ' }
                          </span>
                        ))
                      }

                      {
                        info.numbers?.map((number, i, arr) => (
                          <span key={`${project.id}-${info.title}-num${i}`} className="number">
                            { number }{ i === arr.length - 1 ? '' : ', ' }
                          </span>
                        ))
                      }

                      {
                        !!info.number && 
                          <span className="number">
                            { info.number }
                          </span>
                      }

                      { info.strings || info.numbers ? ' ]' : null }
                      { index === infoArr.length - 1 ? '' : ', ' }

                    </p>
                  ))
                }
                <p>{'};'}</p>
              </section>
            ))
          }
        </div>
      </div>
    </div>
  )
}