import React from 'react';
import { Grid, Typography, Avatar, Button, Input, CircularProgress } from '@material-ui/core'
import { uploadFileToFirebase,getUserInfo } from '../../services/storage';
import { updateUser } from '../../services/firebase';
export default function Profile(params) {
    const inputRef = React.createRef();

    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);

    function handleImageChage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        setUploading(true)
        reader.onloadend = async () => {
            const { success, res } = await uploadFileToFirebase(file)
            setUploading(false)
            setImage(reader.result)
            if (success) {
                await updateUser({ avatar: res.url })
            } else {
                console.log('error subiendo',res);
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div container className='profile-container'>
            <Typography variant="h3">
                Perfil
            </Typography>
            <div className="image-container">
                <img
                    className="profile-img"
                    alt="perfil"
                    src={image ? image : getUserInfo().avatar}
                />
                {uploading ? <CircularProgress className="progress" /> : null}

            </div>
            <Button
                color="primary"
                variant="contained"
                onClick={() => inputRef.current.click()}
            >
                Cambiar Foto
            </Button>

            <input
                accept="image/png, image/jpeg"
                type="file"
                ref={inputRef}
                onChange={handleImageChage}
            />


            <Typography variant="h3">
                {getUserInfo().email}
            </Typography>
        </div>
    )
}