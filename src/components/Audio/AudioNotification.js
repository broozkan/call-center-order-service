import React, { Component } from 'react';
import mp3_file from '../../lib/alert.wav'

class AudioNotification extends Component {

    

    render() {
        return (
            <audio className="d-none" src={mp3_file} controls autoPlay ref={(element) => { this.rap = element }} />
        )
    }

}
export default AudioNotification;