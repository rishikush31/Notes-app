import React, { useState } from 'react'
import './profile-pic.css'
export default function ProfilePic({ setProfilePic }) {

    //image for no uploaded dp 
    let temp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLfp6+yrsbSxt7rh4+S+wsXS1dfW2drP0tS6v8LLz9HEyMrd4OG0ur3IzM7YRWk6AAAC3klEQVR4nO2ay5akIAxAISAiCv7/3w52PY7l2JBQCTML7rI33g4QklBKDQaDwWAwGAwGg8GgK6DivG7OuW31EaD/9yfvtDYvtN1jb4Xd5u+eMSbNXQUu339aWN9pOcDfCvxIuKmLwv6bwCMQ8gLgCgaHxCK+GKls0MEh1AyywyrpAFvdIDsI7gdYMAYZuXMRkQY6SS0FJKRB3pJCCjM2CHJLgQ5CDsMmshTYvfhA5OIkBCGHYRcw8BSDDP9K4LLSKQz8+QloBnlDsiug09KLxK5AOw9HGNgViFtBYjMEooFA3UDKCj8K7AmSaqC141agboWswGzQoBCGghbYC5aswH4i6HmBvZZ3ZAXuRhtKneS9Anv56KkKltuAfiTYMxOhiXgg0UpQuggtUS4oNdEMgkAjUZttXBREumtS9SjT2FLCIDVimNAKhv9EPoAV68CfGd8O1VnX00BqvKCwB9OwVwpnML2t4e+jPkDkSCs8BIbajWkEbsgr0ZYkDHvResdUmMCKDFduyPnhXsLY2Ot9CG7fREyauz5QTWvSJ4tsFDq8RHwCKi7u/f9vvtsSXDSyR2aCf/BEqI6PTjH6J9lDdfQ4vu1Xl5LVr4fKIyXaFPY5TkrcA5TfQzL3hzL/2YZtlrSAuIZfvv4hkjenyKLk71uNLFmy5ubZg+Ed9vvvWCycNyasyHLp08JuTJEAtdACcA7FxpKx5uLlXJPQ+7eRgIh4Gy1LfPmKTR9s3El801TEll1442Bab3GgPgUVJNqKKZZFeDu0lJS0Xr7u0NBc8Brohvbi27P4N4bmwLwKTyhNDutOPIHfD0AcrqHBt9xRRkDjBw/YQUaTA04BPc5pATeOlDRAPRFQX+ipIE4FfrLXRv3WlA4CJgz0ZzAi1cGsVFY6KVTyk8zlcHGoKMgb1FaC/HORFoVyFUf+uUgL5Ypa/EgelI8lf7F0Q/muCtrKU36tgC4UozAYDAaD/4U//rMgRSTDXgQAAAAASUVORK5CYII="
 
    // final image
    let suptemp; 

    if(localStorage.getItem("notesAppProfilePic")==='undefined')
    {
        suptemp=temp;
    }
    else{
        suptemp=localStorage.getItem("notesAppProfilePic");
    }

    // make the image to be set
    const [data, setData] = useState({ myFile: suptemp })
    
    const convertToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }
    

    const onChange = async (e) => {
        const tempPic = e.target.files[0];
        const tempFile = await convertToBase64(tempPic);
        setData({ myFile: tempFile });
    }

    const handleSubmit = async () => {
        try {
            await fetch("http://localhost:5000/api/uploadProfilePic",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("notesAppEmail"),
                        myProfilePic: data.myFile
                    })
                })
        }
        catch (err) {
            console.log(err.message);
        }
        localStorage.setItem("notesAppProfilePic", data.myFile);
        console.log(localStorage.getItem("notesAppProfilePic"));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='profile-pic-box'>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        <img src={`${data.myFile}`} alt="" />
                    </label>
                </div>
                <div className='info-box'>
                    <div className='name'>
                        {localStorage.getItem("notesAppName")}
                    </div>
                    <div className='email'>
                        {localStorage.getItem("notesAppEmail")}
                    </div>
                </div>
                <hr />
                <div className='ip-sub-div'>
                    <div className='ip-img'>
                        <input type="file"
                            label="Image"
                            name="myFile"
                            id="file-upload"
                            accept=".jpeg,.jpg,.png"
                            onChange={onChange}
                        ></input>
                    </div>
                    <div className='subbtn'>
                        <button type='submit'>submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
