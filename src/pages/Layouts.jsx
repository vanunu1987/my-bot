import React,{Component} from 'react'
import classes from './Layout.module.scss'

import Top from '../components/top/Top'
import SideNav from '../components/SideNav/SideNav'
import MainContent from '../components/MainContent/MainContent'
class Layout  extends Component {

    render() {
        return(
            <div className={classes['main-layout']}>
                <Top />
                <div className={classes["middle-layout"]}>
                    <SideNav />
                    <MainContent />

                </div>
            </div>
        )
    }
}

export default Layout