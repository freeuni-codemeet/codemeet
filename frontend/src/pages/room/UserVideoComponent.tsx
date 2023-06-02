import React, {useEffect, useRef} from 'react';
import {StreamManager} from "openvidu-browser";


const UserVideoComponent = ({ streamManager }: { streamManager: StreamManager }) => {

    const videoRef = useRef(null);

    useEffect(() => {
        if (streamManager && !!videoRef && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager])

    const getNicknameTag = () => {
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
         <div>
            {streamManager !== undefined ? (
                <div>
                    <video autoPlay={true} ref={videoRef} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : <></>}
        </div>
    );
}

export default UserVideoComponent;