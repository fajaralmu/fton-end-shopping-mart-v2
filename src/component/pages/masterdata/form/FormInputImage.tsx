
import React, { Fragment, Component } from 'react';
import { toBase64v2 } from '../../../../utils/ComponentUtil';
import AnchorButton from '../../../navigation/AnchorButton';
import EntityElement from '../../../../models/EntityElement';
import { baseImageUrl } from '../../../../constant/Url';
import BaseComponent from '../../../BaseComponent';
interface IState {
    singlePreviewData?: string,
}
export default class FormInputImage extends BaseComponent
{
    state: IState = {
        singlePreviewData: undefined,
    }
    ref: React.RefObject<any> = React.createRef();
    constructor(props: any) {
        super(props, false);
    }
    changeSingleImageData = (e) => {
        const app = this;
        toBase64v2(e.target).then(function (data) {
            app.setState({ singlePreviewData: data });
        })
    }
    removeImage = (e) => {
        const app = this;
        this.showConfirmationDanger("Remove image?")
        .then(function(ok){
            if (ok) {
                app.doRemoveImage();
            }
        })   
    }

    doRemoveImage = () => {
        if (this.ref.current) {
            this.ref.current.value = null;
        }
        this.setState({ singlePreviewData: undefined });
    }

    getEntityElement(): EntityElement {
        return this.props.element;
    }
    componentDidMount() {
        this.prepopulateForm();
    }
    prepopulateForm() {
        if (!this.props.recordToEdit) return;
        let defaultValue = this.props.recordToEdit[this.getEntityElement().id];
        if (!defaultValue) return;
        const fullUrl = baseImageUrl+defaultValue;
        this.setState({singlePreviewData:fullUrl});
    }
    render() {
        const element: EntityElement = this.getEntityElement();
        return (
            <React.Fragment>
                <input ref={this.ref}
                    onChange={this.changeSingleImageData} type="file" accept="image/*" name={element.id} className='form-control' />
                <ImagePreview imageData={this.state.singlePreviewData} />
                <AnchorButton show={this.state.singlePreviewData != undefined} onClick={this.removeImage} iconClassName="fas fa-times" className="btn btn-danger btn-sm">remove</AnchorButton>
            </React.Fragment>
        )
    }

}
const ImagePreview = (props) => {
    if (props.show == false || !props.imageData) return null;
    return <img className="image" style={{ margin: '3px' }} src={props.imageData} width="50" height="50" />
}