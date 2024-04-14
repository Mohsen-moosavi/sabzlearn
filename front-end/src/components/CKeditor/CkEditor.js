import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CKeditor.css'

export default function CkEditor({value , setValue}) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event,editor) => {
                setValue(editor.getData());
            }}
        />

    )
}
