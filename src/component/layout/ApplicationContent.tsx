

import React, { Component, Fragment } from 'react';
import BaseComponent from './../BaseComponent';
import { mapCommonUserStateToProps } from './../../constant/stores';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../pages/login/Login';
import DashboardMain from '../pages/dashboard/DashboardMain';
import MasterDataMain from '../pages/masterdata/MasterDataMain';
import TransactionMain from '../pages/transaction/TransactionMain';
import CatalogMain from '../pages/catalog/CatalogMain';
import HomeMain from '../pages/home/HomeMain';
import CartMain from '../pages/cart/CartMain';
import BaseMainMenus from './BaseMainMenus';
import Menu from './../../models/Menu';

class ApplicationContent extends BaseComponent {

    ref: React.RefObject<BaseMainMenus> = React.createRef();
    constructor(props: any) {
        super(props, false);
    }
    setSidebarMenus=(menus:Menu[])=>{
        this.props.setSidebarMenus(menus);
    }
    render() {
        return (
            <div style={{ paddingTop: '10px' }}>
                <Switch>
                    <Route path="/login" render={
                        (props: any) =>
                            <Login app={this.parentApp} />
                    } />
                    {/* -------- home -------- */}
                    <Route path="/home" render={
                        (props: any) =>
                            <HomeMain app={this.parentApp} />
                    } />
                    {/* -------- dashboard -------- */}
                    <Route path="/dashboard" render={
                        (props: any) =>
                            <DashboardMain  app={this.parentApp} />
                    } />
                    {/* -------- masterdata -------- */}
                    <Route exact path="/management" render={
                        (props: any) =>
                            <MasterDataMain setSidebarMenus={this.setSidebarMenus} app={this.parentApp} />
                    } />
                    <Route exact path="/management/:code" render={
                        (props: any) =>
                            <MasterDataMain setSidebarMenus={this.setSidebarMenus} app={this.parentApp} />
                    } />
                    {/* -------- transaction -------- */}
                    <Route path="/transaction" render={
                        (props: any) =>
                            <TransactionMain  app={this.parentApp} />
                    } />
                    {/* -------- catalog -------- */}
                    <Route path="/catalog" render={
                        (props: any) => {
                            console.debug("Render caralog");
                            return <CatalogMain  app={this.parentApp} />
                        }
                    } />
                    {/* -------- home -------- */}
                    <Route path="/cart" render={
                        (props: any) =>
                            <CartMain  app={this.parentApp} />
                    } />
                </Switch>

            </div>
        )
    }
    componentDidMount() {
        // document.title = "Login";
    }

}



const mapDispatchToProps = (dispatch: Function) => ({})


export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(ApplicationContent))