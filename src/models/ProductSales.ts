import BaseEntity from './BaseEntity';
import Product from './Product';
import DataSet from './DataSet';

export default class ProductSales extends BaseEntity implements DataSet{
	product?:Product;
	sales?:number;
	month?:number;
	year?:number;
	percentage?:number;
	maxValue?:number;
	monthName?:string;
	getAmount: () => number;
    getLabel: () => string;
    constructor() {
		super();
        this.getAmount = () => {
			return this.sales??0;
        }
       this.getLabel = () => {
            return this.product?this.product.name??"":"";
        }
    }
	static toDataSet = (object:ProductSales) : DataSet => {
        return Object.assign(new ProductSales(), object);
    }
    static toDataSets = (objects:ProductSales[]) : DataSet[] => {
        const dataSets:DataSet[]  = new Array<DataSet>();
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            dataSets.push(ProductSales.toDataSet(element));
        }
        return dataSets;
    }
}
