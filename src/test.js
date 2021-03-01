import React from 'react'
import io from "socket.io-client";

export default class Test extends React.Component{
    constructor(props) {
      super(props);
      //  s_number test_id => object => JSON
      this.socket = {
        socket: null,
        url: "http://3.89.30.234:3001",
        emitKey: "eyetracking",
        onKey: "eyetrackingcount",
      };
    }
    
    componentDidMount() {
        const socket = io.connect(this.socket.url);
        this.socket.socket = socket;
        socket.on(this.socket.onKey, (res) => {
            console.log(res);
        })
    }
    
    socketEvent = async () => {
        console.log("socket Event");
        const data = {
            s_number: 21,
            test_id: 38
        };
        await this.socket.socket.emit(this.socket.emitKey, { data });
        console.log(data)
    }

    render() {
        return (
            <div>
                Hello 
                 <button onClick={this.socketEvent}> sdafasdfdsa </button>
            </div>
        )
    }
}