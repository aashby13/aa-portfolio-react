import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.scss'
import Root from './Root';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import type { LoadedJsonData, ProjectData, ProjectJsonData, ProjectTypeData, TypesData } from './lib/types';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        element: <Navigate to="/portfolio" replace />
      },
      {
        path: 'portfolio',
        Component: Portfolio,
        loader: async () => {
          const resp = await fetch('assets/json/portfolio.json');
          const { projects, roles }: LoadedJsonData = await resp.json();
          const types: ProjectTypeData[] = [];
          const typesData: TypesData = {};
          // change project.type to ProjectTypeData object {text:string, id:string}
          projects.map((project: ProjectData, i: number) => {
            const t = (project.type as string).toLowerCase().replace(/ /g, '-');
            const typeObj = { text: project.type, id: t } as ProjectTypeData;
            // build typesData object - no duplicates
            if (!Object.prototype.hasOwnProperty.call(typesData, t)) {
              typesData[t] = typeObj;
              types.push(typeObj);
            }
            //
            return Object.assign(project, {type: typeObj, index: i});
          });
          const data: ProjectJsonData = { projects, roles, types};
          console.log(data);
          return data;
        }
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'contact',
        Component: Contact
      }
    ]
  },
]);

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root,
  {
    onUncaughtError: (error, errorInfo) => {
      // ... log error report
      console.log('onUncaughtError', error, errorInfo);
    },
    onCaughtError: (error, errorInfo) => {
      // ... log error report
      console.log('onCaughtError', error, errorInfo);
    }
  }).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
