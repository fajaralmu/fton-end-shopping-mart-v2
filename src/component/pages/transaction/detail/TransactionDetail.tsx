

import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCommonUserStateToProps } from '../../../../constant/stores';
import TransactionHistoryService from './../../../../services/TransactionHistoryService';
import BaseComponent from './../../../BaseComponent';
import Transaction from './../../../../models/Transaction';
import Modal from './../../../container/Modal';
import FormGroup from '../../../form/FormGroup';
import WebResponse from './../../../../models/WebResponse';
import AnchorWithIcon from '../../../navigation/AnchorWithIcon';
import ProductFlow from './../../../../models/ProductFlow';
import Product from '../../../../models/Product';
import { totalUnitAndPrice } from '../BaseTransactionComponent';
import SimpleError from './../../../alert/SimpleError';
import { beautifyNominal } from '../../../../utils/StringUtil';
import Spinner from '../../../loader/Spinner';
class IState {
    transactionData?: Transaction;
    transactionCode?: string;
    dataNotFound: boolean = false;
    loading: boolean = false;
}
class TransactionDetail extends BaseComponent {
    transactionHistoryService: TransactionHistoryService;
    state: IState = new IState();
    constructor(props: any) {
        super(props, true);
        this.transactionHistoryService = this.getServices().transactionHistoryService;
    }
    startLoading = () => this.setState({ loading: true });
    endLoading = () => this.setState({ loading: false });
    componentDidMount() {
        this.validateLoginStatus();
        document.title = "Transaction Detail";
    }
    componentDidUpdate() {
        this.validateLoginStatus();
    }

    recordLoaded = (response: WebResponse) => {
        if (!response.transaction) {
            throw new Error("Not found");
        }
        response.transaction.productFlows = response.entities;
        this.setState({ transactionData: response.transaction, dataNotFound: false });
    }

    recordNotLoaded = (e: any) => {
        console.error(e);
        this.setState({ dataNotFound: true, transactionData: undefined });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.commonAjax(
            this.transactionHistoryService.getTransactionData,
            this.recordLoaded,
            this.recordNotLoaded,
            this.state.transactionCode
        )
    }
    setTransactionCode = (e) => {
        this.setState({ transactionCode: e.target.value });
    }

    render() {
        return (
            <div id="TransactionDetail" className="container-fluid">
                <h2>Transaction Detail Page</h2>
                <div className="row">
                    <form className="col-md-6" onSubmit={this.onSubmit}>
                        <Modal title="Transaction Info"
                            footerContent={
                                <Fragment>
                                    <AnchorWithIcon iconClassName="fas fa-list" attributes={{ target: '_blank' }} to="/management/transaction" className="btn btn-secondary" >Transactions Record</AnchorWithIcon>
                                    <input type="submit" className="btn btn-primary" value="Search" />
                                </Fragment>
                            }
                        >
                            <FormGroup label="Code">
                                <input required onChange={this.setTransactionCode} type="text" placeholder="Transaction code" className="form-control" />
                            </FormGroup>
                        </Modal>
                    </form>
                    <div className="col-md-6"></div>
                    <div className="col-md-12">
                        {this.state.loading ?
                            <Spinner /> :
                            <Fragment>
                                <SimpleError show={this.state.dataNotFound == true} >Data not found</SimpleError>
                                <TransactionData show={this.state.transactionData != undefined} transaction={this.state.transactionData} />
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
const TransactionData = (props) => {
    if (props.show == false) return null;
    const transaction: Transaction = props.transaction;
    const productFlows: ProductFlow[] = transaction.productFlows ? transaction.productFlows : [];
    const isSelling = transaction.type == 'SELLING';

    return (
        <Modal title="Transaction Data">
            <div className="row">
                <div className="col-md-6">
                    <FormGroup label="Code" orientation='horizontal'>
                        {transaction.code}
                    </FormGroup>
                    <FormGroup label="Type" orientation='horizontal'>
                        {transaction.type}-{transaction.mode}
                    </FormGroup>
                    <FormGroup label="Date" orientation='horizontal'>
                        {new Date(transaction.transactionDate ?? new Date()).toString()}
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    {isSelling ?
                        <FormGroup label="Customer" orientation='horizontal'>
                            {transaction.customer?.name}
                        </FormGroup> :
                        <FormGroup label="Supplier" orientation='horizontal'>
                            {transaction.supplier?.name}
                        </FormGroup>
                    }

                    <FormGroup label="User" orientation='horizontal'>
                        {transaction.user?.displayName}
                    </FormGroup>
                </div>
                <div className="col-md-12">
                    <h3>Products</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>@Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productFlows.map((productFlow, i) => {
                                const product: Product = productFlow.product ?? new Product();
                                const price = productFlow.price;
                                return (
                                    <tr key={"pf-tr-" + i}>
                                        <td>{i + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{beautifyNominal(productFlow.count)}</td>
                                        <td>{product.unit?.name}</td>
                                        <td>{beautifyNominal(price)}</td>
                                        <td>{beautifyNominal((price ?? 0) * (productFlow.count ?? 0))}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="alert alert-info text-left">
                        <FormGroup label="Total unit">
                            <p>{beautifyNominal(totalUnitAndPrice(productFlows).unit)}</p>
                        </FormGroup>
                        <FormGroup label="Total price">
                            <p>{beautifyNominal(totalUnitAndPrice(productFlows).productFlowPrice)}</p>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
const mapDispatchToProps = (dispatch: Function) => ({
})

export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(TransactionDetail))