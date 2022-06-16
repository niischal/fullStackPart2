const Message = ({message}) => {
    return (
        <div className={message.type}>
            {message.msg}
        </div>
    )
}

export default Message