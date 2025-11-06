const listeners = new Set();

const notify = (type, message) => {
    listeners.forEach((cb) => cb({ type, message }));
};

export const NotificationService = {
    subscribe: (cb) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
    },
    success: (message) => notify("success", message),
    error: (message) => notify("error", message),
    info: (message) => notify("info", message),
    warning: (message) => notify("warning", message),
};