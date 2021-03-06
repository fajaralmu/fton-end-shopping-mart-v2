
import React, { Component } from 'react';
import Filter from '../../../models/Filter';
import Modal from '../../container/Modal';
import FormGroup from '../../form/FormGroup';
import WebResponse from '../../../models/WebResponse';
import { MONTHS } from '../../../utils/DateUtil';
import Loader from '../../loader/Loader';
import SimpleError from '../../alert/SimpleError';
interface IProps {
    filter: Filter,
    onChange: Function,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    transactionYears:number[]
}
class IState {
    error:boolean = false;
}
export default class DashboardFilter extends Component<IProps, IState> {
    state = new IState();
    constructor(props: IProps) {
        super(props);
    }
    updatePeriodFilter = (e) => {
        this.props.onChange(e);
    }
    submit = (e) => {
        e.preventDefault();
        if (this.props.filter.yearTo == undefined || this.props.filter.year == undefined) {
            return;
        }
        if (this.props.filter.year > this.props.filter.yearTo) {
            this.setState({error:true});
            return;
        }
        this.setState({error:false});
        this.props.onSubmit(e);
    }
    render() {
        const transactionYears: number[]  = this.props.transactionYears;
        return (
            <form onSubmit={this.submit}>
                <Modal toggleable={true} title="Filter" footerContent={
                    <input type="submit" className="btn btn-primary" />
                }>
                    <div className="row  ">
                        <div className="col-md-5">
                            <FormGroup label="Month">
                                <select className="form-control" name="month" onChange={this.updatePeriodFilter} value={this.props.filter.month} >
                                    {MONTHS.map((monthName, i) => {
                                        return <option value={i + 1}>{monthName} ({i + 1})</option>
                                    })}
                                </select>
                            </FormGroup>
                            <FormGroup label="Year">
                                <select className="form-control" name="year" onChange={this.updatePeriodFilter} value={this.props.filter.year} >
                                    {transactionYears.map(year => {
                                        return <option value={year}>{year}</option>
                                    })}
                                </select>
                            </FormGroup>
                        </div>
                        <div className="col-md-2 text-center">
                            <div style={{ width: '75px', height: '75px', display: 'flex' }} className="bg-secondary text-light rounded-circle">
                                <h1 style={{ margin: 'auto' }}><i className="fas fa-angle-right"></i></h1>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <FormGroup label="Month">
                                <select className="form-control" name="monthTo" onChange={this.updatePeriodFilter} value={this.props.filter.monthTo} >
                                    {MONTHS.map((monthName, i) => {
                                        return <option value={i + 1}>{monthName} ({i + 1})</option>
                                    })}
                                </select>
                            </FormGroup>
                            <FormGroup label="Year">
                                <select className="form-control" name="yearTo" onChange={this.updatePeriodFilter} value={this.props.filter.yearTo}>
                                    {transactionYears.map(year => {
                                        return <option value={year}>{year}</option>
                                    })}
                                </select>
                            </FormGroup>
                        </div>
                    </div>
                    <SimpleError show={this.state.error} >Invalid Year</SimpleError>
                </Modal>
            </form>
        )
    }
}