/* eslint-disable react/prop-types */
const Notification = ({alert}) => {
    if (!alert || !alert.message || !alert.type) {
        return null;
    }
    const {message, type} = alert;
    
    return (
        <div className={`${type}`}>
            {message}
        </div>
    );
};

export default Notification;