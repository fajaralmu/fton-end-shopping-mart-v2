import React from 'react';
import EntityProperty from '../models/EntityProperty';
import EntityElement from '../models/EntityElement';
import { baseImageUrl } from '../constant/Url';
import { FieldType } from '../models/FieldType';
import { beautifyNominal } from './StringUtil';
export default class EntityValues {
	static parseValues(object:any, prop:EntityProperty) : Array<any> {
		const result = new Array();
		const elemnents:EntityElement[] =prop.elements;
		for (let i = 0; i < elemnents.length; i++) {
			const element = elemnents[i];
			const elementid = element.id;
			let value:any =  object[elementid];
			if (value == null) {
				result.push(value);
				continue;
			}
			switch(element.fieldType) {
				case FieldType.FIELD_TYPE_FIXED_LIST:
				case FieldType.FIELD_TYPE_DYNAMIC_LIST:
					const valueAsObj = object[elementid];
					value = valueAsObj[element.optionItemName??"id"];
					break;
				case FieldType.FIELD_TYPE_DATE:
					value = new Date(value).toString();
					break;
				case FieldType.FIELD_TYPE_IMAGE:
					const imgLink = new String(value).split("~")[0];
					value = <img src ={baseImageUrl+imgLink} width="50" height="50"/>
					break;
				case FieldType.FIELD_TYPE_COLOR:
					value = <strong style={{color:value}} >{value}</strong>
					break;
				case FieldType.FIELD_TYPE_NUMBER:
					value = beautifyNominal(value);
					break;
				default:
					value = object[elementid];
			}
			result.push(value);
		}
		return result;
	}
}