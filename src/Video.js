/***************************************
 ** O-rizon development
 ** Created by Maxime Parriaux
 ** 10/23/17 - 17:28
 ** Video.js
 ** 2017 - All rights reserved
 ***************************************/

import React from 'react'
import {ImageParsing} from './ImageParsing'

tracking.initUserMedia_ = function(element, opt_options) {
    window.navigator.mediaDevices.getUserMedia({
        video: opt_options.video,
        audio: (opt_options && opt_options.audio) ? true : false,
    }).then(function(stream) {
        element.srcObject = stream;
    }).catch(function(err) {
        throw Error('Cannot capture user camera.');
    });
};

function MyTracker() {
    MyTracker.base(this, 'constructor')
}

tracking.inherits(MyTracker, tracking.Tracker)

MyTracker.prototype.track = function (pixels, width, height) {
    this.emit('track', {
        pixels,
        width,
        height
    })
}


export class Video extends React.Component {
    constructor(props) {
        super(props)
        this.video = null
        this.trackerTask = null
        this.tracker = new MyTracker()
        this.state = {
            backgroundColor: 'white',
            resolved: true
        }
        this.ImageParser = null
        this.videoHeight = 480;
        this.videoWidth = 640;
    }

    componentDidMount() {
        this.tracker.on('track', this.handleTrack.bind(this))
        this.trackerTask = tracking.track(this.video, this.tracker, {camera: true, video: {height: {ideal: 480}, width: {ideal: 640}}})
    }

    handleTrack(event) {
        this.props.onLoweredImageChange(event)
    }

    stopRunning() {
        this.trackerTask.stop()
    }

    render() {
        return (
            <div className="fullFlexCenter">
                <div className="center"/>
                <video id="video"
                       autoPlay
                       preload="true"
                       loop
                       muted
                       height={this.videoHeight}
                       width={this.videoWidth}
                       style={{
                           backgroundColor: this.state.backgroundColor,
                       }}
                       ref={(ref) => {this.video = ref}}>
                </video>
            </div>
        )
    }
}