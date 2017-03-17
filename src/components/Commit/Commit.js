/**
 * 
 */

import React, { Component } from 'react';

let editor = null;

class Commit extends Component {
    constructor(props) {
        super(props);
        editor = null;
    }
    initEditor() {
        let initEditor = () => {
            try {
                editor = new Editor({
                    status: []
                });
                editor.render();
            } catch (error) {
                console.log(error)
            }
        }
        if (typeof Editor === "undefined") {
            let editorStyle = document.createElement("link");
            editorStyle.setAttribute("href", "//cdn.jsdelivr.net/editor/0.1.0/editor.css");
            editorStyle.setAttribute("rel", "stylesheet");
            document.querySelector("head").append(editorStyle);
            let editorCoreScript = document.createElement("script");
            editorCoreScript.setAttribute("src", "//cdn.jsdelivr.net/editor/0.1.0/editor.js");
            editorCoreScript.setAttribute("type", "text/javascript");
            document.querySelector("body").append(editorCoreScript);
            let editorMdScript = document.createElement("script");
            editorMdScript.setAttribute("src", "//cdn.jsdelivr.net/editor/0.1.0/marked.js");
            editorMdScript.setAttribute("type", "text/javascript");
            document.querySelector("body").append(editorMdScript);
            editorCoreScript.addEventListener("load", () => {
                editorCoreScript.setAttribute("load", "done");
                if (editorMdScript.getAttribute("load") === "done") {
                    initEditor()
                }
            }, false);
            editorMdScript.addEventListener("load", () => {
                editorMdScript.setAttribute("load", "done");
                if (editorCoreScript.getAttribute("load") === "done") {
                    initEditor()
                }
            }, false);

        } else {
            initEditor()
        }
    }
    componentDidMount() {
        this.initEditor();
    }
    submit() {

    }
    render() {
        return (
            <ul className="commit-block" data-collapsible="accordion">
                <li className="block_title">
                    <div className="collapsible-header">
                        添加回复
                    </div>
                </li>
                <li>
                    <div id="editor-wrapper">
                        <textarea id="editor" placeholder="Content here ...."></textarea>
                    </div>
                </li>
                <li className="more">
                    <div className="collapsible-header">
                        <a href="javascript:;" onClick={this.submit.bind(this)}>回复 <em className="fa fa-angle-right" aria-hidden="true"></em></a>
                    </div>
                </li>
            </ul>
        )
    }
}

export default Commit;