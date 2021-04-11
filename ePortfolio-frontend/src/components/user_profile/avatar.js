import React from 'react';
import Cropper from 'react-easy-crop';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { updateImage } from '../utils/cropImage';

export default function Avatar() {

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({x:0, y:0});
    const [zoom, setZoom] = React.useState(1);
    const [rotation, setRotation] = React.useState(0);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        console.log(croppedAreaPercentage, croppedAreaPixels);
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.addEventListener('load', () => {
                console.log(fileReader.result);
                setImage(fileReader.result);
            });
        }
    };

    const onSave = () => {
        updateImage(image, croppedArea, rotation);
    };

    return (
        <Modal size="lg" show={true}>
            <Modal.Header closeButton>
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
                            <Button variant="contained" color="secondary" className="avatar-manipulation-save-Button" onClick={onSave}>Zapisz</Button>
                            <Button variant="contained" style={{float: "right", marginRight: "5px"}}>Zamknij</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}