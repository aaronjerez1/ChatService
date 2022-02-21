import {useEffect, useRef} from 'react';

const MessageContainer = ({ messages}) => {
    const messageRef = useRef();

    useEffect(() => {
        if(messageRef && messageRef.current) {
            const {scrollHeight, clientHeight} = messageRef.current;
            messageRef.current.scrollTo({
                left:0, 
                top: scrollHeight - clientHeight,
                behavior: 'smooth'});
        }
    }, [message]);

    return <div ref={messageRef} className ='message-container'>
        {messages.map((m,index) =>
            <div key={index} className='use-message'>
                <div className ='message bg-primary'>{m.message}</div>
                <div className='from-user'>{m.user}</div>
            </div>
        )}

    </div>
}

export default MessageContainer;