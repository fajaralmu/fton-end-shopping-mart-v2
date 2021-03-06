

import React, { ChangeEvent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCommonUserStateToProps } from '../../../../constant/stores';
import BaseComponent from '../../../BaseComponent';
import TransactionPurchasingService from './../../../../services/TransactionPurchasingService';
import Supplier from './../../../../models/Supplier';
import ProductFlow from './../../../../models/ProductFlow';
import Modal from '../../../container/Modal';
import MasterDataService from './../../../../services/MasterDataService';
import WebResponse from './../../../../models/WebResponse';
import FormGroup from './../../../form/FormGroup';
import AnchorWithIcon from './../../../navigation/AnchorWithIcon';
import Spinner from './../../../loader/Spinner';
interface IState {
    supplier?: Supplier;
    supplierNotFound: boolean;
    loading: boolean;
    code:string    
}
class SupplierForm extends BaseComponent {
    masterDataService:MasterDataService;
    state: IState = {
        supplierNotFound: false, loading: false,code: ''
    }
    constructor(props: any) {
        super(props);
        this.masterDataService = this.getServices().masterDataService;
    }
    updateField = (e:ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const name:string|null = target.getAttribute("name");
        if (null == name) return;
        this.setState({[name]: target.value});
    }
    startLoading = () => this.setState({loading:true});
    endLoading = () => this.setState({loading:false});
    searchSupplier = (e) => {
        e.preventDefault();
        const code:string = this.state.code;
        if (code.trim() == "") return;
        this.loadSupplier(parseInt(code));
    }
    supplierLoaded = (response: WebResponse) => {
        if (!response.entities || !response.entities[0]) {
            throw new Error("Supplier not found");
        }
        this.props.setSupplier(response.entities[0]);
        this.setState({ supplier: response.entities[0], supplierNotFound: false });
    }
    supplierNotFound = (e: any) => {
        this.setState({ supplierNotFound: true });
    }
    loadSupplier = (id: number) => {
        this.commonAjax(this.masterDataService.getById,
            this.supplierLoaded, this.supplierNotFound, 'supplier', id);
    }
    reset = (e:any) => {
        this.setState({code:""})
    }
    render() {
        return (

            <form onSubmit={this.searchSupplier} >
                <Modal toggleable={true} title="Supplier form" footerContent={
                    <Fragment>
                        <AnchorWithIcon iconClassName="fas fa-list" attributes={{ target: '_blank' }} to="/management/supplier" className="btn btn-outline-secondary" />
                        <input type="submit" className="btn btn-secondary" value="Search" />
                        <input type="reset" onClick={this.reset} className="btn btn-outline-secondary" />
                    </Fragment>
                } >
                    <div className="form-group">
                        <FormGroup label="Code">
                            <input placeholder="Supplier code" required type="number" className="form-control" onChange={this.updateField} value={this.state.code} name="code" />
                        </FormGroup>
                    </div>
                    <SupplierDetail loading={this.state.loading} supplier={this.state.supplier} notFound={this.state.supplierNotFound} />
                </Modal>
            </form>
        )
    }

}
const SupplierDetail = (props: {loading:boolean, supplier?: Supplier, notFound: boolean }) => {
    const style = { height: '120px' };
    if (props.loading) {
        return <div style={style}><Spinner/></div>
    }
    if (true == props.notFound) {
        return <div style={style}><div className="alert alert-warning">Supplier not found</div></div>
    }
    if (!props.supplier) {
        return <div style={style}><div className="alert alert-secondary">Please select supplier</div></div>
    }
    const supplier: Supplier = props.supplier;
    return (
        <div style={style}>
            <h2>{supplier.name}</h2>
            <address>
                {supplier.address}<br />
                <abbr title="Contact">Contact: </abbr>{supplier.contact}
            </address>
        </div>
    )
}
const mapDispatchToProps = (dispatch: Function) => ({
})


export default withRouter(connect(
    mapCommonUserStateToProps,
    mapDispatchToProps
)(SupplierForm))