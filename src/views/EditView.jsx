import React from 'react';
import mediumDraftImporter from 'medium-draft/lib/importer';

import {addNewBlock, Block, BLOCK_BUTTONS, createEditorState, Editor, ImageSideButton,} from 'medium-draft';
import {convertToRaw} from 'draft-js';


import createImagePlugin from "draft-js-image-plugin";
import firebase from "../firebase";
import mediumDraftExporter from 'medium-draft/lib/exporter';

const blockButtons = [
    {
        label: 'H1',
        style: 'header-one',
        icon: 'header',
        description: 'Heading 1',
    },
    {
        label: 'H2',
        style: 'header-two',
        icon: 'header',
        description: 'Heading 2',
    },
].concat(BLOCK_BUTTONS);


const ROOT = '/optimips/pages/';
const storage = firebase.storage();
const storage_reference = storage.ref(ROOT);


class CustomImageSideButton extends ImageSideButton {

    /*
    We will only check for first file and also whether
    it is an image or not.
    */
    onChange(e) {
        const file = e.target.files[0];
        let ctx = this;
        if (file.type.indexOf('image/') === 0) {
            // This is a post request to server endpoint with image as `image`
            let filename = Math.random()
                .toString(36)
                .slice(-4);
            let upload = storage_reference.child(filename + '/').put(file);
            upload.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    ctx.props.setEditorState(addNewBlock(
                        ctx.props.getEditorState(),
                        Block.IMAGE, {
                            src: downloadURL,
                        }
                    ));
                    console.log('File available at', downloadURL);
                });
            });

        }
        this.props.close();
    }

}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.sideButtons = [{
            title: 'Image',
            component: CustomImageSideButton,
        }];

        this.state = {
            editorState: this.props.html ? createEditorState(convertToRaw(mediumDraftImporter(this.props.html))) : createEditorState(), // for empty content
        };
        this.imagePlugin = createImagePlugin();
        this.plugins = [this.imagePlugin];
        this.refsEditor = React.createRef();
    }


    onChange = (editorState) => {
        this.setState({editorState});
        this.props.onChange(mediumDraftExporter(editorState.getCurrentContent()));
    };


    render() {
        const {editorState} = this.state;

        return (
            <Editor
                data={this.props.data}
                ref={this.refsEditor}
                plugins={this.plugins}
                blockButtons={blockButtons}
                sideButtons={this.sideButtons}
                editorEnabled={this.props.readOnly}
                placeholder={'ajouter du texte'}
                editorState={editorState}
                onChange={this.onChange}/>
        );
    }
}

export default App;

