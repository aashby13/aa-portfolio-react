import { useOutletContext } from 'react-router'
import type { ProjectJsonData } from '../../lib/types'
import './Rolodex.scss'

export default function Rolodex() {
  const { projects, roles, types } = useOutletContext<ProjectJsonData>();

  return (
    <div className="rolodex">
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
                  <span className="tab"></span>name:
                  <span className="string name">'{ project.name }'</span>,
                </p>

                {
                  project.info.map(info => (
                    <p key={`${project.id}-${info.title}`}>
                      <span className="tab"></span>{ info.title }:
                      { info.strings || info.numbers ? '[' : null }

                      {
                        info.strings?.map((str, i, arr) => (
                          <span key={`${project.id}-${info.title}-str${i}`}>
                            <span className="string">'{ str }'</span>{ i === arr.length - 1 ? '' : ',' }
                          </span>
                        ))
                      }

                      { info.strings || info.numbers ? '],' : null }

                      {
                        info.numbers?.map((number,i) => (
                          <span key={`${project.id}-${info.title}-num${i}`} className="number">
                            { number }
                          </span>
                        ))
                      }
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