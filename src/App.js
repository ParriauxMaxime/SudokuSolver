import React, {Component} from 'react'
import 'tracking/build/tracking-min'
import {Video} from './Video'
import {Resolver} from './Resolver'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title           : 'Resolver',
            loweredImageData: null
        }
    }

    componentDidMount() {
    }

    changeLoweredImage(ImageData) {
        this.setState({loweredImageData: ImageData})
    }

    changeTitle(title) {
        this.setState({title})
    }

    render() {
        return (
            <div className="app">
                <Video onChangeTitle={this.changeTitle.bind(this)}
                       onLoweredImageChange={this.changeLoweredImage.bind(this)}/>
                <Resolver title={this.state.title}
                          loweredImage={this.state.loweredImageData}/>
            </div>
        )
    }
}

export default App
