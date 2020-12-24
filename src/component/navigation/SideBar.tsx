

import React, { Component, Fragment } from 'react';
import BaseComponent from './../BaseComponent';
import { mapCommonUserStateToProps } from './../../constant/stores';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { performLogout } from './../../redux/actionCreators';
import Menu from './../../models/Menu';
import './SideBar.css'

class SideBar extends BaseComponent {
    constructor(props: { brand: any, sidebarMenus?: Menu[] }) {
        super(props, false);
    }
    isSidebarActive = (menu: Menu) => {
        const parentMenu: Menu = this.props.parentMenu;
        if (null == parentMenu) { return false; }
        const pathName = this.props.location.pathname;
        return parentMenu.url + "/" + menu.url == pathName;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = Math.min(0, scrollTop / 3 - 60);
        // console.debug("scrollTop: ", scrollTop);
      
    }
    render() {
        const parentMenu: Menu = this.props.parentMenu;
        if (null == parentMenu) { return null }
        const menus: Menu[] = this.props.sidebarMenus == null ? [] : this.props.sidebarMenus;

        return (
            <ul id="sidebar" className="sidebar-nav bg-secondary">
                <Brand show={parentMenu != null} brand={parentMenu} />
                {menus.map(menu => {
                    const isActive: boolean = this.isSidebarActive(menu);
                    const menuClassName = isActive ? 'menu-active' : 'regular-menu';
                    return (
                        <li key={"SIDEBAR_" + menu.code}><Link to={parentMenu.url + "/" + menu.url}>
                            <span className={menuClassName} style={{ marginRight: '5px' }}><i className={Menu.getIconClassName(menu)}></i></span>
                            <span className={'menu-label ' + menuClassName} >{menu.name}</span>
                        </Link></li>
                    )
                })
                }
            </ul >
        )
    }

}
const Brand = (props) => {
    if (props.show == false) return null;
    return (
        <li id="sidebar-brand" className="sidebar-brand" style={{ marginBottom: '20px' }}><div
            style={{
                textAlign: 'center', paddingTop: '10px',
                paddingBottom: '10px'
            }}>
            <h3 className="text-light">
                <i className={Menu.getIconClassName(props.brand)}></i>
            </h3>
            <h4 className="text-light">{props.brand.name}</h4>
        </div></li>
    )
}
const mapDispatchToProps = (dispatch: Function) => ({
    performLogout: (app: any) => dispatch(performLogout(app))
})


export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(SideBar))