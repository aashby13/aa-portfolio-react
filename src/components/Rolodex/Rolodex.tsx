import { useOutletContext } from 'react-router'
import type { ProjectJsonData } from '../../lib/types'
import './Rolodex.scss'

export default function Rolodex() {
  const { projects, roles, types } = useOutletContext<ProjectJsonData>();

  return (
    <div className="rolodex">

    </div>
  )
}