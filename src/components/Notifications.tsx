import React, { useEffect } from "react";
import { useStore } from "../exports";
import { FiInfo } from "react-icons/fi";

export const Notifications: React.FC = props => {
    const { notifications, deleteNotification } = useStore(state => ({
        notifications: state.notifications,
        deleteNotification: state.deleteNotification,
    }));
    const currentNotification = notifications[0];

    useEffect(() => {
        const timeout = setTimeout(() => {
            deleteNotification();
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [currentNotification]);
    return (
        <>
            {notifications.length ? (
                <div className="glassy-notification text-white py-2 px-2 rounded-md absolute w-[30vw] top-[1rem] left-[50%] translate-x-[-50%]">
                    <FiInfo className="inline-block mr-2" size="1.5rem" />
                    <span className="align-middle font-[500]">
                        {currentNotification}
                    </span>
                </div>
            ) : null}
        </>
    );
};
