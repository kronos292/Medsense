import React, { Component } from 'react';
import {
    Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Row,
    PanelGroup, Popover, OverlayTrigger, Glyphicon
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageMagnifier from "./ImageMagnifier";

import './Upload.css';

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']                                         // remove formatting button
];

class Question extends Component {
    state = {
        changeFile: false,
        changePearlFile:false,
        heading: true,
    };

    checkQ1 = () =>{
        if (parseInt(this.props.id,10)===1){
            return;
        }
        return (
            <FormGroup controlId="formControlsSTEM" style={{height:'200px'}}>
                <ControlLabel style={{ fontSize: "150%" }}>STEM</ControlLabel>
                <ReactQuill value={this.props.stem}
                            modules={{toolbar: toolbarOptions}}
                            onChange={this.handleStemChange}
                            placeholder="Enter a continuation of the scenario"
                            style={{height:'100px'}}/>
            </FormGroup>
        );
    };

    handleStemChange = (value) => {
        this.props.handleStemChange(value, this.props.id);
    };

    handleQuestionChange = (value) =>{
        this.props.handleQuestionChange(value, this.props.id);
    };

    showAttachment = () =>{
        if (this.props.attachment) {
            let source;
            if (typeof(this.props.attachment)==="string"){
                source = this.props.attachment;
            } else {
                source = window.URL.createObjectURL(this.props.attachment);
            }
            return (
                <Row>
                    <div className="col-md-5 col-md-offset-1">
                        <ImageMagnifier url={source}/></div>
                </Row>
            );
        }
    };

    handleFile = (e) =>{
        this.props.handleFile(e.target.files[0], this.props.id);
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.handleInputChange(name, value, this.props.id);
    };

    handleOpenEndedChange = (value) => {
        this.props.handleOpenEndedChange(value, this.props.id);
    };

    handleNumberChange = (e) => {
        const value = e.target.value;
        this.props.handleNumberChange(value, this.props.id);
    };

    renderMCQOptions = () =>{
        let numbers = [];
        for (let i=2; i<=20; i++){
            numbers.push(i);
        }
        let options = numbers.map((obj,index) => {
            return <option value={obj}>{obj}</option>
        });
        return options;
    };

