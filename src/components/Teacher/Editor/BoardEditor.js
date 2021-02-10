import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Component } from "react";
import draftToHtml from "draftjs-to-html";

export default class BoardEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    const BoardHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    console.log(this.props.setBoardFormHtml(BoardHtml));

    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* 나중에 html 불러올 때 사용 <div id="test" dangerouslySetInnerHTML={ {__html:draftToHtml( convertToRaw(editorState.getCurrentContent()))}}  /> */}
      </div>
    );
  }
}
