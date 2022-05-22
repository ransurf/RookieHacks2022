import React from 'react';
import ReactDom from 'react-dom';

import FileBase from 'react-file-base64';

const Filetest = () => {
    const [file , setFile] = React.useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(file);
    };
    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <FileBase multiple={false} onDone={({base64}) => { setFile(base64); }}/>
            <button type="submit">Submit</button>
            </form>
            <img src={file}/>
        </div>
    )
}

export default Filetest;