    answer = ()=>{
        if(this.props.type==="MCQ"){
            return(
                <FormGroup controlId="formControlsMCQ">
                    <ControlLabel style={{ fontSize: "150%" }}>Number of Options<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.props.numOptions} name="numOptions" onChange={(e)=>this.handleNumberChange(e)}>
                        <option value="Select One">Select One</option>
                        {this.renderMCQOptions()}
                    </FormControl>
                </FormGroup>
            );
        } else if(this.props.type==="Open-ended"){
            return(
                <FormGroup controlId="formControlsOpenEnded" style={{height:'200px'}}>
                    <ControlLabel style={{ fontSize: "150%" }}>Answer<span style={{color:"red"}}>*</span>
                        <br />
                    </ControlLabel>
                    <ReactQuill value={this.props.openEnded}
                                modules={{toolbar: toolbarOptions}}
                                onChange={this.handleOpenEndedChange}
                                placeholder="Enter an answer"
                                style={{height:'100px'}}/>
                </FormGroup>
            );
        }
        return;
    };

    options = () =>{
        if (this.props.type==="MCQ" && this.props.numOptions!=="Select One"){
            let array = [];
            for (let i=1;i<=parseInt(this.props.numOptions,10);i++) {
                array.push(i);
            }

            let options = array.map((number, index) => {
                return(
                    <div key={index}>
                        <FormGroup>
                            <ControlLabel>Option {number}<span style={{color:"red"}}>*</span></ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <input type="checkbox" checked={this.props.optionData[number-1].check} name={"check"+number} onChange={(e)=>this.handleMCQChange(e)}/>
                                </InputGroup.Addon>
                                <FormControl type="text" value={this.props.optionData[number-1].mcq} placeholder="Enter an answer" name={"mcqns"+number} onChange={(e)=>this.handleMCQChange(e)}/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                );
            });
            return options;
        }
    };

    handleMCQChange = (e) => {
        const name = e.target.name;
        const optionData = this.props.optionData;
        optionData.forEach(function (obj) {
            if (parseInt(obj.id,10)  === parseInt(name.substring(5),10)){
                if (name.substring(0,3)==="mcq"){
                    obj.mcq = e.target.value;
                } else {
                    obj.check = e.target.checked;
                }
            }
        });
        this.props.handleMCQChange(optionData, this.props.id);
    };

    handlePearlChange = (value) => {
        this.props.handlePearlChange(value, this.props.id);
    };

    showPearlAttachment = () =>{
        if (this.props.pearlAttachment) {
            let source;
            if (typeof(this.props.pearlAttachment)==="string"){
                source = this.props.pearlAttachment;
            } else {
                source = window.URL.createObjectURL(this.props.pearlAttachment);
            }
            return (
                <Row>
                    <div className="col-md-5 col-md-offset-1">
                        <ImageMagnifier url={source}/></div>
                </Row>
            );
        }
    };

    handlePearlFile = (e) =>{
        const value = e.target.files[0];
        this.props.handlePearlFile(value, this.props.id);
    };

    handleReferenceChange = (value) => {
        this.props.handleReferenceChange(value, this.props.id);
    };

    showUpload = () =>{
        if (this.state.changeFile){
            return <FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
    };

    showPearlUpload = () =>{
        if (this.state.changePearlFile){
            return <FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
    };

    handleShowUpload = () =>{
        this.setState({ changeFile: true });
    };

    handleShowPearlUpload = () =>{
        this.setState({ changePearlFile: true });
    };

    render() {
        let button;
        if (this.props.process==="vet" && typeof(this.props.attachment)==="string" && this.props.attachment!==""){
            button = <Button onClick={(e) => this.handleShowUpload()}>Change Attachment</Button>;
        } else if (!this.state.changeFile) {
            button = <FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
        let pearlButton;
        if (this.props.process==="vet" && typeof(this.props.pearlAttachment)==="string" && this.props.pearlAttachment!==""){
            pearlButton = <Button onClick={(e) => this.handleShowPearlUpload()}>Change Attachment</Button>;
        } else if (!this.state.changePearlFile) {
            pearlButton = <FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>;
        }

        const popoverHover = (
            <Popover id="popover-trigger-hover" title="Clinical Pearls">
                Notes on how to approach the question, add-on explanations to the answers provided or simply useful tips on how to survive in the wards.
            </Popover>
        );

        const questiontitle = this.state.heading?(
            <span className="title" style={{fontSize: "150%"}}>{"-| Question "+this.props.id}</span>
        ):(
            <span className="title" style={{fontSize: "150%"}}>{"+| Question "+this.props.id}</span>
        );
        return(
            <div id="question">
                <div className="add-question-button">
                    <Button type="button" bsStyle="link" bsSize="large" onClick={(e) => this.props.handleAddQuestion(this.props.id)}>
                        <Glyphicon glyph="plus-sign"/> Add Question
                    </Button><br />
                </div><br/>

                <PanelGroup accordion>
                    <Panel>
                        <Panel.Heading><Panel.Title toggle>{questiontitle}</Panel.Title></Panel.Heading>
                        <Panel.Collapse onEnter={(e) => this.setState({heading:!this.state.heading})} onExit={(e) => this.setState({heading:!this.state.heading})}>
                        <Panel.Body>
                            <div className="delete-question-button">
                                <Button  type="button" bsSize="large" bsStyle="link" onClick={(e)=>this.props.handleDeleteQuestion(this.props.id)}>
                                    {/*<Image src="./delete.png" style={{width: '25px'}} /> Delete Question*/}
                                    <Glyphicon glyph="trash"/> Delete Question
                                </Button><br/>
                            </div>

                            {this.checkQ1()}

                            <FormGroup controlId="formControlsQuestion" style={{height:'200px'}}>
                                <ControlLabel style={{ fontSize: "150%" }}>Question {this.props.id}<span style={{color:"red"}}>*</span></ControlLabel>
                                <ReactQuill value={this.props.question}
                                            modules={{toolbar: toolbarOptions}}
                                            onChange={this.handleQuestionChange}
                                            placeholder="Enter a question"
                                            style={{height:'100px'}}/>
                            </FormGroup>

                            <FormGroup controlId="formControlsAttachment">
                                <ControlLabel style={{ fontSize: "150%" }}>Question Attachment</ControlLabel>
                                {this.showAttachment()}
                                {button}
                                {this.showUpload()}
                                {/*<FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>*/}
                            </FormGroup>

                            <FormGroup controlId="formControlsType">
                                <ControlLabel style={{ fontSize: "150%" }}>Question Type<span style={{color:"red"}}>*</span></ControlLabel>
                                <FormControl componentClass="select" value={this.props.type} name="type" onChange={(e)=>this.handleInputChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="MCQ">MCQ</option>
                                    <option value="Open-ended">Open-ended</option>
                                </FormControl>
                            </FormGroup>

                            {this.answer()}
                            {this.options()}

                            <FormGroup controlId="formControlsPEARL" style={{height:'200px'}}>
                                <ControlLabel style={{ fontSize: "150%" }}>Clinical Pearls<span style={{color:"red"}}>*</span>
                                    <OverlayTrigger trigger={['hover']} placement="bottom" overlay={popoverHover}><img src='./info.png' hspace="5" alt="" style={{height:"1em", marginBottom:"1em"}}/></OverlayTrigger>
                                </ControlLabel>

                                <ReactQuill value={this.props.pearl}
                                            modules={{toolbar: toolbarOptions}}
                                            onChange={this.handlePearlChange}
                                            placeholder="Enter an explanation for the answer(s)"
                                            style={{height:'100px'}}/>
                            </FormGroup>

                            <FormGroup controlId="formControlsPearlAttachment">
                                <ControlLabel style={{ fontSize: "150%" }}>Clinical Pearls Attachment</ControlLabel>
                                {this.showPearlAttachment()}
                                {pearlButton}
                                {this.showPearlUpload()}
                                {/*<FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>*/}
                            </FormGroup>

                            <FormGroup controlId="formControlsTime">
                                <ControlLabel style={{ fontSize: "150%" }}>Time Limit<span style={{color:"red"}}>*</span></ControlLabel>
                                <InputGroup>
                                    <FormControl componentClass="select" value={this.props.time} name="time" onChange={(e)=>this.handleInputChange(e)}>
                                        <option value="Select One">Select One</option>
                                        <option value="0.5">0.5</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="15">15</option>
                                    </FormControl>
                                    <InputGroup.Addon>Minute(s)</InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel style={{ fontSize: "150%" }}>Allocate Marks<span style={{color:"red"}}>*</span></ControlLabel>
                                <InputGroup>
                                    <FormControl type="text" placeholder="Enter a positive whole number" value={this.props.mark}
                                                 onChange={(e)=>this.handleInputChange(e)} name="mark" />
                                    <InputGroup.Addon>Mark(s)</InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="formControlsReferences" style={{height:'200px'}}>
                                <ControlLabel style={{ fontSize: "150%" }}>References</ControlLabel>
                                <ReactQuill value={this.props.reference}
                                            modules={{toolbar: toolbarOptions}}
                                            onChange={this.handleReferenceChange}
                                            placeholder="Enter your references"
                                            style={{height:'100px'}}/>
                            </FormGroup>

                        </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </PanelGroup>
            </div>
        );
    }
}

export default Question;