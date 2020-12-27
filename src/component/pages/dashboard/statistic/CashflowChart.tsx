
import React, { Component, Fragment, RefObject } from 'react';
import Card from '../../../container/Card';
import WebResponse from './../../../../models/WebResponse';
import Filter from './../../../../models/Filter';
import FormGroup from '../../../form/FormGroup';
import Cashflow from './../../../../models/Cashflow';
import { beautifyNominal } from '../../../../utils/StringUtil';
import { uniqueId } from './../../../../utils/StringUtil';
import { transform } from 'typescript';
import CashflowBarChart from './CashflowBarChart';
import { MONTHS } from './../../../../utils/DateUtil';
interface IProps {
    cashflowData: WebResponse
}
export default class CashflowChart extends Component<IProps, any>
{ 
    constructor(props: IProps) {
        super(props);
    }
    getCashflowData = (): WebResponse => {
        return this.props.cashflowData;
    }
    getPeriodString = () => {
        const cashflowData = this.getCashflowData();
        if (!cashflowData.filter) return "";
        let filter: Filter = cashflowData.filter;
        return MONTHS[(filter.month??1)-1] + " " + filter.year + " - " + MONTHS[(filter.monthTo??1)-1] + " " + filter.yearTo;
    }
    componentDidUpdate() {

    }
    render() {
        const cashflowData = this.getCashflowData()
        return (
            <Card title="Cashflow">
                <FormGroup label="Period" >{this.getPeriodString()}</FormGroup>
                <div className="container-fluid" >
                    <h4>Selling</h4>
                    <CashflowBarChart updated={cashflowData.date??new Date()} dataSet={cashflowData.sellings ?? []} />
                    <h4>Purchasing</h4>
                    <CashflowBarChart updated={cashflowData.date??new Date()} dataSet={cashflowData.purchasings ?? []} />
                </div>
            </Card>
        )
    }
}
 