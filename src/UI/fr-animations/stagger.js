export const container = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

export const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

