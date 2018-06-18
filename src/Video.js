/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/23/17 - 17:28
 ** Video.js
 ** 2017 - All rights reserved
 ***************************************/

import React from 'react'
import { connect } from 'react-redux'
import { ActionCreator } from './store';
import { CHANGE_TRACKER_DATA } from './reducers/tracker';
import { Detector } from './core/Detector';
import { Converter } from './core';

// @flow
//import {ImageParsing} from './ImageParsing'

tracking.initUserMedia_ = function (element, opt_options) {
    window.navigator.mediaDevices.getUserMedia({
        video: opt_options.video,
        audio: (opt_options && opt_options.audio) ? true : false,
    }).then(function (stream) {
        element.srcObject = stream;
    }).catch(function (err) {
        throw Error('Cannot capture user camera.');
    });
};

function MyTracker(running = true) {
    this.running = running;
    this.detector = null;
    MyTracker.base(this, 'constructor')
}

tracking.inherits(MyTracker, tracking.Tracker)

const cut = (data: Array, x, y, width, height) => {
    const totalWidth = 640, totalHeight = 480, pixelData = 4;
    const newArray = new Float32Array(width * height * pixelData);
    //Let assume constant; 
    const start = y * totalWidth + x;
    if (start < 0 || start >= totalWidth * totalHeight)
        throw Error('start offset ' + start);
    if (x + width >= totalWidth)
        throw Error('x is outside the box');
    const end = (x + width) + ((y + height) * totalWidth);
    if (end > totalHeight * totalWidth)
        throw Error('end offset', end);
    let index = 0;
    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width; j++) {
            for (let pixel = 0; pixel < pixelData; pixel++) {
                newArray[index] = data[pixelData * (i * totalWidth + j) + pixel]
                index++;
            }
        }
    }
    return newArray;
}

MyTracker.prototype.track = function (pixels, width, height) {
    const sobel = tracking.Image.sobel(pixels, width, height);
    const imgData: ImageData = { pixels: sobel, width, height };
    if (this.detector) {

    }
    else {
        this.detector = new Detector(imgData);
        let cropped = this.detector.crop(0, 0, 300, 100);
        if (this.running) {
            this.emit('track', Converter.BitmapToImageData(cropped))
        }
    }
}


export class Video extends React.Component {
    constructor(props) {
        super(props)
        this.video = null
        this.trackerTask = null
        this.tracker = null;
        this.ImageParser = null
        this.videoHeight = 480;
        this.videoWidth = 640;
    }

    componentDidUpdate() {
        const { status } = this.props;
        this.trackerTask.stop();
        this.trackerTask = null;
        this.tracker = null;
        this.tracker = new MyTracker(status)
        this.tracker.on('track', this.handleTrack.bind(this))
        this.trackerTask = tracking.track('#img', this.tracker);

        //        this.trackerTask = tracking.track(this.video, this.tracker, { camera: true, video: { height: { ideal: 480 }, width: { ideal: 640 } } })
    }

    componentDidMount() {
        const { status } = this.props;
        this.tracker = new MyTracker(status)
        this.tracker.on('track', this.handleTrack.bind(this))
        this.trackerTask = tracking.track('#img', this.tracker);

        /*this.trackerTask = tracking.track(this.video, this.tracker, { camera: true, video: { height: { ideal: 480 }, width: { ideal: 640 } } })*/
    }

    handleTrack(event) {
        this.props.changeTrackerData(event)
    }

    stopRunning() {
        this.trackerTask.stop()
    }

    render() {
        return (
            <div className="flexCol">
                <div className="fullFlexCenter">
                    <div className="center" />
                    <video id="video"
                        autoPlay
                        preload="true"
                        loop
                        muted
                        height={this.videoHeight}
                        width={this.videoWidth}
                        ref={(ref) => { this.video = ref }}>
                    </video>
                </div>
                <img id="img" height={300} width="300" src="sudoku.png" />
            </div>
        )
    }
}

export const mapStateToProps = state => ({
    status: state.system.status
})

export const mapDispatchToProps = {
    changeTrackerData: (data) => ActionCreator(CHANGE_TRACKER_DATA, data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
