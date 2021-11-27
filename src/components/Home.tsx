import * as React from 'react'
import * as classnames from 'classnames'
import * as css from './Home.css'

export const Home: React.FunctionComponent = props =>
  <div className={classnames('test', css.home)}>
    <ul>
      <li>
        This is Rishabh's place
      </li>
      <li>
        This is Rishabh's website. This is work in progress.
      </li>
    </ul>
  </div>