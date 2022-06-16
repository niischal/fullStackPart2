const Message = ({message}) => {
    if (message!==null){
    return (
        <div className={message.type}>
            {message.msg}
        </div>
    )}
}

export default Message