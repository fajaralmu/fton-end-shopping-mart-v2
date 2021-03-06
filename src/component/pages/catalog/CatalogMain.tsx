

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseComponent from './../../BaseComponent';
import { mapCommonUserStateToProps } from './../../../constant/stores';
import Menu from './../../../models/Menu';
import BaseMainMenus from './../../layout/BaseMainMenus';
import Card from './../../container/Card';
import AnchorWithIcon from '../../navigation/AnchorWithIcon';
import CatalogService from './../../../services/CatalogService';
import WebResponse from './../../../models/WebResponse';
import AnchorButton from '../../navigation/AnchorButton';
import Spinner from './../../loader/Spinner';
class IState { totalProduct: number = 0; loading: boolean = false; }
class CatalogMain extends BaseMainMenus {
    catalogService: CatalogService;
    state: IState = new IState();
    constructor(props: any) {
        super(props, "Catalog");
        this.catalogService = this.getServices().catalogService;
    }
    startLoading = () => this.setState({ loading: true });
    endLoading = () => this.setState({ loading: false });
    totalProductLoaded = (response: WebResponse) => {
        this.catalogService.setTotalProduct(response.totalData ?? 0);
        this.setState({ totalProduct: response.totalData });
    }
    totalProductNotLoaded = (e: any) => {
        console.error(e);
    }
    loadTotalProduct = () => {
        this.commonAjax(
            this.catalogService.getTotalProduct,
            this.totalProductLoaded,
            this.totalProductNotLoaded
        );
    }
    componentDidMount() {
        if (this.catalogService.totalProduct <= 0) {
            this.loadTotalProduct();
        } else {
            this.setState({ totalProduct: this.catalogService.totalProduct });
        }
    }

    render() {
        return (
            <div id="CatalogMain" className="container-fluid">
                <h2>Shop Catalog</h2>
                <div className="row">
                    <div className="col-md-4">
                        <Card title="Product Catalog" className="bg-light">
                            {this.state.loading ? <Spinner /> :
                                <Fragment>
                                    <h4>Total Product: {this.state.totalProduct}</h4>
                                    <div className="btn-group">
                                        <AnchorWithIcon className="btn btn-info" to="/catalog/product">View Catalog</AnchorWithIcon>
                                        <AnchorButton iconClassName="fas fa-sync-alt" onClick={this.loadTotalProduct} />
                                    </div>
                                </Fragment>}
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card title="Supplier Catalog" className="bg-light">
                            <h4>Supplier catalog</h4>
                            <AnchorWithIcon className="btn btn-info" to="/catalog/supplier">View Catalog</AnchorWithIcon>

                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch: Function) => ({
})


export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(CatalogMain))