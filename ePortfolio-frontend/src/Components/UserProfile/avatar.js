import React from 'react';
import Cropper from 'react-easy-crop';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/esm/Spinner';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { updateImage } from '../Utils/cropImage';
import PropTypes from 'prop-types';

function Avatar(props) {

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const [disabledSaveButton, setDisabledSaveButton] = React.useState(false);
    const [updateStatus, setUpdateStatus] = React.useState(false);
    const [saveButton, setSaveButton] = React.useState("Zapisz");
    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({x:0, y:0});
    const [zoom, setZoom] = React.useState(1);
    const [rotation, setRotation] = React.useState(0);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.addEventListener('load', () => {
                setImage(fileReader.result);
            });
        }
    };

    const clearAll = () => {
        setSaveButton("Zapisz");
        setImage(null);
        setCroppedArea(null);
        setCrop({x:0, y:0});
        setZoom(1);
        setRotation(0);
        setUpdateStatus(false);
    };

    const close = () => {
        clearAll();
        var onClose = props.onClose;
        document.querySelector("body > div.fade.modal-backdrop.show").classList.remove("show");
        document.querySelector("body > div.fade.modal.show").classList.remove("show");

        setTimeout(function() {
            onClose();
        }, 150);
    }

    const onSave = async () => {
        setDisabledSaveButton(true);
        setSaveButton(<Spinner animation="border" style={{width: "24px", height: "24px", color: "#fff"}}/>);

        const newImageUrl = await updateImage(image, croppedArea, rotation);

        if (newImageUrl != null) {
            await props.update(newImageUrl[0], newImageUrl[1], close);
        } else {
            setSaveButton("Zapisz");
        }
        setDisabledSaveButton(false);
    };

    return (
        <Modal size="lg" show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton style={{backgroundColor: "#fff", color: "#444"}}>
                <Modal.Title>Ustaw swoje zdjęcie.</Modal.Title>
            </Modal.Header>

            <Modal.Body className="avatar-modal-body">
                <i className="far fa-image avatar-empty-icon"></i>
                <div className="avatar-container">
                    <div className="avatar-container-cropper">
                        <div className="crooper">
                            <Cropper
                                image={image} 
                                crop={crop} 
                                zoom={zoom} 
                                aspect={1} 
                                onCropChange={setCrop} 
                                onZoomChange={setZoom} 
                                onCropComplete={onCropComplete} 
                                disableAutomaticStylesInjection={false} 
                                showGrid={true}
                                cropShape="round"
                                rotation={rotation}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Container>
                    <Row>
                        <Col xs={3} className="avatar-manipulation-cols">
                            <input type="file" accept="image/*" ref={inputRef} style={{display: "none"}} onChange={onSelectFile}/>
                            <Button variant="outlined" onClick={triggerFileSelectPopup} className="avatar-choose-file-button">
                                Wybierz plik
                            </Button>
                        </Col>
                        <Col className="avatar-manipulation-cols">
                            <Typography className="avatar-manipulation-titles" gutterBottom>
                                Zoom
                            </Typography>
                            <Slider
                                defaultValue={1}
                                className="avatar-manipulation-sliders"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </Col>
                        <Col className="avatar-manipulation-cols">
                            <Typography className="avatar-manipulation-titles" gutterBottom>
                                Obrót
                            </Typography>
                            <Slider
                                defaultValue={0}
                                className="avatar-manipulation-sliders"
                                min={1}
                                max={360}
                                step={1}
                                value={rotation}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled={disabledSaveButton} id="profile-save-avatar" variant="contained" color="secondary" className="avatar-manipulation-save-Button" onClick={onSave}>{saveButton}</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

Avatar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
}

export default Avatar;