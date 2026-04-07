import { TITLE } from '../lib/constants';
import './About.scss';
import { Helmet } from '@dr.pogodin/react-helmet';

export default function About() {
  return (
    <>
      <Helmet>
        <title>{ TITLE } About</title>
      </Helmet>

      <div className='about'>
        <h1>Inquire Within</h1>
        <p>under construction</p>
      </div>
    </>
  )
}